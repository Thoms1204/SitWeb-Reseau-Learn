"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { LessonCard } from "@/components/learning/LessonCard";
import { ArrowLeft, Lock, CheckCircle2, BookOpen } from "lucide-react";

interface LessonData {
  id: number;
  slug: string;
  title: string;
  description: string;
  orderIndex: number;
  xpReward: number;
  progress: {
    status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
    bestScorePercent: number;
    attemptsCount: number;
  } | null;
  exercisesCount: number;
}

interface LevelDetail {
  id: number;
  slug: string;
  title: string;
  description: string;
  requiredScorePercent: number;
  xpReward: number;
  isUnlocked: boolean;
  lessons: LessonData[];
  progress: {
    status: string;
    bestScorePercent: number;
  } | null;
}

export default function LevelPage() {
  const params = useParams();
  const levelSlug = params.levelSlug as string;
  const [level, setLevel] = useState<LevelDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Replace with API call to /api/learn/levels/[levelSlug]
    setLoading(false);
    setLevel({
      id: 1,
      slug: levelSlug,
      title: "Fondamentaux réseaux",
      description:
        "Découvre les bases des réseaux informatiques : modèle OSI, protocoles TCP/UDP, et topologies réseau.",
      requiredScorePercent: 80,
      xpReward: 100,
      isUnlocked: true,
      progress: { status: "UNLOCKED", bestScorePercent: 0 },
      lessons: [
        {
          id: 1,
          slug: "modele-osi",
          title: "Le modèle OSI",
          description: "Les 7 couches du modèle OSI et leurs fonctions",
          orderIndex: 1,
          xpReward: 20,
          progress: null,
          exercisesCount: 4,
        },
        {
          id: 2,
          slug: "tcp-vs-udp",
          title: "TCP vs UDP",
          description:
            "Comprendre les différences entre TCP et UDP",
          orderIndex: 2,
          xpReward: 20,
          progress: null,
          exercisesCount: 4,
        },
        {
          id: 3,
          slug: "topologies-reseau",
          title: "Topologies réseau",
          description: "Bus, étoile, anneau, maillée et leurs cas d'usage",
          orderIndex: 3,
          xpReward: 20,
          progress: null,
          exercisesCount: 3,
        },
        {
          id: 4,
          slug: "equipements-reseau",
          title: "Équipements réseau",
          description:
            "Hub, switch, routeur, pare-feu : rôles et différences",
          orderIndex: 4,
          xpReward: 20,
          progress: null,
          exercisesCount: 4,
        },
        {
          id: 5,
          slug: "adresses-mac-ip",
          title: "Adresses MAC et IP",
          description: "Introduction aux adresses physiques et logiques",
          orderIndex: 5,
          xpReward: 20,
          progress: null,
          exercisesCount: 3,
        },
      ],
    });
  }, [levelSlug]);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-64 rounded-lg bg-[var(--muted)]" />
          <div className="h-4 w-96 rounded bg-[var(--muted)]" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 rounded-xl bg-[var(--muted)]" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !level) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 text-center">
        <Lock className="mx-auto mb-4 h-12 w-12 text-[var(--muted-foreground)]" />
        <h1 className="text-xl font-semibold">Niveau inaccessible</h1>
        <p className="mt-2 text-[var(--muted-foreground)]">
          {error || "Ce niveau n'existe pas ou n'est pas encore débloqué."}
        </p>
        <Link
          href="/learn"
          className="mt-4 inline-flex items-center gap-2 text-primary-500 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux niveaux
        </Link>
      </div>
    );
  }

  const completedLessons = level.lessons.filter(
    (l) => l.progress?.status === "COMPLETED"
  ).length;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* Back link */}
      <Link
        href="/learn"
        className="mb-6 inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour aux niveaux
      </Link>

      {/* Level header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-lg font-bold text-white">
            {level.id}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{level.title}</h1>
            <p className="text-[var(--muted-foreground)]">
              {level.description}
            </p>
          </div>
        </div>

        {/* Progress summary */}
        <div className="mt-4 flex items-center gap-4 text-sm text-[var(--muted-foreground)]">
          <span className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            {completedLessons}/{level.lessons.length} leçons
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4" />
            Score requis : {level.requiredScorePercent}%
          </span>
          <span>+{level.xpReward} XP</span>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--muted)]">
          <div
            className="h-full rounded-full bg-primary-500 transition-all duration-500"
            style={{
              width: `${
                level.lessons.length > 0
                  ? (completedLessons / level.lessons.length) * 100
                  : 0
              }%`,
            }}
          />
        </div>
      </div>

      {/* Lessons list */}
      <div className="space-y-3">
        {level.lessons
          .sort((a, b) => a.orderIndex - b.orderIndex)
          .map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              levelSlug={level.slug}
            />
          ))}
      </div>
    </div>
  );
}
