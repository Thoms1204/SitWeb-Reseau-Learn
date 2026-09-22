import { hash, verify } from '@node-rs/argon2';

export async function hashPassword(password: string): Promise<string> {
  return hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
}

export async function verifyPassword(hashed: string, password: string): Promise<boolean> {
  return verify(hashed, password);
}

export async function validatePasswordStrength(password: string): Promise<{ score: number; feedback: string[] }> {
  const { zxcvbn } = await import('zxcvbn-ts');
  const result = zxcvbn(password);
  
  const feedback = [];
  if (result.feedback.warning) feedback.push(result.feedback.warning);
  feedback.push(...result.feedback.suggestions);

  return {
    score: result.score,
    feedback,
  };
}
