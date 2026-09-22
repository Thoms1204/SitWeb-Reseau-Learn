"use client";

import { useState } from "react";
import { ConsentManager } from "@/components/gdpr/ConsentManager";
import { DataExportButton } from "@/components/gdpr/DataExportButton";
import { DeleteAccountFlow } from "@/components/gdpr/DeleteAccountFlow";
import { Settings, Shield, Download, Trash2, User } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-8 flex items-center gap-2 text-2xl font-bold">
        <Settings className="h-6 w-6" />
        Paramètres
      </h1>

      {/* Account section */}
      <section className="mb-8">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <User className="h-5 w-5 text-primary-500" />
          Compte
        </h2>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
          <p className="text-sm text-[var(--muted-foreground)]">
            Pour modifier ton pseudo, email ou mot de passe, utilise les
            options ci-dessous.
          </p>
          <div className="mt-4 space-y-3">
            <button className="w-full rounded-lg border border-[var(--border)] px-4 py-3 text-left text-sm transition-colors hover:bg-[var(--muted)]">
              Changer le mot de passe
            </button>
            <button className="w-full rounded-lg border border-[var(--border)] px-4 py-3 text-left text-sm transition-colors hover:bg-[var(--muted)]">
              Modifier le pseudo
            </button>
          </div>
        </div>
      </section>

      {/* Privacy section */}
      <section className="mb-8" id="privacy">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <Shield className="h-5 w-5 text-success-500" />
          Vie privée & RGPD
        </h2>

        {/* Consent management */}
        <div className="mb-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
          <h3 className="mb-3 font-medium">Gestion des cookies</h3>
          <ConsentManager />
        </div>

        {/* Data export */}
        <div className="mb-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
          <h3 className="mb-2 flex items-center gap-2 font-medium">
            <Download className="h-4 w-4" />
            Exporter mes données
          </h3>
          <p className="mb-4 text-sm text-[var(--muted-foreground)]">
            Télécharge une copie de toutes tes données personnelles au format
            JSON. Le fichier sera disponible pendant 7 jours.
          </p>
          <DataExportButton />
        </div>

        {/* Legal links */}
        <div className="mb-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
          <h3 className="mb-3 font-medium">Documents juridiques</h3>
          <div className="space-y-2">
            <Link
              href="/privacy-policy"
              className="block text-sm text-primary-500 hover:underline"
            >
              Politique de confidentialité
            </Link>
            <Link
              href="/terms"
              className="block text-sm text-primary-500 hover:underline"
            >
              Conditions générales d&apos;utilisation
            </Link>
            <Link
              href="/legal-notices"
              className="block text-sm text-primary-500 hover:underline"
            >
              Mentions légales
            </Link>
          </div>
        </div>
      </section>

      {/* Danger zone */}
      <section>
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-danger-500">
          <Trash2 className="h-5 w-5" />
          Zone de danger
        </h2>
        <div className="rounded-xl border border-danger-500/30 bg-danger-50/50 p-6 dark:bg-danger-500/5">
          <h3 className="mb-2 font-medium">Supprimer mon compte</h3>
          <p className="mb-4 text-sm text-[var(--muted-foreground)]">
            Cette action est irréversible après 30 jours. Toutes tes données
            seront définitivement supprimées. Tu disposeras de 14 jours pour
            annuler ta demande.
          </p>
          <DeleteAccountFlow />
        </div>
      </section>
    </div>
  );
}
