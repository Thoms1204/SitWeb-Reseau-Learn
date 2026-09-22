"use client"
import * as React from "react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function BadgeCard() {
  return (
    <Card className="text-center p-4">
      <div className="text-4xl mb-2">🏅</div>
      <CardTitle className="text-base">Premier Pas</CardTitle>
      <CardDescription className="text-xs">Complétez votre première leçon</CardDescription>
    </Card>
  )
}
