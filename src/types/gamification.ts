export type XpTransaction = {
  id: string;
  userId: string;
  amount: number;
  source: XpSource;
  referenceId?: string;
  createdAt: Date;
};

export type XpSource = 'EXERCISE' | 'LESSON_COMPLETION' | 'STREAK_BONUS' | 'PERFECT_LESSON' | 'REVIEW';

export type StreakStatus = {
  currentStreak: number;
  longestStreak: number;
  freezesAvailable: number;
  activeToday: boolean;
  lastActivityAt: Date | null;
};

export type StreakResult = {
  streak: number;
  wasReset: boolean;
  freezeUsed: boolean;
  isNewDay: boolean;
};

export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

export type UserBadge = {
  userId: string;
  badgeId: string;
  awardedAt: Date;
};

export type BadgeContext = {
  justCompletedLesson?: boolean;
  justCompletedLevel?: number;
  currentStreak?: number;
  totalReviews?: number;
  lessonTime?: number;
  lessonScore?: number;
};

export type SM2Grade = 0 | 1 | 2 | 3 | 4 | 5;

export type SM2Item = {
  id?: string;
  userId: string;
  exerciseId: number;
  repetitions: number;
  easeFactor: number;
  intervalDays: number;
  nextReviewAt: Date;
};

export type ReviewItem = SM2Item & {
  // Joined exercise data would go here
};
