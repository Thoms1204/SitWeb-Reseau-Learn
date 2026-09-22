"use client"
import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SubnetCalcExercise() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Calculez l'adresse de réseau pour 192.168.1.50/26</h3>
      <Input label="Adresse réseau" placeholder="x.x.x.x" />
      <Button className="w-full">Vérifier</Button>
    </div>
  )
}
