"use client"
import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function LevelUpModal() {
  return (
    <Dialog open={false}>
      <DialogContent className="text-center sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-yellow-500">Félicitations ! 🎉</DialogTitle>
        </DialogHeader>
        <div className="py-8">
          <div className="text-6xl font-black text-primary mb-4">5</div>
          <p className="text-lg">Vous avez atteint le Niveau 5 !</p>
        </div>
        <Button className="w-full">Continuer</Button>
      </DialogContent>
    </Dialog>
  )
}
