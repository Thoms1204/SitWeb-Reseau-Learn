export const badgesSeed = [
  {
    slug: 'first-blood',
    title: 'Premier pas',
    description: 'Vous avez complété votre première leçon.',
    icon_url: '/badges/first-blood.svg',
    unlock_criteria: {
      type: 'LESSONS_COMPLETED',
      threshold: 1
    }
  },
  {
    slug: 'streak-7',
    title: 'Régulier',
    description: 'Vous avez maintenu une série (streak) de 7 jours.',
    icon_url: '/badges/streak-7.svg',
    unlock_criteria: {
      type: 'STREAK_DAYS',
      threshold: 7
    }
  },
  {
    slug: 'level-1-master',
    title: 'Maître des fondamentaux',
    description: 'Vous avez terminé le niveau "Fondamentaux réseaux".',
    icon_url: '/badges/level-1-master.svg',
    unlock_criteria: {
      type: 'LEVEL_COMPLETED',
      levelSlug: 'fundamentals'
    }
  },
  {
    slug: 'perfect-score',
    title: 'Sans faute',
    description: 'Vous avez obtenu 100% à un exercice ou une leçon.',
    icon_url: '/badges/perfect-score.svg',
    unlock_criteria: {
      type: 'PERFECT_SCORE',
      threshold: 1
    }
  },
  {
    slug: 'xp-1000',
    title: 'Apprenti',
    description: 'Vous avez accumulé 1000 XP.',
    icon_url: '/badges/xp-1000.svg',
    unlock_criteria: {
      type: 'TOTAL_XP',
      threshold: 1000
    }
  },
  {
    slug: 'subnet-guru',
    title: 'Gourou des sous-réseaux',
    description: 'Vous avez complété le niveau "Sous-réseaux & VLSM".',
    icon_url: '/badges/subnet-guru.svg',
    unlock_criteria: {
      type: 'LEVEL_COMPLETED',
      levelSlug: 'subnetting-vlsm'
    }
  }
];
