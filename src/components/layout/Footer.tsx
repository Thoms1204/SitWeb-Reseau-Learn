import * as React from "react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t py-6 bg-background text-muted-foreground">
      <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm">© {new Date().getFullYear()} NetLearn. Tous droits réservés.</p>
        <div className="flex gap-4 text-sm">
          <Link href="/confidentialite" className="hover:underline">Politique de confidentialité</Link>
          <Link href="/cgu" className="hover:underline">CGU</Link>
          <Link href="/mentions-legales" className="hover:underline">Mentions légales</Link>
          <button className="hover:underline">Gérer mes cookies</button>
        </div>
      </div>
    </footer>
  )
}
