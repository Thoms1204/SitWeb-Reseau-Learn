import { describe, it, expect } from 'vitest';
import { calculateSm2, gradeFromPerformance } from '@/lib/spaced-repetition/sm2';

describe('SM-2 Algorithm', () => {
  describe('calculateSm2', () => {
    it('New item with grade 5 (perfect): interval = 1, repetitions = 1, easeFactor increases', () => {
      const result = calculateSm2({ interval: 0, repetitions: 0, easeFactor: 2.5 }, 5);
      expect(result.interval).toBe(1);
      expect(result.repetitions).toBe(1);
      expect(result.easeFactor).toBeGreaterThan(2.5);
    });

    it('New item with grade 0 (fail): interval = 1, repetitions = 0, easeFactor decreases to min 1.3', () => {
      const result = calculateSm2({ interval: 0, repetitions: 0, easeFactor: 1.4 }, 0);
      expect(result.interval).toBe(1);
      expect(result.repetitions).toBe(0);
      expect(result.easeFactor).toBe(1.3);
    });

    it('After 1 correct: interval = 6', () => {
      const result = calculateSm2({ interval: 1, repetitions: 1, easeFactor: 2.5 }, 5);
      expect(result.interval).toBe(6);
    });

    it('After 2+ correct: interval = round(prev * easeFactor)', () => {
      const result = calculateSm2({ interval: 6, repetitions: 2, easeFactor: 2.5 }, 4);
      expect(result.interval).toBe(15);
    });

    it('Grade < 3 always resets repetitions and interval', () => {
      const result = calculateSm2({ interval: 15, repetitions: 3, easeFactor: 2.5 }, 2);
      expect(result.interval).toBe(1);
      expect(result.repetitions).toBe(0);
    });

    it('Ease factor never drops below 1.3', () => {
      const result = calculateSm2({ interval: 1, repetitions: 1, easeFactor: 1.3 }, 1);
      expect(result.easeFactor).toBe(1.3);
    });
    
    it('Ease factor formula matches SM-2 spec', () => {
      const result = calculateSm2({ interval: 1, repetitions: 1, easeFactor: 2.5 }, 4);
      expect(result.easeFactor).toBeCloseTo(2.5);
    });
  });

  describe('gradeFromPerformance', () => {
    it('correct first try fast = 5', () => {
      expect(gradeFromPerformance(true, 1, 5000)).toBe(5);
    });
    
    it('correct slow = 4', () => {
      expect(gradeFromPerformance(true, 1, 30000)).toBe(4);
    });

    it('correct multiple tries = 3', () => {
      expect(gradeFromPerformance(true, 3, 5000)).toBe(3);
    });

    it('incorrect = 1', () => {
      expect(gradeFromPerformance(false, 1, 5000)).toBe(1);
    });
  });
});
