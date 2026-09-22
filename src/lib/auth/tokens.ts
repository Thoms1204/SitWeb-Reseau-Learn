import { nanoid } from 'nanoid';
import { createHash } from 'crypto';
import prisma from '@/lib/db';

export function generateSecureToken(): string {
  return nanoid(48);
}

export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

export async function createEmailVerificationToken(userId: string): Promise<string> {
  const token = generateSecureToken();
  const hashed = hashToken(token);
  // Implementation assumes VerificationToken model exists in Prisma
  // await prisma.verificationToken.create({ data: { token: hashed, userId } });
  return token;
}

export async function createPasswordResetToken(userId: string): Promise<string> {
  const token = generateSecureToken();
  const hashed = hashToken(token);
  // Implementation assumes PasswordResetToken model exists
  // expires in 1h
  return token;
}

export async function verifyEmailToken(token: string): Promise<{ userId: string } | null> {
  const hashed = hashToken(token);
  // return prisma.verificationToken.findUnique...
  return null;
}

export async function verifyPasswordResetToken(token: string): Promise<{ userId: string } | null> {
  const hashed = hashToken(token);
  // return prisma.passwordResetToken.findUnique...
  return null;
}
