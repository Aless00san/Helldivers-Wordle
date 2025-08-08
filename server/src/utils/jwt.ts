import { User } from '../models/User';
import { jwtVerify, SignJWT } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export function createTokenPayload({ name, discordId }: User) {
  const now = Math.floor(Date.now() / 1000);

  return {
    sub: discordId,
    name,
    iat: now,
    exp: now + 60 * 60 * 24 * 7, // 7 days
  };
}

export async function createToken(payload: any) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({
      alg: 'HS256',
      typ: 'JWT',
    })
    .sign(secret);

  return token;
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
}
