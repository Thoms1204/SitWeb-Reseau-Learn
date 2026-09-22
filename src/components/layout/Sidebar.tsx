"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Lock } from "lucide-react"

export function Sidebar() {
  return (
    <aside className="w-64 border-r h-[calc(100vh-3.5rem)] hidden md:block p-4 overflow-y-auto">
      <h2 className="font-semibold text-lg mb-4">Parcours</h2>
      <ul className="space-y-2">
        <li className="p-3 bg-primary/10 rounded-lg border border-primary/20 flex items-center justify-between">
          <span className="font-medium text-primary">Niveau 1: Bases</span>
          <div className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">100%</div>
        </li>
        <li className="p-3 bg-secondary/20 rounded-lg flex items-center justify-between">
          <span className="font-medium text-muted-foreground">Niveau 2: Adressage</span>
          <Lock className="h-4 w-4 text-muted-foreground" />
        </li>
      </ul>
    </aside>
  )
}
