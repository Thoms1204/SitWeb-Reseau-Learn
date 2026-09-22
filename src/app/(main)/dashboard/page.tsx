"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { XpBar } from "@/components/gamification/XpBar";
import { StreakCounter } from "@/components/gamification/StreakCounter";
import { BadgeCard } from "@/components/gamification/BadgeCard";
import {
  BookOpen,
  Brain,
  Trophy,
  Target,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

interface DashboardData {
  user: {
    username: string;
    totalXp: number;
    currentLevel: number;
    currentStreak: number;
    longestStreak: number;
    streakFreezesAvailable: number;
  };
  levelsProgress: {
    total: number;
    completed: number;
  };
  lessonsToday: number;
  reviewsDue: number;
  recentBadges: {
    slug: string;
    title: string;
    description: string;
    iconUrl: string | null;
    earnedAt: string;
  }[];
  xpProgress: {
    level: number;
    currentXp: number;
    requiredXp: number;
    progressPercent: number;
  };
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with real API call
    // For now, show placeholder
    setLoading(false);
    setData({
      user: {
        username: "Apprenant",
        totalXp: 0,
        currentLevel: 1,
        currentStreak: 0,
        longestStreak: 0,
        streakFreezesAvailable: 1,
      },
      levelsProgress: { total: 6, completed: 0 },
      lessonsToday: 0,
      reviewsDue: 0,
      recentBadges: [],
      xpProgress: {
        level: 1,
        currentXp: 0,
        requiredXp: 100,
        progressPercent: 0,
      },
    });
  }, []);

  if (loading || !data) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 rounded-lg bg-[var(--muted)]" />
          <div className="grid gap-4 md:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-28 rounded-xl bg-[var(--muted)]"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Bonjour, {data.user.username} 👋
          </h1>
          <p className="text-[var(--muted-foreground)]">
            Continue ton apprentissage des réseaux
          </p>
        </div>
        <div className="flex items-center gap-4">
          <StreakCounter
            streak={data.user.currentStreak}
            isActiveToday={data.lessonsToday > 0}
          />
          <XpBar
            level={data.xpProgress.level}
            currentXp={data.xpProgress.currentXp}
            requiredXp={data.xpProgress.requiredXp}
            progressPercent={data.xpProgress.progressPercent}
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<Target className="h-5 w-5 text-primary-500" />}
          label="Niveaux complétés"
          value={`${data.levelsProgress.completed}/${data.levelsProgress.total}`}
        />
        <StatCard
          icon={<BookOpen className="h-5 w-5 text-success-500" />}
          label="Leçons aujourd'hui"
          value={String(data.lessonsToday)}
        />
        <StatCard
          icon={<Brain className="h-5 w-5 text-warning-500" />}
          label="Révisions à faire"
          value={String(data.reviewsDue)}
          highlight={data.reviewsDue > 0}
        />
        <StatCard
          icon={<TrendingUp className="h-5 w-5 text-[var(--color-xp)]" />}
          label="XP total"
          value={`${data.user.totalXp} XP`}
        />
      </div>

      {/* Main Actions */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Continue Learning */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <BookOpen className="h-5 w-5 text-primary-500" />
            Continuer à apprendre
          </h2>
          <p className="mb-4 text-sm text-[var(--muted-foreground)]">
            Reprends là où tu t&apos;es arrêté dans ton parcours.
          </p>
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 rounded-lg bg-primary-500 px-6 py-3 font-medium text-white transition-colors hover:bg-primary-600"
          >
            Voir les niveaux
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Review */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <Brain className="h-5 w-5 text-warning-500" />
            Révisions du jour
          </h2>
          {data.reviewsDue > 0 ? (
            <>
              <p className="mb-4 text-sm text-[var(--muted-foreground)]">
                Tu as {data.reviewsDue} exercice
                {data.reviewsDue > 1 ? "s" : ""} à réviser pour renforcer ta
                mémoire.
              </p>
              <Link
                href="/review"
                className="inline-flex items-center gap-2 rounded-lg bg-warning-500 px-6 py-3 font-medium text-white transition-colors hover:bg-warning-600"
              >
                Commencer les révisions
                <ArrowRight className="h-4 w-4" />
              </Link>
            </>
          ) : (
            <p className="text-sm text-[var(--muted-foreground)]">
              Aucune révision pour le moment. Continue d&apos;apprendre pour
              alimenter ta file de révision ! 🎉
            </p>
          )}
        </div>
      </div>

      {/* Badges */}
      {data.recentBadges.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <Trophy className="h-5 w-5 text-[var(--color-xp)]" />
            Badges récents
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.recentBadges.map((badge) => (
              <BadgeCard
                key={badge.slug}
                title={badge.title}
                description={badge.description}
                iconUrl={badge.iconUrl}
                earnedAt={badge.earnedAt}
                isEarned={true}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  highlight = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        highlight
          ? "border-warning-500 bg-warning-50 dark:bg-warning-500/10"
          : "border-[var(--border)] bg-[var(--card)]"
      }`}
    >
      <div className="mb-2 flex items-center gap-2">
        {icon}
        <span className="text-sm text-[var(--muted-foreground)]">{label}</span>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
