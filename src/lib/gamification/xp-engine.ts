import {
  XP_PER_EXERCISE,
  XP_RETRY_PENALTY,
  XP_MIN_PER_EXERCISE,
  XP_LESSON_BONUS,
  XP_STREAK_BONUS,
  XP_PERFECT_BONUS,
  STREAK_BONUS_THRESHOLD,
  LEVEL_XP_FORMULA,
} from './constants';
import { XpSource } from '@/types/gamification';
import prisma from '@/lib/db';

export function calculateExerciseXp(isCorrect: boolean, attemptNumber: number): number {
  if (!isCorrect) return 0;
  const xp = XP_PER_EXERCISE - (attemptNumber - 1) * XP_RETRY_PENALTY;
  return Math.max(xp, XP_MIN_PER_EXERCISE);
}

export function calculateLessonCompletionXp(isPerfect: boolean, currentStreak: number): number {
  let xp = XP_LESSON_BONUS;
  if (isPerfect) xp += XP_PERFECT_BONUS;
  if (currentStreak >= STREAK_BONUS_THRESHOLD) xp += XP_STREAK_BONUS;
  return xp;
}

export function getUserLevel(totalXp: number): number {
  let level = 1;
  while (LEVEL_XP_FORMULA(level + 1) <= totalXp) {
    level++;
  }
  return level;
}

export function getXpForNextLevel(currentLevel: number): number {
  return LEVEL_XP_FORMULA(currentLevel + 1);
}

export function getXpProgress(totalXp: number): { level: number; currentXp: number; requiredXp: number; progressPercent: number } {
  const level = getUserLevel(totalXp);
  const xpForCurrentLevel = LEVEL_XP_FORMULA(level);
  const requiredXp = getXpForNextLevel(level);
  
  const currentLevelXp = totalXp - xpForCurrentLevel;
  const xpNeeded = requiredXp - xpForCurrentLevel;
  const progressPercent = Math.min(100, Math.max(0, Math.round((currentLevelXp / xpNeeded) * 100)));

  return {
    level,
    currentXp: totalXp,
    requiredXp,
    progressPercent,
  };
}

export async function awardXp(userId: string, amount: number, source: XpSource, referenceId?: string): Promise<void> {
  if (amount <= 0) return;
  // Implement XP award via Prisma
  // await prisma.$transaction([
  //   prisma.xpTransaction.create({ data: { userId, amount, source, referenceId } }),
  //   prisma.user.update({ where: { id: userId }, data: { totalXp: { increment: amount } } })
  // ]);
}
