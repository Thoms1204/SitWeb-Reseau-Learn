"use client";

import { useState, useEffect, useCallback } from "react";
import { SpacedReviewCard } from "@/components/review/SpacedReviewCard";
import { Brain, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ReviewExercise {
  id: number;
  exerciseId: number;
  type: "MCQ" | "SUBNET_CALC";
  questionData: Record<string, unknown>;
  answerData: Record<string, unknown>;
  feedbackData: Record<string, unknown>;
  repetitions: number;
  easeFactor: number;
}

export default function ReviewPage() {
  const [exercises, setExercises] = useState<ReviewExercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [totalReviewed, setTotalReviewed] = useState(0);

  useEffect(() => {
    // TODO: Replace with API call to /api/review/due
    setLoading(false);
    setExercises([]); // Will be populated from API
  }, []);

  const handleGrade = useCallback(
    async (grade: number) => {
      // TODO: POST to /api/review/submit
      setTotalReviewed((prev) => prev + 1);

      if (currentIndex >= exercises.length - 1) {
        setCompleted(true);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    },
    [currentIndex, exercises.length]
  );

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 rounded-lg bg-[var(--muted)]" />
          <div className="h-64 rounded-xl bg-[var(--muted)]" />
        </div>
      </div>
    );
  }

  if (exercises.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center">
        <Brain className="mx-auto mb-4 h-16 w-16 text-[var(--muted-foreground)]" />
        <h1 className="mb-2 text-2xl font-bold">Aucune révision</h1>
        <p className="mb-6 text-[var(--muted-foreground)]">
          Tu n&apos;as aucun exercice à réviser pour le moment. Continue
          d&apos;apprendre pour alimenter ta file de révision !
        </p>
        <Link
          href="/learn"
          className="inline-flex items-center gap-2 rounded-lg bg-primary-500 px-6 py-3 font-medium text-white transition-colors hover:bg-primary-600"
        >
          Continuer à apprendre
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center">
        <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-success-500" />
        <h1 className="mb-2 text-2xl font-bold">
          Révisions terminées ! 🧠
        </h1>
        <p className="mb-2 text-lg text-[var(--muted-foreground)]">
          Tu as révisé {totalReviewed} exercice
          {totalReviewed > 1 ? "s" : ""} aujourd&apos;hui.
        </p>
        <p className="mb-6 text-sm text-[var(--muted-foreground)]">
          +{totalReviewed * 5} XP gagnés grâce aux révisions
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-lg bg-primary-500 px-6 py-3 font-medium text-white transition-colors hover:bg-primary-600"
        >
          Retour au tableau de bord
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-xl font-bold">
          <Brain className="h-6 w-6 text-warning-500" />
          Révisions du jour
        </h1>
        <span className="text-sm text-[var(--muted-foreground)]">
          {currentIndex + 1}/{exercises.length}
        </span>
      </div>

      {/* Progress */}
      <div className="mb-6 h-2 overflow-hidden rounded-full bg-[var(--muted)]">
        <div
          className="h-full rounded-full bg-warning-500 transition-all duration-300"
          style={{
            width: `${((currentIndex + 1) / exercises.length) * 100}%`,
          }}
        />
      </div>

      <SpacedReviewCard
        exercise={exercises[currentIndex]}
        onGrade={handleGrade}
      />
    </div>
  );
}
