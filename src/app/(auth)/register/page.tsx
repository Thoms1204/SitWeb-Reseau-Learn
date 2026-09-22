import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/RegisterForm";
import Link from "next/link";
import { Network } from "lucide-react";

export const metadata: Metadata = {
  title: "Créer un compte",
};

export default function RegisterPage() {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-sm">
      <div className="mb-8 text-center">
        <Link href="/" className="mb-4 inline-flex items-center gap-2">
          <Network className="h-8 w-8 text-primary-500" />
          <span className="text-2xl font-bold">NetLearn</span>
        </Link>
        <h1 className="mt-4 text-xl font-semibold">Crée ton compte</h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Rejoins NetLearn et commence ton apprentissage gratuitement
        </p>
      </div>

      <RegisterForm />

      <div className="mt-6 text-center text-sm text-[var(--muted-foreground)]">
        Déjà un compte ?{" "}
        <Link
          href="/login"
          className="font-medium text-primary-500 hover:underline"
        >
          Se connecter
        </Link>
      </div>
    </div>
  );
}
