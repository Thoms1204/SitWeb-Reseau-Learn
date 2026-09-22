"use client"
import * as React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Lock, Check } from "lucide-react"

export function LevelCard({ status = "locked", progress = 0 }: { status?: "locked" | "unlocked" | "in_progress" | "completed", progress?: number }) {
  return (
    <Card className="w-64 cursor-pointer hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Les bases</CardTitle>
        {status === "locked" && <Lock className="h-5 w-5 text-muted-foreground" />}
        {status === "completed" && <Check className="h-5 w-5 text-green-500" />}
      </CardHeader>
      <CardContent>
        {status !== "locked" && <Progress value={progress} />}
      </CardContent>
    </Card>
  )
}
