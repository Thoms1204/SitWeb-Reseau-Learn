"use client"
import * as React from "react"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

export function LessonCard() {
  return (
    <Card className="hover:bg-accent cursor-pointer">
      <CardHeader>
        <CardTitle className="text-base">1. Introduction aux réseaux</CardTitle>
      </CardHeader>
    </Card>
  )
}
