import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";
import { Network } from "lucide-react";

export const metadata: Metadata = {
  title: "Se connecter",
};

export default function LoginPage() {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-sm">
      <div className="mb-8 text-center">
        <Link href="/" className="mb-4 inline-flex items-center gap-2">
          <Network className="h-8 w-8 text-primary-500" />
          <span className="text-2xl font-bold">NetLearn</span>
        </Link>
        <h1 className="mt-4 text-xl font-semibold">Bon retour parmi nous !</h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Connecte-toi pour continuer ton apprentissage
        </p>
      </div>

      <LoginForm />

      <div className="mt-6 text-center text-sm text-[var(--muted-foreground)]">
        Pas encore de compte ?{" "}
        <Link
          href="/register"
          className="font-medium text-primary-500 hover:underline"
        >
          Créer un compte
        </Link>
      </div>
    </div>
  );
}
