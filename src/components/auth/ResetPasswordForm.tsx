"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ResetPasswordForm() {
  return (
    <form className="space-y-4 w-full max-w-sm mx-auto">
      <Input label="Nouveau mot de passe" type="password" required />
      <Input label="Confirmer le mot de passe" type="password" required />
      <Button type="submit" className="w-full">Réinitialiser</Button>
    </form>
  )
}
