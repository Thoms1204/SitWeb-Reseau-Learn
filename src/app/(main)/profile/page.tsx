"use client";

import { useState, useEffect } from "react";
import { BadgeCard } from "@/components/gamification/BadgeCard";
import { XpBar } from "@/components/gamification/XpBar";
import { StreakCounter } from "@/components/gamification/StreakCounter";
import {
  User,
  Trophy,
  Calendar,
  TrendingUp,
  Settings,
} from "lucide-react";
import Link from "next/link";

interface UserProfile {
  username: string;
  email: string;
  avatarUrl: string | null;
  totalXp: number;
  currentLevel: number;
  currentStreak: number;
  longestStreak: number;
  streakFreezesAvailable: number;
  createdAt: string;
  badges: {
    slug: string;
    title: string;
    description: string;
    iconUrl: string | null;
    earnedAt: string | null;
    isEarned: boolean;
  }[];
  xpProgress: {
    level: number;
    currentXp: number;
    requiredXp: number;
    progressPercent: number;
  };
  stats: {
    lessonsCompleted: number;
    exercisesCompleted: number;
    reviewsCompleted: number;
    levelsCompleted: number;
  };
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with API call to /api/user/profile
    setLoading(false);
    setProfile({
      username: "Apprenant",
      email: "user@example.com",
      avatarUrl: null,
      totalXp: 0,
      currentLevel: 1,
      currentStreak: 0,
      longestStreak: 0,
      streakFreezesAvailable: 1,
      createdAt: new Date().toISOString(),
      badges: [
        {
          slug: "premier-pas",
          title: "🌱 Premier Pas",
          description: "Compléter la première leçon",
          iconUrl: null,
          earnedAt: null,
          isEarned: false,
        },
        {
          slug: "flamme-naissante",
          title: "🔥 Flamme Naissante",
          description: "Streak de 7 jours",
          iconUrl: null,
          earnedAt: null,
          isEarned: false,
        },
        {
          slug: "sommet-atteint",
          title: "🏔️ Sommet Atteint",
          description: "Compléter le niveau 6",
          iconUrl: null,
          earnedAt: null,
          isEarned: false,
        },
        {
          slug: "perfectionniste",
          title: "💯 Perfectionniste",
          description: "Score 100% sur un niveau entier",
          iconUrl: null,
          earnedAt: null,
          isEarned: false,
        },
        {
          slug: "reviseur-assidu",
          title: "🧠 Réviseur Assidu",
          description: "50 révisions espacées complétées",
          iconUrl: null,
          earnedAt: null,
          isEarned: false,
        },
        {
          slug: "rapide-precis",
          title: "⚡ Rapide & Précis",
          description: "Compléter une leçon sans erreur en < 5 min",
          iconUrl: null,
          earnedAt: null,
          isEarned: false,
        },
      ],
      xpProgress: {
        level: 1,
        currentXp: 0,
        requiredXp: 100,
        progressPercent: 0,
      },
      stats: {
        lessonsCompleted: 0,
        exercisesCompleted: 0,
        reviewsCompleted: 0,
        levelsCompleted: 0,
      },
    });
  }, []);

  if (loading || !profile) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-32 rounded-xl bg-[var(--muted)]" />
          <div className="grid gap-4 md:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 rounded-xl bg-[var(--muted)]" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Profile header */}
      <div className="mb-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          {/* Avatar */}
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-100 text-2xl font-bold text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
            {profile.username[0]?.toUpperCase() || "?"}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">{profile.username}</h1>
              <Link
                href="/settings"
                className="rounded-lg p-1.5 text-[var(--muted-foreground)] transition-colors hover:bg-[var(--muted)]"
                aria-label="Paramètres"
              >
                <Settings className="h-5 w-5" />
              </Link>
            </div>
            <p className="text-sm text-[var(--muted-foreground)]">
              Membre depuis le{" "}
              {new Date(profile.createdAt).toLocaleDateString("fr-FR", {
                month: "long",
                year: "numeric",
              })}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-4">
              <XpBar
                level={profile.xpProgress.level}
                currentXp={profile.xpProgress.currentXp}
                requiredXp={profile.xpProgress.requiredXp}
                progressPercent={profile.xpProgress.progressPercent}
              />
              <StreakCounter
                streak={profile.currentStreak}
                isActiveToday={false}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatBox
          icon={<TrendingUp className="h-5 w-5 text-[var(--color-xp)]" />}
          value={`${profile.totalXp}`}
          label="XP total"
        />
        <StatBox
          icon={<Trophy className="h-5 w-5 text-primary-500" />}
          value={`${profile.stats.levelsCompleted}/6`}
          label="Niveaux complétés"
        />
        <StatBox
          icon={<Calendar className="h-5 w-5 text-[var(--color-streak)]" />}
          value={`${profile.longestStreak}`}
          label="Plus long streak"
        />
        <StatBox
          icon={<User className="h-5 w-5 text-success-500" />}
          value={`${profile.stats.reviewsCompleted}`}
          label="Révisions faites"
        />
      </div>

      {/* Badges */}
      <div>
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <Trophy className="h-5 w-5 text-[var(--color-xp)]" />
          Badges ({profile.badges.filter((b) => b.isEarned).length}/
          {profile.badges.length})
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {profile.badges.map((badge) => (
            <BadgeCard
              key={badge.slug}
              title={badge.title}
              description={badge.description}
              iconUrl={badge.iconUrl}
              earnedAt={badge.earnedAt}
              isEarned={badge.isEarned}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function StatBox({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 text-center">
      <div className="mb-1 flex items-center justify-center gap-2">
        {icon}
        <span className="text-2xl font-bold">{value}</span>
      </div>
      <p className="text-sm text-[var(--muted-foreground)]">{label}</p>
    </div>
  );
}
