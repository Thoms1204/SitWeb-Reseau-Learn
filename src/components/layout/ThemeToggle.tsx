"use client"
import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const [theme, setTheme] = React.useState<"light" | "dark" | "system">("system")

  React.useEffect(() => {
    const saved = localStorage.getItem("theme") as any
    if (saved) setTheme(saved)
  }, [])

  const toggle = () => {
    const next = theme === "light" ? "dark" : theme === "dark" ? "system" : "light"
    setTheme(next)
    localStorage.setItem("theme", next)
    if (next === 'dark') document.documentElement.classList.add('dark')
    else if (next === 'light') document.documentElement.classList.remove('dark')
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggle} aria-label="Changer le thème">
      {theme === 'light' && <Sun className="h-5 w-5" />}
      {theme === 'dark' && <Moon className="h-5 w-5" />}
      {theme === 'system' && <Monitor className="h-5 w-5" />}
    </Button>
  )
}
