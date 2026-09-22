export const lessonsSeed = [
  // Level 1: Fundamentals
  { levelSlug: 'fundamentals', slug: 'intro-reseaux', title: 'Introduction aux réseaux', description: 'Qu\'est-ce qu\'un réseau ? LAN, WAN, MAN.', order_index: 1, xp_reward: 20 },
  { levelSlug: 'fundamentals', slug: 'topologies', title: 'Topologies physiques et logiques', description: 'Étoile, bus, anneau, maillé.', order_index: 2, xp_reward: 20 },
  { levelSlug: 'fundamentals', slug: 'modele-osi', title: 'Le modèle OSI', description: 'Les 7 couches de l\'architecture réseau.', order_index: 3, xp_reward: 30 },
  { levelSlug: 'fundamentals', slug: 'modele-tcp-ip', title: 'Le modèle TCP/IP', description: 'Différences avec le modèle OSI et importance pratique.', order_index: 4, xp_reward: 20 },
  { levelSlug: 'fundamentals', slug: 'equipements', title: 'Les équipements réseaux', description: 'Switch, routeur, hub, firewall.', order_index: 5, xp_reward: 20 },

  // Level 3: Subnetting & VLSM
  { levelSlug: 'subnetting-vlsm', slug: 'intro-sous-reseaux', title: 'Pourquoi créer des sous-réseaux ?', description: 'Réduire le domaine de diffusion et optimiser l\'adressage.', order_index: 1, xp_reward: 25 },
  { levelSlug: 'subnetting-vlsm', slug: 'calcul-sous-reseaux', title: 'Calcul de sous-réseaux', description: 'Trouver le nombre d\'hôtes, d\'adresses réseau et de broadcast.', order_index: 2, xp_reward: 30 },
  { levelSlug: 'subnetting-vlsm', slug: 'masque-personnalise', title: 'Masques de sous-réseau personnalisés', description: 'Emprunter des bits à la partie hôte.', order_index: 3, xp_reward: 30 },
  { levelSlug: 'subnetting-vlsm', slug: 'vlsm-concept', title: 'Le concept du VLSM', description: 'Variable Length Subnet Mask pour une gestion optimale.', order_index: 4, xp_reward: 35 },
  { levelSlug: 'subnetting-vlsm', slug: 'vlsm-pratique', title: 'Pratique du VLSM', description: 'Exercices avancés de division réseau.', order_index: 5, xp_reward: 40 },
];
