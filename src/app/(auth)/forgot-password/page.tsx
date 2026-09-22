import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import Link from "next/link";
import { Network } from "lucide-react";

export const metadata: Metadata = {
  title: "Mot de passe oublié",
};

export default function ForgotPasswordPage() {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-sm">
      <div className="mb-8 text-center">
        <Link href="/" className="mb-4 inline-flex items-center gap-2">
          <Network className="h-8 w-8 text-primary-500" />
          <span className="text-2xl font-bold">NetLearn</span>
        </Link>
        <h1 className="mt-4 text-xl font-semibold">Mot de passe oublié ?</h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Entre ton adresse email et nous t&apos;enverrons un lien de
          réinitialisation
        </p>
      </div>

      <ForgotPasswordForm />

      <div className="mt-6 text-center text-sm text-[var(--muted-foreground)]">
        <Link
          href="/login"
          className="font-medium text-primary-500 hover:underline"
        >
          Retour à la connexion
        </Link>
      </div>
    </div>
  );
}
