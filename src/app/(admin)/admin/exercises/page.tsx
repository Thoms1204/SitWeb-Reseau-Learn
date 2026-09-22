"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";

interface Exercise {
  id: number;
  type: string;
  lessonTitle: string;
  levelTitle: string;
  questionPreview: string;
  createdAt: string;
}

export default function AdminExercisesPage() {
  const [exercises] = useState<Exercise[]>([]);
  const [search, setSearch] = useState("");

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gestion des exercices</h1>
        <button className="inline-flex items-center gap-2 rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-600">
          <Plus className="h-4 w-4" />
          Nouvel exercice
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
        <input
          type="text"
          placeholder="Rechercher un exercice..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-[var(--border)]">
        <table className="w-full text-sm">
          <thead className="bg-[var(--muted)]">
            <tr>
              <th className="px-4 py-3 text-left font-medium">ID</th>
              <th className="px-4 py-3 text-left font-medium">Type</th>
              <th className="px-4 py-3 text-left font-medium">Niveau / Leçon</th>
              <th className="px-4 py-3 text-left font-medium">Question</th>
              <th className="px-4 py-3 text-left font-medium">Créé le</th>
              <th className="px-4 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {exercises.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-[var(--muted-foreground)]"
                >
                  Aucun exercice trouvé. Lancez le seed de la base de données
                  pour commencer.
                </td>
              </tr>
            ) : (
              exercises
                .filter((e) =>
                  e.questionPreview
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((exercise) => (
                  <tr
                    key={exercise.id}
                    className="border-t border-[var(--border)] transition-colors hover:bg-[var(--muted)]"
                  >
                    <td className="px-4 py-3 font-mono text-xs">
                      {exercise.id}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
                        {exercise.type}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div>{exercise.levelTitle}</div>
                      <div className="text-xs text-[var(--muted-foreground)]">
                        {exercise.lessonTitle}
                      </div>
                    </td>
                    <td className="max-w-xs truncate px-4 py-3">
                      {exercise.questionPreview}
                    </td>
                    <td className="px-4 py-3 text-[var(--muted-foreground)]">
                      {new Date(exercise.createdAt).toLocaleDateString("fr-FR")}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          className="rounded p-1 text-[var(--muted-foreground)] transition-colors hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
                          aria-label="Modifier"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          className="rounded p-1 text-[var(--muted-foreground)] transition-colors hover:bg-danger-50 hover:text-danger-500"
                          aria-label="Supprimer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
