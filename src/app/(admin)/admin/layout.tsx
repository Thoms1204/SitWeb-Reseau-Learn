import type { Metadata } from "next";
import Link from "next/link";
import { Shield, BookOpen, FileQuestion, BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "Administration",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Admin sidebar */}
      <aside className="w-64 border-r border-[var(--border)] bg-[var(--sidebar)] p-4">
        <div className="mb-6 flex items-center gap-2 px-2">
          <Shield className="h-6 w-6 text-primary-500" />
          <span className="text-lg font-bold">Admin</span>
        </div>

        <nav className="space-y-1">
          <AdminNavLink href="/admin" icon={<BarChart3 className="h-4 w-4" />}>
            Tableau de bord
          </AdminNavLink>
          <AdminNavLink
            href="/admin/levels"
            icon={<BookOpen className="h-4 w-4" />}
          >
            Niveaux & Leçons
          </AdminNavLink>
          <AdminNavLink
            href="/admin/exercises"
            icon={<FileQuestion className="h-4 w-4" />}
          >
            Exercices
          </AdminNavLink>
        </nav>

        <div className="mt-auto pt-8">
          <Link
            href="/dashboard"
            className="block rounded-lg px-3 py-2 text-sm text-[var(--muted-foreground)] transition-colors hover:bg-[var(--muted)]"
          >
            ← Retour à l&apos;application
          </Link>
        </div>
      </aside>

      {/* Admin content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}

function AdminNavLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-[var(--muted)]"
    >
      {icon}
      {children}
    </Link>
  );
}
