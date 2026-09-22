export const exercisesSeed = [
  // Level 1: Fundamentals - Intro
  {
    lessonSlug: 'intro-reseaux',
    type: 'MCQ',
    order_index: 1,
    xp_value: 10,
    question_data: {
      question: "Qu'est-ce qu'un réseau LAN ?",
      options: [
        { id: 'a', text: 'Local Area Network (Réseau local)' },
        { id: 'b', text: 'Large Area Network (Réseau étendu)' },
        { id: 'c', text: 'Logical Access Node (Nœud d\'accès logique)' },
        { id: 'd', text: 'Linked Area Network (Réseau de zones liées)' }
      ]
    },
    answer_data: { correctOptionId: 'a' },
    feedback_data: {
      correct: "Excellent ! LAN signifie Local Area Network, un réseau limité à une petite zone géographique comme une maison ou un bureau.",
      incorrect: "Non, LAN signifie Local Area Network. Il couvre une petite zone comme un bâtiment."
    }
  },
  {
    lessonSlug: 'intro-reseaux',
    type: 'MCQ',
    order_index: 2,
    xp_value: 10,
    question_data: {
      question: "Quel équipement relie un réseau local à Internet ?",
      options: [
        { id: 'a', text: 'Un switch (commutateur)' },
        { id: 'b', text: 'Un hub (concentrateur)' },
        { id: 'c', text: 'Un routeur' },
        { id: 'd', text: 'Un câble Ethernet' }
      ]
    },
    answer_data: { correctOptionId: 'c' },
    feedback_data: {
      correct: "Bravo ! Le routeur connecte différents réseaux entre eux, par exemple votre réseau local à Internet.",
      incorrect: "Pas tout à fait. C'est le routeur qui permet d'acheminer le trafic entre des réseaux différents (comme votre LAN et Internet)."
    }
  },
  {
    lessonSlug: 'modele-osi',
    type: 'MCQ',
    order_index: 1,
    xp_value: 15,
    question_data: {
      question: "Combien de couches compte le modèle OSI ?",
      options: [
        { id: 'a', text: '4' },
        { id: 'b', text: '5' },
        { id: 'c', text: '7' },
        { id: 'd', text: '9' }
      ]
    },
    answer_data: { correctOptionId: 'c' },
    feedback_data: {
      correct: "Parfait ! Le modèle OSI compte 7 couches : Physique, Liaison, Réseau, Transport, Session, Présentation, Application.",
      incorrect: "Le modèle OSI possède 7 couches. Le modèle TCP/IP en possède 4."
    }
  },
  {
    lessonSlug: 'modele-osi',
    type: 'MCQ',
    order_index: 2,
    xp_value: 15,
    question_data: {
      question: "À quelle couche du modèle OSI correspond l'adresse IP ?",
      options: [
        { id: 'a', text: 'Couche 2 (Liaison de données)' },
        { id: 'b', text: 'Couche 3 (Réseau)' },
        { id: 'c', text: 'Couche 4 (Transport)' },
        { id: 'd', text: 'Couche 7 (Application)' }
      ]
    },
    answer_data: { correctOptionId: 'b' },
    feedback_data: {
      correct: "Exact ! L'adressage IP se fait au niveau de la couche 3 (Réseau).",
      incorrect: "L'adresse IP est gérée par la couche 3 (Réseau). L'adresse MAC est gérée par la couche 2."
    }
  },

  // Level 3: Subnetting - Calcul sous-réseaux
  {
    lessonSlug: 'calcul-sous-reseaux',
    type: 'SUBNET_CALC',
    order_index: 1,
    xp_value: 20,
    question_data: {
      question: "Pour l'adresse réseau 192.168.1.0/26, quelle est l'adresse de broadcast ?",
      networkAddress: "192.168.1.0",
      cidr: 26
    },
    answer_data: {
      broadcastAddress: "192.168.1.63",
      firstHost: "192.168.1.1",
      lastHost: "192.168.1.62"
    },
    feedback_data: {
      correct: "Super ! Avec un /26, on a 64 IP par sous-réseau (2^6). Le premier sous-réseau va de 0 à 63, l'adresse de broadcast est donc 192.168.1.63.",
      incorrect: "Un /26 laisse 6 bits pour les hôtes (2^6 = 64 adresses). La plage de .0 va donc jusqu'à .63."
    }
  },
  {
    lessonSlug: 'calcul-sous-reseaux',
    type: 'MCQ',
    order_index: 2,
    xp_value: 20,
    question_data: {
      question: "Combien d'hôtes utilisables permet un masque /24 ?",
      options: [
        { id: 'a', text: '256' },
        { id: 'b', text: '254' },
        { id: 'c', text: '128' },
        { id: 'd', text: '512' }
      ]
    },
    answer_data: { correctOptionId: 'b' },
    feedback_data: {
      correct: "Exact. 2^8 = 256 adresses au total, moins l'adresse réseau et l'adresse de broadcast = 254 hôtes.",
      incorrect: "Il faut soustraire 2 (adresse réseau et broadcast) au nombre total d'adresses (256)."
    }
  },
  {
    lessonSlug: 'vlsm-concept',
    type: 'SUBNET_CALC',
    order_index: 1,
    xp_value: 25,
    question_data: {
      question: "Vous avez besoin d'un sous-réseau pour 30 machines. Quel est le masque (CIDR) optimal ?",
      hostsRequired: 30
    },
    answer_data: {
      cidr: 27,
      subnetMask: "255.255.255.224"
    },
    feedback_data: {
      correct: "Bravo ! 30 hôtes nécessitent 32 adresses au total (avec réseau et broadcast), donc 5 bits d'hôte (2^5=32). 32 - 5 = 27 (soit un /27).",
      incorrect: "Pour 30 hôtes, il faut 32 adresses (30 + 2 pour le réseau et le broadcast). 2^5 = 32, donc on a besoin de 5 bits pour les hôtes. 32-5 = /27."
    }
  }
];
