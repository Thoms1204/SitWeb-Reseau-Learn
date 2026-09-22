"use client";

import { useState, useEffect } from "react";
import { LevelTree } from "@/components/learning/LevelTree";
import { Sidebar } from "@/components/layout/Sidebar";
import type { Metadata } from "next";

interface LevelData {
  id: number;
  slug: string;
  title: string;
  description: string;
  orderIndex: number;
  xpReward: number;
  requiredScorePercent: number;
  iconUrl: string | null;
  progress: {
    status: "LOCKED" | "UNLOCKED" | "IN_PROGRESS" | "COMPLETED";
    bestScorePercent: number;
    attemptsCount: number;
  } | null;
  lessonsCount: number;
  completedLessonsCount: number;
  prerequisites: number[];
}

export default function LearnPage() {
  const [levels, setLevels] = useState<LevelData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with real API call to /api/learn/levels
    setLoading(false);
    setLevels([
      {
        id: 1,
        slug: "fundamentals",
        title: "Fondamentaux réseaux",
        description: "Modèle OSI, TCP vs UDP, topologies réseau",
        orderIndex: 1,
        xpReward: 100,
        requiredScorePercent: 80,
        iconUrl: null,
        progress: { status: "UNLOCKED", bestScorePercent: 0, attemptsCount: 0 },
        lessonsCount: 5,
        completedLessonsCount: 0,
        prerequisites: [],
      },
      {
        id: 2,
        slug: "ipv4-addressing",
        title: "Adressage IPv4",
        description: "Classes d'adresses, masques, conversion binaire",
        orderIndex: 2,
        xpReward: 120,
        requiredScorePercent: 80,
        iconUrl: null,
        progress: { status: "LOCKED", bestScorePercent: 0, attemptsCount: 0 },
        lessonsCount: 6,
        completedLessonsCount: 0,
        prerequisites: [1],
      },
      {
        id: 3,
        slug: "subnetting-vlsm",
        title: "Sous-réseaux & VLSM",
        description: "Subnetting, VLSM, supernetting",
        orderIndex: 3,
        xpReward: 150,
        requiredScorePercent: 80,
        iconUrl: null,
        progress: { status: "LOCKED", bestScorePercent: 0, attemptsCount: 0 },
        lessonsCount: 6,
        completedLessonsCount: 0,
        prerequisites: [2],
      },
      {
        id: 4,
        slug: "routing-protocols",
        title: "Protocoles de routage",
        description: "RIP, OSPF, BGP, tables de routage",
        orderIndex: 4,
        xpReward: 150,
        requiredScorePercent: 80,
        iconUrl: null,
        progress: { status: "LOCKED", bestScorePercent: 0, attemptsCount: 0 },
        lessonsCount: 5,
        completedLessonsCount: 0,
        prerequisites: [3],
      },
      {
        id: 5,
        slug: "network-services",
        title: "Services réseau",
        description: "DNS, DHCP, NAT, pare-feu",
        orderIndex: 5,
        xpReward: 150,
        requiredScorePercent: 80,
        iconUrl: null,
        progress: { status: "LOCKED", bestScorePercent: 0, attemptsCount: 0 },
        lessonsCount: 5,
        completedLessonsCount: 0,
        prerequisites: [3],
      },
      {
        id: 6,
        slug: "security-troubleshooting",
        title: "Sécurité & Dépannage",
        description: "ACL, VPN, diagnostic réseau",
        orderIndex: 6,
        xpReward: 200,
        requiredScorePercent: 80,
        iconUrl: null,
        progress: { status: "LOCKED", bestScorePercent: 0, attemptsCount: 0 },
        lessonsCount: 5,
        completedLessonsCount: 0,
        prerequisites: [4, 5],
      },
    ]);
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="animate-pulse space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-20 rounded-xl bg-[var(--muted)]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Parcours d&apos;apprentissage</h1>
        <p className="mt-1 text-[var(--muted-foreground)]">
          Progresse à travers 6 niveaux pour maîtriser les réseaux
          informatiques. Obtiens au moins 80% pour débloquer le niveau suivant.
        </p>
      </div>

      <LevelTree levels={levels} />
    </div>
  );
}
