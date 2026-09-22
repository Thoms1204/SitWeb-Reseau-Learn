import { Exercise } from '@/types/learning';
import { validateMcq } from './mcq-validator';
import { validateSubnetCalc } from './subnet-validator';

export type CorrectionResult = {
  isCorrect: boolean;
  correctAnswer: unknown;
  explanation: string;
  steps?: string[];
  relatedConcept?: string;
};

export function correctExercise(exercise: Exercise, userAnswer: unknown): CorrectionResult {
  switch (exercise.type) {
    case 'MCQ':
      return validateMcq(exercise.questionData, exercise.answerData, userAnswer as string | string[]);
    case 'SUBNET_CALC':
      return validateSubnetCalc(exercise.questionData, exercise.answerData, userAnswer as any);
    case 'DRAG_DROP':
    case 'FILL_BLANK':
    default:
      throw new Error(`Validateur non implémenté pour le type d'exercice : ${exercise.type}`);
  }
}
