import { StreakResult, StreakStatus } from '@/types/gamification';
import { MAX_STREAK_FREEZES } from './constants';
import prisma from '@/lib/db';

function toParisDate(date: Date = new Date()): Date {
  return new Date(date.toLocaleString('en-US', { timeZone: 'Europe/Paris' }));
}

function isSameDay(d1: Date, d2: Date): boolean {
  return d1.getFullYear() === d2.getFullYear() && 
         d1.getMonth() === d2.getMonth() && 
         d1.getDate() === d2.getDate();
}

function isYesterday(d1: Date, d2: Date): boolean {
  const yesterday = new Date(d2);
  yesterday.setDate(yesterday.getDate() - 1);
  return isSameDay(d1, yesterday);
}

export async function checkAndUpdateStreak(userId: string): Promise<StreakResult> {
  // DB query mockup
  // const user = await prisma.user.findUnique({ where: { id: userId } });
  const user = { currentStreak: 0, lastActivityAt: new Date(), freezes: 0 };
  
  const now = toParisDate();
  const lastActive = user.lastActivityAt ? toParisDate(user.lastActivityAt) : null;
  
  let wasReset = false;
  let freezeUsed = false;
  let isNewDay = true;
  let newStreak = user.currentStreak;

  if (!lastActive) {
    newStreak = 1;
  } else if (isSameDay(lastActive, now)) {
    isNewDay = false;
  } else if (isYesterday(lastActive, now)) {
    newStreak += 1;
  } else {
    // missed one or more days
    const diffDays = Math.floor((now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 2 && user.freezes > 0) {
      freezeUsed = true;
      newStreak += 1;
      // decrement freeze...
    } else {
      wasReset = true;
      newStreak = 1;
    }
  }

  // await prisma.user.update(...)
  return { streak: newStreak, wasReset, freezeUsed, isNewDay };
}

export async function applyStreakFreeze(userId: string): Promise<boolean> {
  // logic to purchase or apply freeze
  return true;
}

export async function getStreakStatus(userId: string): Promise<StreakStatus> {
  // fetch from db
  return {
    currentStreak: 0,
    longestStreak: 0,
    freezesAvailable: MAX_STREAK_FREEZES,
    activeToday: false,
    lastActivityAt: null,
  };
}

export async function recordDailyActivity(userId: string, xpEarned: number): Promise<void> {
  // add record to streak_history
}
