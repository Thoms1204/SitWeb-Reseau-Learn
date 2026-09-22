import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation",
};

export default function TermsPage() {
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
        <FileText className="h-8 w-8 text-primary-500" />
        <h1 className="text-3xl font-bold">
          Conditions générales d&apos;utilisation
        </h1>
      </div>

      <p className="mb-6 text-sm text-[var(--muted-foreground)]">
        Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
      </p>

      <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-semibold">1. Objet</h2>
          <p>
            Les présentes conditions générales d&apos;utilisation (CGU) régissent
            l&apos;utilisation de la plateforme NetLearn, un service en ligne
            d&apos;apprentissage des réseaux informatiques. En créant un compte, vous
            acceptez ces conditions dans leur intégralité.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">2. Accès au service</h2>
          <p>
            NetLearn est accessible gratuitement à toute personne disposant d&apos;une
            adresse email valide. L&apos;accès complet au service nécessite la
            vérification de l&apos;adresse email.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">3. Compte utilisateur</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Vous êtes responsable de la confidentialité de votre mot de passe.
            </li>
            <li>
              Un seul compte par personne est autorisé.
            </li>
            <li>
              Les informations fournies doivent être exactes et à jour.
            </li>
            <li>
              Tout usage abusif ou automatisé du service est interdit.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">4. Contenu pédagogique</h2>
          <p>
            Le contenu proposé sur NetLearn (cours, exercices, corrections) est
            fourni à titre éducatif. Il ne constitue pas une certification
            professionnelle. NetLearn s&apos;efforce de fournir des informations
            exactes mais ne garantit pas l&apos;absence d&apos;erreurs.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">5. Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble du contenu de NetLearn (textes, exercices, graphismes, code
            source) est protégé par le droit d&apos;auteur. Toute reproduction ou
            distribution non autorisée est interdite.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">6. Protection des données</h2>
          <p>
            Le traitement de vos données personnelles est décrit dans notre{" "}
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
          <h2 className="text-xl font-semibold">7. Modification des CGU</h2>
          <p>
            Nous nous réservons le droit de modifier ces CGU. Les utilisateurs
            seront informés par email de toute modification substantielle. La
            poursuite de l&apos;utilisation du service après modification vaut
            acceptation.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">8. Droit applicable</h2>
          <p>
            Les présentes CGU sont soumises au droit français. Tout litige sera
            porté devant les tribunaux compétents français.
          </p>
        </section>
      </div>
    </div>
  );
}
