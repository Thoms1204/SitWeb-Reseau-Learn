"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export function RegisterForm() {
  return (
    <form className="space-y-4 w-full max-w-sm mx-auto">
      <Input label="Email" type="email" required />
      <Input label="Nom d'utilisateur" type="text" required />
      <Input label="Mot de passe" type="password" required />
      <Input label="Confirmer le mot de passe" type="password" required />
      
      <div className="flex items-center gap-2">
        <input type="checkbox" id="gdpr" required className="rounded border-gray-300" />
        <label htmlFor="gdpr" className="text-sm">J'accepte la politique de confidentialité</label>
      </div>

      <Button type="submit" className="w-full">Créer un compte</Button>
      <div className="text-center text-sm">
        Déjà un compte ? <Link href="/connexion" className="text-primary hover:underline">Se connecter</Link>
      </div>
    </form>
  )
}
