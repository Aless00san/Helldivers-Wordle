import axios from 'axios';
import qs from 'qs';

export async function getTokenFromCode(retrievedCode: string) {
  const data = {
    client_id: process.env.DISCORD_CLIENT_ID,
    client_secret: process.env.DISCORD_CLIENT_SECRET,
    grant_type: 'authorization_code',
    code: retrievedCode,
    redirect_uri: 'https://gg.helldive.site/auth/discord/callback',
    scope: 'identify',
  };
  try {
    const res = await axios.post(
      'https://discord.com/api/oauth2/token',
      qs.stringify(data),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return res.data; // ACCES TOKEN
  } catch (err) {
    console.error('Failed to exchange code for token:', err);
    return null;
  }
}

export async function getUser(token: string) {
  if (!token) {
    console.error('Access token is missing.');
    return null;
  }

  try {
    const res = await axios.get('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error('Failed to get current user:', err);
    return null;
  }
}
