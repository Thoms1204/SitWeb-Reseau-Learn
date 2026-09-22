import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { ServiceWorkerRegister } from "@/components/providers/ServiceWorkerRegister";

export const metadata: Metadata = {
  title: {
    default: "NetLearn - Apprendre les réseaux en s'amusant",
    template: "%s | NetLearn",
  },
  description:
    "Application web d'apprentissage des réseaux informatiques, inspirée de Duolingo.",
  manifest: "/manifest.json",
  themeColor: "#0ea5e9",
  keywords: [
    "réseaux informatiques",
    "apprentissage",
    "subnetting",
    "VLSM",
    "OSI",
    "TCP/IP",
    "CCNA",
  ],
  authors: [{ name: "NetLearn" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "NetLearn",
    title: "NetLearn — Apprends les réseaux informatiques",
    description:
      "Plateforme d'apprentissage gamifiée des réseaux informatiques.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <QueryProvider>
            <ServiceWorkerRegister />
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary-500 focus:px-4 focus:py-2 focus:text-white"
            >
              Aller au contenu principal
            </a>
            {children}
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
