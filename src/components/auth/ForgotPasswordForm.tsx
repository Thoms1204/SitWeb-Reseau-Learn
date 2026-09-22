"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ForgotPasswordForm() {
  return (
    <form className="space-y-4 w-full max-w-sm mx-auto">
      <Input label="Email" type="email" required />
      <Button type="submit" className="w-full">Envoyer le lien de réinitialisation</Button>
    </form>
  )
}
