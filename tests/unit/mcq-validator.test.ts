import { describe, it, expect } from 'vitest';
import { validateMcq } from '@/lib/exercises/mcq-validator';

describe('MCQ Validator', () => {
  it('should validate single correct answer', () => {
    const question = { type: 'single', options: [{ id: 'A', correct: true }, { id: 'B', correct: false }] };
    expect(validateMcq(['A'], question).isCorrect).toBe(true);
  });

  it('should validate single wrong answer', () => {
    const question = { type: 'single', options: [{ id: 'A', correct: true }, { id: 'B', correct: false }] };
    expect(validateMcq(['B'], question).isCorrect).toBe(false);
  });

  it('should validate multiple correct answers', () => {
    const question = { type: 'multiple', options: [{ id: 'A', correct: true }, { id: 'B', correct: true }, { id: 'C', correct: false }] };
    expect(validateMcq(['A', 'B'], question).isCorrect).toBe(true);
  });

  it('should invalidate multiple answers with partial match', () => {
    const question = { type: 'multiple', options: [{ id: 'A', correct: true }, { id: 'B', correct: true }, { id: 'C', correct: false }] };
    expect(validateMcq(['A'], question).isCorrect).toBe(false);
    expect(validateMcq(['A', 'C'], question).isCorrect).toBe(false);
  });

  it('should generate appropriate explanation for each option', () => {
    const question = { 
      type: 'single', 
      options: [
        { id: 'A', correct: true, explanation: 'A is right' }, 
        { id: 'B', correct: false, explanation: 'B is wrong' }
      ] 
    };
    const result = validateMcq(['A'], question);
    expect(result.explanations).toContain('A is right');
  });

  it('should handle unknown option ID gracefully', () => {
    const question = { type: 'single', options: [{ id: 'A', correct: true }] };
    const result = validateMcq(['UNKNOWN'], question);
    expect(result.isCorrect).toBe(false);
  });
});
