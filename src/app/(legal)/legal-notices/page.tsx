import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Mentions légales",
};

export default function LegalNoticesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour à l&apos;accueil
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <Scale className="h-8 w-8 text-primary-500" />
        <h1 className="text-3xl font-bold">Mentions légales</h1>
      </div>

      <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-semibold">Éditeur du site</h2>
          <ul className="list-none space-y-1 pl-0">
            <li><strong>Raison sociale :</strong> [À compléter]</li>
            <li><strong>Forme juridique :</strong> [À compléter]</li>
            <li><strong>Siège social :</strong> [À compléter]</li>
            <li><strong>SIRET :</strong> [À compléter]</li>
            <li><strong>Directeur de la publication :</strong> [À compléter]</li>
            <li><strong>Email :</strong> contact@netlearn.fr</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Hébergement</h2>
          <ul className="list-none space-y-1 pl-0">
            <li>
              <strong>Application :</strong> Vercel Inc. — 340 S Lemon Ave #4133,
              Walnut, CA 91789, USA. Données hébergées en région EU (Paris, cdg1).
            </li>
            <li>
              <strong>Base de données :</strong> Neon Inc. — Données hébergées en
              EU (Francfort, Allemagne, région aws-eu-central-1).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            Délégué à la protection des données (DPO)
          </h2>
          <p>
            Conformément au Règlement Général sur la Protection des Données
            (RGPD), le DPO peut être contacté à l&apos;adresse suivante :
          </p>
          <p className="font-medium">dpo@netlearn.fr</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            Traitements de données personnelles
          </h2>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="py-2 text-left font-medium">Traitement</th>
                <th className="py-2 text-left font-medium">Base légale</th>
              </tr>
            </thead>
            <tbody className="text-[var(--muted-foreground)]">
              <tr className="border-b border-[var(--border)]">
                <td className="py-2">Création et gestion du compte</td>
                <td className="py-2">
                  Exécution du contrat (art. 6.1.b RGPD)
                </td>
              </tr>
              <tr className="border-b border-[var(--border)]">
                <td className="py-2">Suivi de progression et gamification</td>
                <td className="py-2">
                  Intérêt légitime (art. 6.1.f RGPD) — fonctionnement du service
                </td>
              </tr>
              <tr className="border-b border-[var(--border)]">
                <td className="py-2">Cookies analytics</td>
                <td className="py-2">Consentement (art. 6.1.a RGPD)</td>
              </tr>
              <tr className="border-b border-[var(--border)]">
                <td className="py-2">Conservation des preuves de consentement</td>
                <td className="py-2">
                  Obligation légale (art. 6.1.c RGPD)
                </td>
              </tr>
              <tr className="border-b border-[var(--border)]">
                <td className="py-2">Envoi d&apos;emails transactionnels</td>
                <td className="py-2">
                  Exécution du contrat (art. 6.1.b RGPD)
                </td>
              </tr>
            </tbody>
          </table>
          <p className="mt-2 text-sm">
            Pour plus de détails, consultez notre{" "}
            <Link
              href="/privacy-policy"
              className="text-primary-500 hover:underline"
            >
              Politique de confidentialité
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Réclamation</h2>
          <p>
            En cas de différend non résolu, vous pouvez saisir la CNIL
            (Commission Nationale de l&apos;Informatique et des Libertés) :{" "}
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 hover:underline"
            >
              www.cnil.fr
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
