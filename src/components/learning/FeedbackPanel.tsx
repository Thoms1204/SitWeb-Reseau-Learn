"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"

export function FeedbackPanel({ correct = true }: { correct?: boolean }) {
  return (
    <div className={\`p-6 rounded-lg border \${correct ? 'bg-green-500/10 border-green-500/50' : 'bg-red-500/10 border-red-500/50'}\`}>
      <h3 className={\`text-xl font-bold \${correct ? 'text-green-600' : 'text-red-600'}\`}>
        {correct ? "Correct ! 🎉" : "Pas tout à fait... 🤔"}
      </h3>
      <p className="mt-2 text-muted-foreground">L'adresse réseau est obtenue par un ET logique...</p>
      <Button className="mt-4 w-full" variant={correct ? "default" : "destructive"}>Continuer</Button>
    </div>
  )
}
