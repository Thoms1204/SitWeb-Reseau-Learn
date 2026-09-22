export const levelsSeed = [
  {
    slug: 'fundamentals',
    title: 'Fondamentaux réseaux',
    description: 'Comprendre les bases des réseaux informatiques (modèle OSI, topologies).',
    order_index: 1,
    xp_reward: 100,
    prerequisites: []
  },
  {
    slug: 'ipv4-addressing',
    title: 'Adressage IPv4',
    description: 'Maîtriser les adresses IP, les classes, et les masques de sous-réseau basiques.',
    order_index: 2,
    xp_reward: 150,
    prerequisites: ['fundamentals']
  },
  {
    slug: 'subnetting-vlsm',
    title: 'Sous-réseaux & VLSM',
    description: 'Diviser un réseau en sous-réseaux de tailles variables avec VLSM.',
    order_index: 3,
    xp_reward: 200,
    prerequisites: ['ipv4-addressing']
  },
  {
    slug: 'routing-protocols',
    title: 'Protocoles de routage',
    description: 'Découvrir le routage statique et dynamique (OSPF, RIP).',
    order_index: 4,
    xp_reward: 250,
    prerequisites: ['subnetting-vlsm']
  },
  {
    slug: 'network-services',
    title: 'Services réseau',
    description: 'DHCP, DNS, NAT : les services essentiels au bon fonctionnement d\'un réseau.',
    order_index: 5,
    xp_reward: 250,
    prerequisites: ['subnetting-vlsm']
  },
  {
    slug: 'security-troubleshooting',
    title: 'Sécurité & Dépannage',
    description: 'Sécuriser les équipements et diagnostiquer les pannes réseau complexes.',
    order_index: 6,
    xp_reward: 300,
    prerequisites: ['routing-protocols', 'network-services']
  }
];
