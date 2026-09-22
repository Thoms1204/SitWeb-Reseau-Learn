"use client"
import * as React from "react"
import { Progress } from "@/components/ui/progress"

export function ProgressBar({ value = 30, text = "3/10" }: { value?: number, text?: string }) {
  return (
    <div className="w-full flex items-center gap-4">
      <Progress value={value} className="flex-1" />
      <span className="text-sm font-medium text-muted-foreground">{text}</span>
    </div>
  )
}
