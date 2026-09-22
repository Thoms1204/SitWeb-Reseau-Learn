"use client"
import * as React from "react"
import { Flame } from "lucide-react"

export function StreakCounter() {
  return (
    <div className="flex flex-col items-center p-4 bg-orange-500/10 rounded-xl border border-orange-500/20 text-orange-600 dark:text-orange-400">
      <Flame className="h-8 w-8 animate-pulse mb-1" />
      <span className="font-bold text-xl">7</span>
      <span className="text-sm">jours</span>
    </div>
  )
}
