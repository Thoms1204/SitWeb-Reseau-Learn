"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"

export function SpacedReviewCard() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center text-muted-foreground mb-4">12 cartes restantes</div>
      <div className="p-8 border rounded-xl text-center space-y-8">
        <h3 className="text-2xl font-bold">Quelle est l'adresse de boucle locale IPv4 ?</h3>
        {/* Answer section */}
        <div className="pt-8 border-t flex justify-center gap-4">
          <Button variant="destructive">À revoir</Button>
          <Button variant="warning">Difficile</Button>
          <Button variant="secondary" className="bg-blue-500 text-white hover:bg-blue-600">Correct</Button>
          <Button variant="success">Facile</Button>
        </div>
      </div>
    </div>
  )
}
