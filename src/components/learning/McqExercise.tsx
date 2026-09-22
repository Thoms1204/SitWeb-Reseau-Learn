"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"

export function McqExercise() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Quelle est la couche 3 du modèle OSI ?</h3>
      <div className="space-y-2">
        {['Réseau', 'Liaison', 'Transport', 'Application'].map((opt) => (
          <label key={opt} className="flex items-center gap-3 p-4 border rounded-lg hover:bg-accent cursor-pointer">
            <input type="radio" name="mcq" />
            <span>{opt}</span>
          </label>
        ))}
      </div>
      <Button className="w-full">Vérifier</Button>
    </div>
  )
}
