import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
};

export default function PrivacyPolicyPage() {
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
        <Shield className="h-8 w-8 text-primary-500" />
        <h1 className="text-3xl font-bold">Politique de confidentialité</h1>
      </div>

      <p className="mb-6 text-sm text-[var(--muted-foreground)]">
        Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
      </p>

      <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-semibold">1. Responsable du traitement</h2>
          <p>
            Le responsable du traitement des données personnelles collectées via
            la plateforme NetLearn est :
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Raison sociale :</strong> [À compléter]</li>
            <li><strong>Adresse :</strong> [À compléter]</li>
            <li><strong>Email DPO :</strong> dpo@netlearn.fr</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">2. Données collectées</h2>
          <p>
            Conformément au principe de minimisation (article 5 du RGPD), nous ne
            collectons que les données strictement nécessaires au fonctionnement
            du service :
          </p>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="py-2 text-left font-medium">Donnée</th>
                <th className="py-2 text-left font-medium">Finalité</th>
                <th className="py-2 text-left font-medium">Base légale</th>
                <th className="py-2 text-left font-medium">Durée</th>
              </tr>
            </thead>
            <tbody className="text-[var(--muted-foreground)]">
              <tr className="border-b border-[var(--border)]">
                <td className="py-2">Email</td>
                <td className="py-2">Authentification, communication</td>
                <td className="py-2">Exécution du contrat</td>
                <td className="py-2">Durée du compte + 30 jours</td>
              </tr>
              <tr className="border-b border-[var(--border)]">
                <td className="py-2">Pseudo</td>
                <td className="py-2">Identification dans l&apos;application</td>
                <td className="py-2">Exécution du contrat</td>
                <td className="py-2">Durée du compte + 30 jours</td>
              </tr>
              <tr className="border-b border-[var(--border)]">
                <td className="py-2">Hash du mot de passe</td>
                <td className="py-2">Authentification sécurisée</td>
                <td className="py-2">Exécution du contrat</td>
                <td className="py-2">Durée du compte + 30 jours</td>
              </tr>
              <tr className="border-b border-[var(--border)]">
                <td className="py-2">Progression (XP, scores, tentatives)</td>
                <td className="py-2">Fonctionnement de la gamification et révision espacée</td>
                <td className="py-2">Intérêt légitime</td>
                <td className="py-2">Durée du compte</td>
              </tr>
              <tr className="border-b border-[var(--border)]">
                <td className="py-2">Registre des consentements</td>
                <td className="py-2">Preuve de conformité RGPD</td>
                <td className="py-2">Obligation légale</td>
                <td className="py-2">3 ans après retrait</td>
              </tr>
              <tr className="border-b border-[var(--border)]">
                <td className="py-2">Adresse IP (consentements)</td>
                <td className="py-2">Preuve de consentement</td>
                <td className="py-2">Obligation légale</td>
                <td className="py-2">3 ans</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section>
          <h2 className="text-xl font-semibold">3. Cookies</h2>
          <p>NetLearn utilise les catégories de cookies suivantes :</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Essentiels</strong> (toujours actifs) : session
              d&apos;authentification, préférences de thème, registre de
              consentement.
            </li>
            <li>
              <strong>Analytics</strong> (opt-in) : mesure d&apos;audience
              anonymisée pour améliorer le service.
            </li>
            <li>
              <strong>Marketing</strong> (opt-in) : aucun cookie marketing
              n&apos;est actuellement utilisé.
            </li>
          </ul>
          <p>
            Vous pouvez modifier vos préférences à tout moment depuis le lien
            « Gérer mes cookies » en bas de page ou dans les paramètres de votre
            compte.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">4. Vos droits</h2>
          <p>
            Conformément aux articles 15 à 22 du RGPD, vous disposez des droits
            suivants :
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Droit d&apos;accès</strong> : obtenir une copie de vos données</li>
            <li><strong>Droit de rectification</strong> : modifier vos informations</li>
            <li><strong>Droit à l&apos;effacement</strong> : supprimer votre compte et vos données</li>
            <li><strong>Droit à la portabilité</strong> : exporter vos données au format JSON</li>
            <li><strong>Droit d&apos;opposition</strong> : vous opposer au traitement de vos données</li>
            <li><strong>Droit de retrait du consentement</strong> : retirer votre consentement aux cookies non essentiels</li>
          </ul>
          <p>
            Pour exercer ces droits, rendez-vous dans{" "}
            <Link href="/settings" className="text-primary-500 hover:underline">
              Paramètres → Vie privée
            </Link>{" "}
            ou contactez-nous à dpo@netlearn.fr.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">5. Suppression du compte</h2>
          <p>
            La suppression de votre compte suit un processus en deux étapes :
          </p>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Confirmation par email (lien valide 24h)</li>
            <li>Saisie du mot de passe</li>
          </ol>
          <p>
            Après confirmation, votre compte est désactivé immédiatement (soft
            delete). Vous disposez de 14 jours pour annuler. La purge définitive
            intervient après 30 jours. Les registres de consentement RGPD sont
            conservés 3 ans conformément à nos obligations légales.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">6. Hébergement</h2>
          <p>
            Vos données sont hébergées exclusivement dans l&apos;Union Européenne :
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Base de données : Neon PostgreSQL — Francfort, Allemagne (EU)</li>
            <li>Application : Vercel — Paris, France (EU, région cdg1)</li>
          </ul>
          <p>Aucun transfert de données hors de l&apos;Espace Économique Européen.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">7. Contact</h2>
          <p>
            Pour toute question relative à cette politique ou à vos données
            personnelles, contactez notre DPO :
          </p>
          <p className="font-medium">dpo@netlearn.fr</p>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            Vous pouvez également introduire une réclamation auprès de la CNIL
            (Commission Nationale de l&apos;Informatique et des Libertés) :
            www.cnil.fr
          </p>
        </section>
      </div>
    </div>
  );
}
