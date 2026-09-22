"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"

export function DeleteAccountFlow() {
  return (
    <div className="p-6 border border-destructive/50 bg-destructive/10 rounded-lg space-y-4">
      <h3 className="text-lg font-bold text-destructive">Supprimer mon compte</h3>
      <p className="text-sm">Cette action est irréversible après 14 jours.</p>
      <Button variant="destructive">Commencer la suppression</Button>
    </div>
  )
}
