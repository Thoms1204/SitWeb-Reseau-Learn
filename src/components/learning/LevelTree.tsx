"use client"
import * as React from "react"

export function LevelTree() {
  return (
    <div className="flex flex-col items-center gap-8 py-8">
      {/* Visual placeholder for tree */}
      <div className="p-4 bg-primary text-primary-foreground rounded-full">Niveau 1</div>
      <div className="w-1 h-8 bg-border" />
      <div className="p-4 bg-secondary text-secondary-foreground rounded-full">Niveau 2 (Bloqué)</div>
    </div>
  )
}
