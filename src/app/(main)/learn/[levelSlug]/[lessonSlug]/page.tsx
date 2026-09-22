"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ExerciseRenderer } from "@/components/learning/ExerciseRenderer";
import { FeedbackPanel } from "@/components/learning/FeedbackPanel";
import { ProgressBar } from "@/components/learning/ProgressBar";
import { XpGainAnimation } from "@/components/gamification/XpGainAnimation";
import { LevelUpModal } from "@/components/gamification/LevelUpModal";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

interface ExerciseData {
  id: number;
  type: "MCQ" | "SUBNET_CALC" | "DRAG_DROP" | "TOPOLOGY" | "CLI_SIM";
  questionData: Record<string, unknown>;
  answerData: Record<string, unknown>;
  feedbackData: Record<string, unknown>;
  xpValue: number;
  orderIndex: number;
}

interface LessonData {
  id: number;
  title: string;
  description: string;
  xpReward: number;
  exercises: ExerciseData[];
}

interface SubmissionResult {
  isCorrect: boolean;
  correctAnswer: unknown;
  explanation: string;
  steps?: string[];
  relatedConcept?: string;
  xpEarned: number;
  newBadges: { slug: string; title: string }[];
  lessonCompleted: boolean;
  levelCompleted: boolean;
  levelUnlocked: string[];
}

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const levelSlug = params.levelSlug as string;
  const lessonSlug = params.lessonSlug as string;

  const [lesson, setLesson] = useState<LessonData | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [feedback, setFeedback] = useState<SubmissionResult | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [xpGain, setXpGain] = useState<number | null>(null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lessonComplete, setLessonComplete] = useState(false);
  const [totalXpEarned, setTotalXpEarned] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [attemptCounts, setAttemptCounts] = useState<Record<number, number>>(
    {}
  );

  useEffect(() => {
    // TODO: Replace with API call to /api/learn/lessons/[lessonId]
    setLoading(false);
    setLesson({
      id: 1,
      title: "Le modèle OSI",
      description: "Les 7 couches du modèle OSI et leurs fonctions",
      xpReward: 20,
      exercises: [
        {
          id: 1,
          type: "MCQ",
          questionData: {
            question:
              "Combien de couches comporte le modèle OSI ?",
            options: [
              { id: "a", text: "4 couches" },
              { id: "b", text: "5 couches" },
              { id: "c", text: "7 couches" },
              { id: "d", text: "6 couches" },
            ],
            multiple: false,
          },
          answerData: {
            correctIds: ["c"],
            explanations: {
              a: "4 couches correspond au modèle TCP/IP, pas au modèle OSI.",
              b: "5 couches est parfois utilisé dans des modèles simplifiés, mais le modèle OSI en a 7.",
              c: "Correct ! Le modèle OSI comporte 7 couches : Physique, Liaison, Réseau, Transport, Session, Présentation, Application.",
              d: "Le modèle OSI comporte 7 couches, pas 6.",
            },
          },
          feedbackData: {
            concept: "Modèle OSI",
            tip: "Retiens l'acronyme : « Please Do Not Throw Sausage Pizza Away » pour les 7 couches de bas en haut.",
          },
          xpValue: 10,
          orderIndex: 1,
        },
        {
          id: 2,
          type: "MCQ",
          questionData: {
            question:
              "Quelle couche du modèle OSI est responsable du routage des paquets ?",
            options: [
              { id: "a", text: "Couche 1 — Physique" },
              { id: "b", text: "Couche 2 — Liaison de données" },
              { id: "c", text: "Couche 3 — Réseau" },
              { id: "d", text: "Couche 4 — Transport" },
            ],
            multiple: false,
          },
          answerData: {
            correctIds: ["c"],
            explanations: {
              a: "La couche Physique gère les signaux électriques/optiques, pas le routage.",
              b: "La couche Liaison gère les trames et adresses MAC, pas le routage IP.",
              c: "Correct ! La couche Réseau (couche 3) gère l'adressage logique (IP) et le routage des paquets.",
              d: "La couche Transport gère la segmentation et le contrôle de flux (TCP/UDP), pas le routage.",
            },
          },
          feedbackData: {
            concept: "Couche Réseau (L3)",
            tip: "Les routeurs opèrent à la couche 3 du modèle OSI.",
          },
          xpValue: 10,
          orderIndex: 2,
        },
        {
          id: 3,
          type: "MCQ",
          questionData: {
            question:
              "Quel protocole de la couche Transport garantit la livraison fiable des données ?",
            options: [
              { id: "a", text: "UDP" },
              { id: "b", text: "TCP" },
              { id: "c", text: "ICMP" },
              { id: "d", text: "ARP" },
            ],
            multiple: false,
          },
          answerData: {
            correctIds: ["b"],
            explanations: {
              a: "UDP est un protocole sans connexion qui ne garantit pas la livraison.",
              b: "Correct ! TCP (Transmission Control Protocol) assure une livraison fiable grâce au three-way handshake, aux acquittements et à la retransmission.",
              c: "ICMP est un protocole de la couche Réseau utilisé pour les messages d'erreur (ping).",
              d: "ARP (Address Resolution Protocol) résout les adresses IP en adresses MAC, il opère entre les couches 2 et 3.",
            },
          },
          feedbackData: {
            concept: "TCP vs UDP",
            tip: "TCP = fiable mais plus lent. UDP = rapide mais non fiable. Choisis selon le besoin !",
          },
          xpValue: 10,
          orderIndex: 3,
        },
      ],
    });
  }, [lessonSlug]);

  const handleSubmit = useCallback(
    async (answer: unknown) => {
      if (!lesson) return;
      const exercise = lesson.exercises[currentExerciseIndex];

      // Track attempt count for this exercise
      const newAttemptCounts = { ...attemptCounts };
      newAttemptCounts[exercise.id] = (newAttemptCounts[exercise.id] || 0) + 1;
      setAttemptCounts(newAttemptCounts);

      // TODO: Replace with API call to /api/learn/exercises/submit
      // For now, simulate correction locally
      const questionData = exercise.questionData as {
        options: { id: string; text: string }[];
      };
      const answerData = exercise.answerData as {
        correctIds: string[];
        explanations: Record<string, string>;
      };
      const userAnswerStr = answer as string;
      const isCorrect = answerData.correctIds.includes(userAnswerStr);
      const xpEarned = isCorrect
        ? Math.max(
            2,
            exercise.xpValue - (newAttemptCounts[exercise.id] - 1) * 2
          )
        : 0;

      if (isCorrect) {
        setCorrectCount((prev) => prev + 1);
        setTotalXpEarned((prev) => prev + xpEarned);
      }

      const result: SubmissionResult = {
        isCorrect,
        correctAnswer: answerData.correctIds[0],
        explanation:
          answerData.explanations[userAnswerStr] || "Réponse inattendue.",
        steps: undefined,
        relatedConcept: (exercise.feedbackData as { concept?: string }).concept,
        xpEarned,
        newBadges: [],
        lessonCompleted:
          isCorrect && currentExerciseIndex === lesson.exercises.length - 1,
        levelCompleted: false,
        levelUnlocked: [],
      };

      setFeedback(result);
      setShowFeedback(true);
      if (xpEarned > 0) {
        setXpGain(xpEarned);
        setTimeout(() => setXpGain(null), 1500);
      }
    },
    [lesson, currentExerciseIndex, attemptCounts]
  );

  const handleContinue = useCallback(() => {
    if (!lesson) return;

    // If answer was wrong, allow retry
    if (feedback && !feedback.isCorrect) {
      setShowFeedback(false);
      setFeedback(null);
      return;
    }

    // If last exercise and correct, show completion
    if (currentExerciseIndex >= lesson.exercises.length - 1) {
      setLessonComplete(true);
      setShowFeedback(false);
      return;
    }

    // Move to next exercise
    setCurrentExerciseIndex((prev) => prev + 1);
    setShowFeedback(false);
    setFeedback(null);
  }, [lesson, currentExerciseIndex, feedback]);

  if (loading || !lesson) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-4 w-full rounded bg-[var(--muted)]" />
          <div className="h-32 rounded-xl bg-[var(--muted)]" />
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-12 rounded-lg bg-[var(--muted)]" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Lesson complete screen
  if (lessonComplete) {
    const score = Math.round(
      (correctCount / lesson.exercises.length) * 100
    );
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center">
        <div className="mb-6 animate-level-unlock">
          <CheckCircle2 className="mx-auto h-16 w-16 text-success-500" />
        </div>
        <h1 className="mb-2 text-3xl font-bold">Leçon terminée ! 🎉</h1>
        <p className="mb-6 text-lg text-[var(--muted-foreground)]">
          {lesson.title}
        </p>

        <div className="mb-8 flex items-center justify-center gap-8">
          <div className="text-center">
            <p className="text-3xl font-bold text-[var(--color-xp)]">
              +{totalXpEarned}
            </p>
            <p className="text-sm text-[var(--muted-foreground)]">XP gagnés</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">{score}%</p>
            <p className="text-sm text-[var(--muted-foreground)]">Score</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">
              {correctCount}/{lesson.exercises.length}
            </p>
            <p className="text-sm text-[var(--muted-foreground)]">Correct</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <Link
            href={`/learn/${levelSlug}`}
            className="inline-flex items-center gap-2 rounded-lg bg-primary-500 px-8 py-3 font-medium text-white transition-colors hover:bg-primary-600"
          >
            Continuer
          </Link>
          <button
            onClick={() => {
              setLessonComplete(false);
              setCurrentExerciseIndex(0);
              setCorrectCount(0);
              setTotalXpEarned(0);
              setAttemptCounts({});
              setFeedback(null);
              setShowFeedback(false);
            }}
            className="text-sm text-[var(--muted-foreground)] hover:underline"
          >
            Refaire cette leçon
          </button>
        </div>
      </div>
    );
  }

  const exercise = lesson.exercises[currentExerciseIndex];

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href={`/learn/${levelSlug}`}
          className="inline-flex items-center gap-1 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Quitter
        </Link>
        <span className="text-sm font-medium text-[var(--muted-foreground)]">
          {lesson.title}
        </span>
      </div>

      {/* Progress */}
      <ProgressBar
        current={currentExerciseIndex + 1}
        total={lesson.exercises.length}
      />

      {/* Exercise */}
      <div className="mt-6">
        {!showFeedback ? (
          <ExerciseRenderer
            exercise={exercise}
            onSubmit={handleSubmit}
            exerciseNumber={currentExerciseIndex + 1}
            totalExercises={lesson.exercises.length}
          />
        ) : (
          feedback && (
            <FeedbackPanel
              isCorrect={feedback.isCorrect}
              explanation={feedback.explanation}
              steps={feedback.steps}
              relatedConcept={feedback.relatedConcept}
              xpEarned={feedback.xpEarned}
              onContinue={handleContinue}
            />
          )
        )}
      </div>

      {/* XP Animation */}
      {xpGain !== null && <XpGainAnimation amount={xpGain} />}

      {/* Level Up Modal */}
      {showLevelUp && (
        <LevelUpModal
          level={newLevel}
          onClose={() => setShowLevelUp(false)}
        />
      )}
    </div>
  );
}
