export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Tableau de bord administrateur</h1>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
          <h3 className="text-sm font-medium text-[var(--muted-foreground)]">
            Utilisateurs inscrits
          </h3>
          <p className="mt-2 text-3xl font-bold">—</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
          <h3 className="text-sm font-medium text-[var(--muted-foreground)]">
            Exercices créés
          </h3>
          <p className="mt-2 text-3xl font-bold">—</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
          <h3 className="text-sm font-medium text-[var(--muted-foreground)]">
            Tentatives aujourd&apos;hui
          </h3>
          <p className="mt-2 text-3xl font-bold">—</p>
        </div>
      </div>

      <p className="mt-8 text-sm text-[var(--muted-foreground)]">
        Les statistiques détaillées seront disponibles dans une prochaine
        itération.
      </p>
    </div>
  );
}
