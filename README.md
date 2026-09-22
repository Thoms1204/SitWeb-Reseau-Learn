# NetLearn 🚀

Une application web d'apprentissage et de révision des réseaux informatiques, inspirée du modèle de progression de Duolingo.

## 🎯 Fonctionnalités du MVP

- **Parcours structuré en 6 niveaux** : Des fondamentaux jusqu'à la sécurité et au dépannage.
- **Exercices interactifs** : QCM et calculateurs de sous-réseaux (Subnetting) avec correction automatique.
- **Gamification complète** : Système d'expérience (XP), maintien de séquences d'apprentissage (Streaks) et badges.
- **Révision espacée** : Algorithme SM-2 intégré pour une mémorisation sur le long terme.
- **Conformité RGPD** : Gestion granulaire des consentements (cookies), export des données (JSON) et suppression de compte (Soft delete 30 jours).
- **Interface moderne et accessible** : Design responsive Mobile-first, Dark/Light mode, respectant les normes WCAG AA.

## 🛠️ Stack Technique

- **Framework** : Next.js 15 (App Router, Server Actions, Route Handlers)
- **Langage** : TypeScript
- **Base de données** : PostgreSQL (Neon) avec Prisma ORM (v7)
- **Authentification** : JWT (jose) et Argon2id (@node-rs/argon2), entièrement customisée pour le contrôle des données.
- **Styling** : Tailwind CSS v4, composants Radix UI
- **Tests** : Vitest (unitaires)

## 🚀 Guide d'installation et de lancement

> **Prérequis :** L'installation de **Node.js** (version 20 ou supérieure) est requise pour lancer ce projet.

### 1. Cloner ou ouvrir le projet
Ouvrez le dossier du projet dans votre terminal ou éditeur de code.

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configurer l'environnement
Copiez le fichier d'exemple et renseignez vos clés :
```bash
cp .env.example .env
```
Assurez-vous de remplir :
- `DATABASE_URL` (URL avec PgBouncer)
- `DIRECT_URL` (URL directe sans pooler)
- `JWT_ACCESS_SECRET` et `JWT_REFRESH_SECRET`

### 4. Initialiser la base de données
Cette commande va pousser le schéma Prisma et exécuter le script de seed (qui contient les 6 niveaux, les leçons et les exercices) :
```bash
npx prisma db push
npx prisma db seed
```

### 5. Lancer le serveur de développement
```bash
npm run dev
```
L'application sera accessible sur [http://localhost:3000](http://localhost:3000).

## 🧪 Tests

Pour lancer la suite de tests unitaires (moteurs de gamification, algorithme SM-2, validateurs d'exercices) :
```bash
npm run test
```

## 🔒 RGPD & Vie privée
NetLearn a été pensé "Privacy by Design" :
- L'utilisateur garde le contrôle de ses données.
- Export des données disponible en un clic.
- Cookies de traçage désactivés par défaut.
