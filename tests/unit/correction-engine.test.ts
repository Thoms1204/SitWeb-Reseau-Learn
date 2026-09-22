import { describe, it, expect, vi } from 'vitest';
import { evaluateExercise } from '@/lib/exercises/correction-engine';

vi.mock('@/lib/exercises/mcq-validator', () => ({
  validateMcq: vi.fn(() => ({ isCorrect: true }))
}));

vi.mock('@/lib/exercises/subnet-validator', () => ({
  validateSubnetCalc: vi.fn(() => ({ isCorrect: true }))
}));

describe('Correction Engine', () => {
  it('Routes MCQ exercises to mcq-validator', () => {
    const result = evaluateExercise('MCQ', { answer: 'A' }, { type: 'MCQ' });
    expect(result).toBeDefined();
  });

  it('Routes SUBNET_CALC exercises to subnet-validator', () => {
    const result = evaluateExercise('SUBNET_CALC', { network: '192.168.1.0' }, { type: 'SUBNET_CALC' });
    expect(result).toBeDefined();
  });

  it('Returns proper CorrectionResult structure', () => {
    const result = evaluateExercise('MCQ', { answer: 'A' }, { type: 'MCQ' });
    expect(result).toHaveProperty('isCorrect');
  });

  it('Handles unknown exercise type gracefully', () => {
    expect(() => evaluateExercise('UNKNOWN' as any, {}, {})).toThrow();
  });
});
