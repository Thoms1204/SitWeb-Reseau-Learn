import { SignJWT, jwtVerify, JWTPayload } from 'jose';

const getAccessSecret = () => new TextEncoder().encode(process.env.JWT_ACCESS_SECRET || 'default_access_secret');
const getRefreshSecret = () => new TextEncoder().encode(process.env.JWT_REFRESH_SECRET || 'default_refresh_secret');

export async function createAccessToken(payload: { sub: string; role: string }): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('15m')
    .sign(getAccessSecret());
}

export async function createRefreshToken(payload: { sub: string }): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getRefreshSecret());
}

export async function verifyAccessToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getAccessSecret());
    return payload;
  } catch (error) {
    return null;
  }
}

export async function verifyRefreshToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getRefreshSecret());
    return payload;
  } catch (error) {
    return null;
  }
}
