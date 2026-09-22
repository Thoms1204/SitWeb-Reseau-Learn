import { CorrectionResult } from './correction-engine';

export type McqQuestionData = {
  question: string;
  options: { id: string; text: string }[];
  multiple: boolean;
};

export type McqAnswerData = {
  correctIds: string[];
  explanations: Record<string, string>;
};

export function validateMcq(
  questionData: McqQuestionData,
  answerData: McqAnswerData,
  userAnswer: string | string[]
): CorrectionResult {
  const userAnswersArray = Array.isArray(userAnswer) ? userAnswer : [userAnswer];
  
  const isCorrect = userAnswersArray.length === answerData.correctIds.length &&
                    userAnswersArray.every(id => answerData.correctIds.includes(id));
  
  const explanationLines = userAnswersArray.map(id => {
    const isOptionCorrect = answerData.correctIds.includes(id);
    const exp = answerData.explanations[id] || (isOptionCorrect ? 'Option correcte.' : 'Option incorrecte.');
    return `- L'option sélectionnée est ${isOptionCorrect ? 'juste' : 'fausse'} car : ${exp}`;
  });

  return {
    isCorrect,
    correctAnswer: answerData.correctIds,
    explanation: explanationLines.join('\n'),
  };
}
