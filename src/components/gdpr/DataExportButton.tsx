"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"

export function DataExportButton() {
  return (
    <div className="space-y-2">
      <Button variant="outline">Exporter mes données</Button>
      <p className="text-xs text-muted-foreground">Vos données seront disponibles au téléchargement pendant 7 jours.</p>
    </div>
  )
}
