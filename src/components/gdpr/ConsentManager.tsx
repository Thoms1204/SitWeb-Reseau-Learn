"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"

export function ConsentManager() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gérer mes cookies</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h4 className="font-semibold">Essentiels</h4>
            <p className="text-sm text-muted-foreground">Requis pour le fonctionnement du site</p>
          </div>
          <input type="checkbox" checked disabled className="h-5 w-5" />
        </div>
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h4 className="font-semibold">Analytiques</h4>
            <p className="text-sm text-muted-foreground">Pour améliorer notre service</p>
          </div>
          <input type="checkbox" className="h-5 w-5" />
        </div>
      </div>
      <div className="flex gap-4">
        <Button>Sauvegarder</Button>
        <Button variant="destructive">Révoquer tout</Button>
      </div>
    </div>
  )
}
