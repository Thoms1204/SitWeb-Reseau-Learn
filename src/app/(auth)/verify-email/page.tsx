"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Network, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    fetch("/api/auth/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((res) => {
        setStatus(res.ok ? "success" : "error");
      })
      .catch(() => {
        setStatus("error");
      });
  }, [token]);

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-sm">
      <div className="mb-8 text-center">
        <Link href="/" className="mb-4 inline-flex items-center gap-2">
          <Network className="h-8 w-8 text-primary-500" />
          <span className="text-2xl font-bold">NetLearn</span>
        </Link>
      </div>

      {status === "loading" && (
        <div className="flex flex-col items-center gap-4 py-8">
          <Loader2 className="h-12 w-12 animate-spin text-primary-500" />
          <p className="text-[var(--muted-foreground)]">
            Vérification en cours...
          </p>
        </div>
      )}

      {status === "success" && (
        <div className="flex flex-col items-center gap-4 py-8">
          <CheckCircle2 className="h-12 w-12 text-success-500" />
          <h1 className="text-xl font-semibold">Email vérifié !</h1>
          <p className="text-center text-sm text-[var(--muted-foreground)]">
            Ton adresse email a été vérifiée avec succès. Tu peux maintenant te
            connecter.
          </p>
          <Link
            href="/login"
            className="mt-4 rounded-lg bg-primary-500 px-6 py-2.5 font-medium text-white transition-colors hover:bg-primary-600"
          >
            Se connecter
          </Link>
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col items-center gap-4 py-8">
          <XCircle className="h-12 w-12 text-danger-500" />
          <h1 className="text-xl font-semibold">Lien invalide</h1>
          <p className="text-center text-sm text-[var(--muted-foreground)]">
            Ce lien de vérification est invalide ou a expiré. Essaie de te
            reconnecter pour recevoir un nouveau lien.
          </p>
          <Link
            href="/login"
            className="mt-4 rounded-lg bg-primary-500 px-6 py-2.5 font-medium text-white transition-colors hover:bg-primary-600"
          >
            Retour à la connexion
          </Link>
        </div>
      )}
    </div>
  );
}
