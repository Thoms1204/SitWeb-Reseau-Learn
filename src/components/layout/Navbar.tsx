"use client"
import * as React from "react"
import Link from "next/link"
import { Network, Coins, Flame, Menu } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <a href="#main-content" className="sr-only focus:not-sr-only">Passer au contenu principal</a>
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Network className="h-6 w-6 text-primary" />
            <span>NetLearn</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/apprendre" className="text-sm font-medium transition-colors hover:text-primary">Apprendre</Link>
            <Link href="/reviser" className="text-sm font-medium transition-colors hover:text-primary">Réviser</Link>
            <Link href="/profil" className="text-sm font-medium transition-colors hover:text-primary">Profil</Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 font-semibold text-yellow-500">
            <Coins className="h-5 w-5" /> 1250
          </div>
          <div className="hidden md:flex items-center gap-2 font-semibold text-orange-500 animate-pulse">
            <Flame className="h-5 w-5" /> 7
          </div>
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
