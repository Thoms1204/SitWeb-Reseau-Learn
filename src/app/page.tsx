import Link from "next/link";
import {
  Network,
  GraduationCap,
  Trophy,
  Shield,
  ArrowRight,
  Flame,
  Star,
  CheckCircle2,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="border-b border-[var(--border)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <Network className="h-8 w-8 text-primary-500" />
            <span className="text-xl font-bold">NetLearn</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link
              href="/login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
            >
              Se connecter
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600"
            >
              Commencer gratuitement
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main id="main-content">
        <section className="mx-auto max-w-6xl px-4 py-20 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
            <Star className="h-4 w-4" />
            100% gratuit — Aucune carte bancaire requise
          </div>

          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Maîtrise les{" "}
            <span className="bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
              réseaux informatiques
            </span>
            <br />
            en t&apos;amusant
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-[var(--muted-foreground)]">
            Apprends le modèle OSI, le subnetting, les protocoles de routage et
            bien plus avec des exercices interactifs, un système de progression
            gamifié et des révisions intelligentes.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-primary-600 hover:shadow-xl"
            >
              Commencer maintenant
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-8 py-4 text-lg font-semibold transition-colors hover:bg-[var(--muted)]"
            >
              En savoir plus
            </Link>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-t border-[var(--border)] bg-[var(--muted)] py-20">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">
              Tout ce dont tu as besoin pour réussir
            </h2>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={<GraduationCap className="h-8 w-8 text-primary-500" />}
                title="6 niveaux progressifs"
                description="Du modèle OSI à la sécurité réseau, progresse à ton rythme avec des exercices adaptés."
              />
              <FeatureCard
                icon={<Trophy className="h-8 w-8 text-[var(--color-xp)]" />}
                title="Gamification complète"
                description="Gagne de l'XP, maintiens tes streaks, débloque des badges et monte en niveau."
              />
              <FeatureCard
                icon={<Flame className="h-8 w-8 text-[var(--color-streak)]" />}
                title="Révision espacée"
                description="Un algorithme intelligent cible tes points faibles pour une mémorisation durable."
              />
              <FeatureCard
                icon={<Shield className="h-8 w-8 text-success-500" />}
                title="Respect de ta vie privée"
                description="Conforme RGPD, données hébergées en UE, contrôle total sur tes informations."
              />
            </div>
          </div>
        </section>

        {/* Levels Preview */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">
              Un parcours structuré en 6 niveaux
            </h2>

            <div className="space-y-4">
              <LevelPreview
                number={1}
                title="Fondamentaux réseaux"
                description="Modèle OSI, TCP vs UDP, topologies réseau"
                color="bg-success-500"
              />
              <LevelPreview
                number={2}
                title="Adressage IPv4"
                description="Classes d'adresses, masques, conversion binaire"
                color="bg-primary-500"
              />
              <LevelPreview
                number={3}
                title="Sous-réseaux & VLSM"
                description="Subnetting, VLSM, supernetting"
                color="bg-warning-500"
              />
              <div className="flex gap-4 pl-8">
                <LevelPreview
                  number={4}
                  title="Protocoles de routage"
                  description="RIP, OSPF, BGP, tables de routage"
                  color="bg-[var(--color-streak)]"
                  className="flex-1"
                />
                <LevelPreview
                  number={5}
                  title="Services réseau"
                  description="DNS, DHCP, NAT, pare-feu"
                  color="bg-[var(--color-streak)]"
                  className="flex-1"
                />
              </div>
              <LevelPreview
                number={6}
                title="Sécurité & Dépannage"
                description="ACL, VPN, diagnostic réseau"
                color="bg-danger-500"
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-[var(--border)] bg-primary-500 py-16 text-white">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Prêt à maîtriser les réseaux ?
            </h2>
            <p className="mb-8 text-lg text-primary-100">
              Rejoins NetLearn gratuitement et commence ton apprentissage dès
              maintenant.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-primary-600 shadow-lg transition-all hover:bg-primary-50 hover:shadow-xl"
            >
              Créer mon compte gratuit
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-[var(--muted-foreground)] sm:flex-row">
          <div className="flex items-center gap-2">
            <Network className="h-5 w-5" />
            <span>© {new Date().getFullYear()} NetLearn. Tous droits réservés.</span>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:underline">
              Politique de confidentialité
            </Link>
            <Link href="/terms" className="hover:underline">
              CGU
            </Link>
            <Link href="/legal-notices" className="hover:underline">
              Mentions légales
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 transition-shadow hover:shadow-lg">
      <div className="mb-4">{icon}</div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-sm text-[var(--muted-foreground)]">{description}</p>
    </div>
  );
}

function LevelPreview({
  number,
  title,
  description,
  color,
  className = "",
}: {
  number: number;
  title: string;
  description: string;
  color: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 transition-shadow hover:shadow-md ${className}`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${color}`}
      >
        {number}
      </div>
      <div className="min-w-0">
        <h3 className="font-semibold">{title}</h3>
        <p className="truncate text-sm text-[var(--muted-foreground)]">
          {description}
        </p>
      </div>
      <CheckCircle2 className="ml-auto h-5 w-5 shrink-0 text-[var(--muted-foreground)]" />
    </div>
  );
}
