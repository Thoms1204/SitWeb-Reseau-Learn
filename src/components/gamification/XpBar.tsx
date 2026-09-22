"use client"
import * as React from "react"
import { Progress } from "@/components/ui/progress"

export function XpBar() {
  return (
    <div className="flex items-center gap-4 w-full">
      <div className="h-10 w-10 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold">4</div>
      <div className="flex-1">
        <div className="flex justify-between text-sm mb-1">
          <span className="font-semibold">Niveau 4</span>
          <span className="text-muted-foreground">1250/2000 XP</span>
        </div>
        <Progress value={62.5} indicatorClassName="bg-yellow-500" />
      </div>
    </div>
  )
}
