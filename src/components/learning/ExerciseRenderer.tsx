"use client";

import { McqExercise } from "./McqExercise";
import { SubnetCalcExercise } from "./SubnetCalcExercise";
import { CliSimExercise } from "./CliSimExercise";

interface ExerciseData {
  id: number;
  type: "MCQ" | "SUBNET_CALC" | "DRAG_DROP" | "TOPOLOGY" | "CLI_SIM";
  questionData: Record<string, unknown>;
  answerData: Record<string, unknown>;
  feedbackData: Record<string, unknown>;
  xpValue: number;
  orderIndex: number;
}

interface ExerciseRendererProps {
  exercise: ExerciseData;
  onSubmit: (answer: unknown) => void;
  exerciseNumber: number;
  totalExercises: number;
}

export function ExerciseRenderer({
  exercise,
  onSubmit,
  exerciseNumber,
  totalExercises,
}: ExerciseRendererProps) {
  return (
    <div className="space-y-6">
      <div className="text-sm font-medium text-[var(--muted-foreground)]">
        Exercice {exerciseNumber} sur {totalExercises}
      </div>

      {exercise.type === "MCQ" && (
        <McqExercise exercise={exercise} onSubmit={onSubmit} />
      )}

      {exercise.type === "SUBNET_CALC" && (
        <SubnetCalcExercise exercise={exercise} onSubmit={onSubmit} />
      )}

      {exercise.type === "CLI_SIM" && (
        <CliSimExercise exercise={exercise} onSubmit={onSubmit} />
      )}

      {exercise.type === "DRAG_DROP" && (
        <div className="rounded-xl border border-[var(--border)] p-8 text-center text-[var(--muted-foreground)]">
          Exercice de type glisser-déposer en cours de développement.
        </div>
      )}

      {exercise.type === "TOPOLOGY" && (
        <div className="rounded-xl border border-[var(--border)] p-8 text-center text-[var(--muted-foreground)]">
          Exercice de topologie réseau en cours de développement.
        </div>
      )}
    </div>
  );
}
