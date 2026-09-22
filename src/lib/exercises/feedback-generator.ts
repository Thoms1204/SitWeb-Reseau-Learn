import { ExerciseType } from '@/types/learning';
import { CorrectionResult } from './correction-engine';
import { FeedbackOutput } from '@/types/gdpr'; // Type definition shared

export function generateFeedback(
  exerciseType: ExerciseType,
  result: CorrectionResult,
  feedbackData: Record<string, unknown>
): FeedbackOutput {
  if (result.isCorrect) {
    return {
      title: 'Excellent !',
      message: 'Bonne réponse !',
      explanation: result.explanation,
      steps: result.steps || [],
      relatedConcept: result.relatedConcept,
    };
  }

  return {
    title: 'Presque !',
    message: 'Votre réponse n\'est pas tout à fait correcte.',
    explanation: result.explanation,
    steps: result.steps || [],
    tip: 'Vérifiez attentivement vos calculs et vos options.',
    relatedConcept: result.relatedConcept,
  };
}
