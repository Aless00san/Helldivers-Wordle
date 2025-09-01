import { Request, Response } from 'express';
import { getTokenFromCode, getUser } from '../services/discord.service';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const redirectToDiscordAuth = async (req: Request, res: Response) => {
  res.redirect(
    `https://discord.com/oauth2/authorize?client_id=1400113678044364820&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fdiscord%2Fcallback&scope=identify+email`
  );
};

//Grabs the code from the request and exchanges it for a token
//Then stores the token in the user's session and retrieves the user's info
export const handleDiscordCallback = async (req: Request, res: Response) => {
  const code = req.query.code as string;

  if (!code) {
    return res.status(400).send('Missing code from Discord callback.');
  }

  try {
    const token = await getTokenFromCode(code);

    if (!token) {
      return res.status(400).send('Failed to retrieve token from code');
    }

    //acces token
    res.cookie('access_token', token.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 3600 * 1000, // 1 hour
      path: '/',
    });

    //refresh token
    res.cookie('refresh_token', token.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 * 4, // 4 weeks
      path: '/auth/refresh',
    });

    //retrieve user
    const user = await getUser(token.access_token);

    //check if user exists in DB
    const userExists = await prisma.user.findFirst({
      where: {
        discordId: user.id,
      },
    });

    //If user doesn't exist, create them
    if (!userExists) {
      await prisma.user.create({
        data: {
          name: user.username,
          email: user.email,
          discordId: user.id,
        },
      });
    } else {
      console.error('User already exists in DB');
    }

    return res.redirect(
      `${process.env.FRONTEND_URL}/login?user=${user.username}`
    );
  } catch (err) {
    console.error('Error getting token from code:', err);
    res.status(500).send('Error retrieving token from code.');
  }
};

//Todo: refresh token
//Send a POST request to https://discord.com/api/oauth2/token
// Exchange the refresh token for a new access token
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const refresh_token = req.cookies['refresh_token'];

    if (!refresh_token) {
      return res
        .status(400)
        .json({ error: 'No refresh token found in cookies' });
    }

    const params = new URLSearchParams();
    params.append('client_id', process.env.DISCORD_CLIENT_ID!);
    params.append('client_secret', process.env.DISCORD_CLIENT_SECRET!);
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refresh_token);
    params.append('redirect_uri', process.env.DISCORD_REDIRECT_URI!);

    const response = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    // Optionally update the cookie with a new refresh token
    if (data.refresh_token) {
      res.cookie('refresh_token', data.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
    }

    // Send the new access token back
    res.json({
      access_token: data.access_token,
      expires_in: data.expires_in,
      scope: data.scope,
      token_type: data.token_type,
    });
  } catch (error) {
    console.error('Error refreshing Discord token:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//Sends a GET request to: https://discord.com/api/users/@me
//Retrieves the user's database entry
export const getUserFromRequest = async (req: Request) => {
  try {
    const token = req.cookies?.access_token;
    if (!token) {
      return null;
    }

    const user = await getUser(token); // decode token or fetch user
    const userExists = await prisma.user.findFirst({
      where: { discordId: user.discordId },
    });

    return userExists;
  } catch (err) {
    console.error(err);
    return null;
  }
};

// Keep your existing getCurrentUser for the API endpoint
export const getCurrentUser = async (req: Request, res: Response) => {
  const user = await getUserFromRequest(req);

  if (!user) {
    return res.json({
      status: 'ERROR',
      message: 'User not found or access token missing.',
    });
  }

  return res.json({
    status: 'SUCCESS',
    message: 'User exists in DB.',
    user: user,
  });
};

export const logout = async (req: Request, res: Response) => {
  //clear the acces_token
  res.cookie('access_token', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });

  res.status(200).send('Successfully logged out.');
};
