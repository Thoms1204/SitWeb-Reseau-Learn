import { describe, it, expect } from 'vitest';
import { 
  calculateExerciseXp, 
  calculateLessonCompletionXp, 
  getUserLevel, 
  getXpForNextLevel, 
  getXpProgress 
} from '@/lib/gamification/xp-engine';

describe('XP Engine', () => {
  describe('calculateExerciseXp', () => {
    it('correct 1st attempt = 10', () => {
      expect(calculateExerciseXp(true, 1)).toBe(10);
    });
    
    it('correct 2nd attempt = 8', () => {
      expect(calculateExerciseXp(true, 2)).toBe(8);
    });

    it('correct 5th attempt = max(2, 10-8) = 2', () => {
      expect(calculateExerciseXp(true, 5)).toBe(2);
    });

    it('incorrect = 0', () => {
      expect(calculateExerciseXp(false, 1)).toBe(0);
    });
  });

  describe('calculateLessonCompletionXp', () => {
    it('base = 20', () => {
      expect(calculateLessonCompletionXp({ isPerfect: false, streak: 0 })).toBe(20);
    });

    it('perfect = 30 (20+10)', () => {
      expect(calculateLessonCompletionXp({ isPerfect: true, streak: 0 })).toBe(30);
    });

    it('streak >= 7 = 25 (20+5)', () => {
      expect(calculateLessonCompletionXp({ isPerfect: false, streak: 7 })).toBe(25);
    });

    it('perfect + streak = 35 (20+10+5)', () => {
      expect(calculateLessonCompletionXp({ isPerfect: true, streak: 7 })).toBe(35);
    });
  });

  describe('Leveling', () => {
    it('getUserLevel: 0 XP = level 1, 100 XP = level 2, 283 XP = level 3', () => {
      expect(getUserLevel(0)).toBe(1);
      expect(getUserLevel(100)).toBe(2);
      expect(getUserLevel(283)).toBe(3);
    });

    it('getXpForNextLevel: returns correct thresholds', () => {
      expect(getXpForNextLevel(1)).toBe(100);
    });

    it('getXpProgress: correct progress calculation', () => {
      expect(getXpProgress(50)).toBeCloseTo(0.5, 1);
    });
  });
});
