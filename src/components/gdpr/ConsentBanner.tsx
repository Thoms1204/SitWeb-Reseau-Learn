"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"

export function ConsentBanner() {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t shadow-lg z-50 flex flex-col md:flex-row items-center justify-between gap-4">
      <div>
        <h3 className="font-semibold">Nous respectons votre vie privée</h3>
        <p className="text-sm text-muted-foreground">Nous utilisons des cookies pour...</p>
      </div>
      <div className="flex gap-2 w-full md:w-auto">
        <Button variant="outline" className="flex-1">Personnaliser</Button>
        <Button variant="destructive" className="flex-1">Tout refuser</Button>
        <Button className="flex-1">Tout accepter</Button>
      </div>
    </div>
  )
}
