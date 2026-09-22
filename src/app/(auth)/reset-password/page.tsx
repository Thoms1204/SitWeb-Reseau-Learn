import type { Metadata } from "next";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import Link from "next/link";
import { Network } from "lucide-react";

export const metadata: Metadata = {
  title: "Réinitialiser le mot de passe",
};

export default function ResetPasswordPage() {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-sm">
      <div className="mb-8 text-center">
        <Link href="/" className="mb-4 inline-flex items-center gap-2">
          <Network className="h-8 w-8 text-primary-500" />
          <span className="text-2xl font-bold">NetLearn</span>
        </Link>
        <h1 className="mt-4 text-xl font-semibold">
          Nouveau mot de passe
        </h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Choisis un mot de passe sécurisé pour ton compte
        </p>
      </div>

      <ResetPasswordForm />
    </div>
  );
}
