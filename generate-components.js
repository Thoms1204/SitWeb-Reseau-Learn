const fs = require('fs');
const path = require('path');

const files = {
  // UI Base Components
  'src/components/ui/button.tsx': `"use client";
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
`,
  'src/components/ui/input.tsx': `"use client";
import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, helperText, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1.5 w-full">
        {label && <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{label}</label>}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
          ref={ref}
          {...props}
        />
        {helperText && !error && <p className="text-[0.8rem] text-muted-foreground">{helperText}</p>}
        {error && <p className="text-[0.8rem] text-destructive">{error}</p>}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
`,
  'src/components/ui/card.tsx': `"use client";
import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
`,
  'src/components/ui/badge.tsx': `"use client";
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        success: "border-transparent bg-green-500 text-white hover:bg-green-600",
        warning: "border-transparent bg-yellow-500 text-white hover:bg-yellow-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}
export { Badge, badgeVariants }
`,
  'src/components/ui/progress.tsx': `"use client"
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & { indicatorClassName?: string }
>(({ className, value, indicatorClassName, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn("h-full w-full flex-1 bg-primary transition-all duration-500", indicatorClassName)}
      style={{ transform: \`translateX(-\${100 - (value || 0)}%)\` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
`,
  'src/components/ui/dialog.tsx': `"use client"
import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Fermer</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
)
DialogHeader.displayName = "DialogHeader"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

export { Dialog, DialogPortal, DialogOverlay, DialogClose, DialogTrigger, DialogContent, DialogHeader, DialogTitle }
`,
  'src/components/ui/toast.tsx': `"use client"
import * as React from "react"
import * as ToastPrimitive from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitive.Provider
const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitive.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground",
        success: "border-green-500 bg-green-500 text-white",
        warning: "border-yellow-500 bg-yellow-500 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> & VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitive.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitive.Root.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitive.Close>
))
ToastClose.displayName = ToastPrimitive.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title ref={ref} className={cn("text-sm font-semibold", className)} {...props} />
))
ToastTitle.displayName = ToastPrimitive.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description ref={ref} className={cn("text-sm opacity-90", className)} {...props} />
))
ToastDescription.displayName = ToastPrimitive.Description.displayName

export { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose }
`,
  'src/components/ui/skeleton.tsx': `"use client"
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
`,
  'src/components/ui/avatar.tsx': `"use client"
import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
`,
  // Layout Components
  'src/components/layout/Navbar.tsx': `"use client"
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
`,
  'src/components/layout/Sidebar.tsx': `"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Lock } from "lucide-react"

export function Sidebar() {
  return (
    <aside className="w-64 border-r h-[calc(100vh-3.5rem)] hidden md:block p-4 overflow-y-auto">
      <h2 className="font-semibold text-lg mb-4">Parcours</h2>
      <ul className="space-y-2">
        <li className="p-3 bg-primary/10 rounded-lg border border-primary/20 flex items-center justify-between">
          <span className="font-medium text-primary">Niveau 1: Bases</span>
          <div className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">100%</div>
        </li>
        <li className="p-3 bg-secondary/20 rounded-lg flex items-center justify-between">
          <span className="font-medium text-muted-foreground">Niveau 2: Adressage</span>
          <Lock className="h-4 w-4 text-muted-foreground" />
        </li>
      </ul>
    </aside>
  )
}
`,
  'src/components/layout/Footer.tsx': `import * as React from "react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t py-6 bg-background text-muted-foreground">
      <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm">© {new Date().getFullYear()} NetLearn. Tous droits réservés.</p>
        <div className="flex gap-4 text-sm">
          <Link href="/confidentialite" className="hover:underline">Politique de confidentialité</Link>
          <Link href="/cgu" className="hover:underline">CGU</Link>
          <Link href="/mentions-legales" className="hover:underline">Mentions légales</Link>
          <button className="hover:underline">Gérer mes cookies</button>
        </div>
      </div>
    </footer>
  )
}
`,
  'src/components/layout/ThemeToggle.tsx': `"use client"
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
`,
  // Auth Components
  'src/components/auth/LoginForm.tsx': `"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export function LoginForm() {
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => setLoading(false), 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm mx-auto">
      <Input label="Email" type="email" required />
      <Input label="Mot de passe" type="password" required />
      <div className="flex justify-between items-center text-sm">
        <Link href="/inscription" className="text-primary hover:underline">Créer un compte</Link>
        <Link href="/mot-de-passe-oublie" className="text-muted-foreground hover:underline">Mot de passe oublié ?</Link>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Connexion..." : "Se connecter"}
      </Button>
    </form>
  )
}
`,
  'src/components/auth/RegisterForm.tsx': `"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export function RegisterForm() {
  return (
    <form className="space-y-4 w-full max-w-sm mx-auto">
      <Input label="Email" type="email" required />
      <Input label="Nom d'utilisateur" type="text" required />
      <Input label="Mot de passe" type="password" required />
      <Input label="Confirmer le mot de passe" type="password" required />
      
      <div className="flex items-center gap-2">
        <input type="checkbox" id="gdpr" required className="rounded border-gray-300" />
        <label htmlFor="gdpr" className="text-sm">J'accepte la politique de confidentialité</label>
      </div>

      <Button type="submit" className="w-full">Créer un compte</Button>
      <div className="text-center text-sm">
        Déjà un compte ? <Link href="/connexion" className="text-primary hover:underline">Se connecter</Link>
      </div>
    </form>
  )
}
`,
  'src/components/auth/ForgotPasswordForm.tsx': `"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ForgotPasswordForm() {
  return (
    <form className="space-y-4 w-full max-w-sm mx-auto">
      <Input label="Email" type="email" required />
      <Button type="submit" className="w-full">Envoyer le lien de réinitialisation</Button>
    </form>
  )
}
`,
  'src/components/auth/ResetPasswordForm.tsx': `"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ResetPasswordForm() {
  return (
    <form className="space-y-4 w-full max-w-sm mx-auto">
      <Input label="Nouveau mot de passe" type="password" required />
      <Input label="Confirmer le mot de passe" type="password" required />
      <Button type="submit" className="w-full">Réinitialiser</Button>
    </form>
  )
}
`,
  // Learning Components
  'src/components/learning/LevelTree.tsx': `"use client"
import * as React from "react"

export function LevelTree() {
  return (
    <div className="flex flex-col items-center gap-8 py-8">
      {/* Visual placeholder for tree */}
      <div className="p-4 bg-primary text-primary-foreground rounded-full">Niveau 1</div>
      <div className="w-1 h-8 bg-border" />
      <div className="p-4 bg-secondary text-secondary-foreground rounded-full">Niveau 2 (Bloqué)</div>
    </div>
  )
}
`,
  'src/components/learning/LevelCard.tsx': `"use client"
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
`,
  'src/components/learning/LessonCard.tsx': `"use client"
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
`,
  'src/components/learning/ExerciseRenderer.tsx': `"use client"
import * as React from "react"

export function ExerciseRenderer() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <p className="text-muted-foreground font-medium">Question 1/10</p>
      {/* Exercise content goes here */}
    </div>
  )
}
`,
  'src/components/learning/McqExercise.tsx': `"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"

export function McqExercise() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Quelle est la couche 3 du modèle OSI ?</h3>
      <div className="space-y-2">
        {['Réseau', 'Liaison', 'Transport', 'Application'].map((opt) => (
          <label key={opt} className="flex items-center gap-3 p-4 border rounded-lg hover:bg-accent cursor-pointer">
            <input type="radio" name="mcq" />
            <span>{opt}</span>
          </label>
        ))}
      </div>
      <Button className="w-full">Vérifier</Button>
    </div>
  )
}
`,
  'src/components/learning/SubnetCalcExercise.tsx': `"use client"
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
`,
  'src/components/learning/FeedbackPanel.tsx': `"use client"
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
`,
  'src/components/learning/ProgressBar.tsx': `"use client"
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
`,
  // Gamification
  'src/components/gamification/XpBar.tsx': `"use client"
import * as React from "react"
import { Progress } from "@/components/ui/progress"

export function XpBar() {
  return (
    <div className="flex items-center gap-4 w-full">
      <div className="h-10 w-10 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold">4</div>
      <div className="flex-1">
        <div className="flex justify-between text-sm mb-1">
          <span className="font-semibold">Niveau 4</span>
          <span className="text-muted-foreground">1250/2000 XP</span>
        </div>
        <Progress value={62.5} indicatorClassName="bg-yellow-500" />
      </div>
    </div>
  )
}
`,
  'src/components/gamification/StreakCounter.tsx': `"use client"
import * as React from "react"
import { Flame } from "lucide-react"

export function StreakCounter() {
  return (
    <div className="flex flex-col items-center p-4 bg-orange-500/10 rounded-xl border border-orange-500/20 text-orange-600 dark:text-orange-400">
      <Flame className="h-8 w-8 animate-pulse mb-1" />
      <span className="font-bold text-xl">7</span>
      <span className="text-sm">jours</span>
    </div>
  )
}
`,
  'src/components/gamification/StreakFreezeButton.tsx': `"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"

export function StreakFreezeButton() {
  return (
    <Button variant="outline" className="w-full gap-2">
      ❄️ Utiliser un gel (2 restants)
    </Button>
  )
}
`,
  'src/components/gamification/LevelUpModal.tsx': `"use client"
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
`,
  'src/components/gamification/BadgeCard.tsx': `"use client"
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
`,
  'src/components/gamification/XpGainAnimation.tsx': `"use client"
import * as React from "react"

export function XpGainAnimation() {
  return (
    <div className="fixed top-1/2 left-1/2 pointer-events-none z-50 text-yellow-500 font-bold text-2xl animate-bounce">
      +10 XP
    </div>
  )
}
`,
  // GDPR
  'src/components/gdpr/ConsentBanner.tsx': `"use client"
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
`,
  'src/components/gdpr/ConsentManager.tsx': `"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"

export function ConsentManager() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gérer mes cookies</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h4 className="font-semibold">Essentiels</h4>
            <p className="text-sm text-muted-foreground">Requis pour le fonctionnement du site</p>
          </div>
          <input type="checkbox" checked disabled className="h-5 w-5" />
        </div>
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h4 className="font-semibold">Analytiques</h4>
            <p className="text-sm text-muted-foreground">Pour améliorer notre service</p>
          </div>
          <input type="checkbox" className="h-5 w-5" />
        </div>
      </div>
      <div className="flex gap-4">
        <Button>Sauvegarder</Button>
        <Button variant="destructive">Révoquer tout</Button>
      </div>
    </div>
  )
}
`,
  'src/components/gdpr/DataExportButton.tsx': `"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"

export function DataExportButton() {
  return (
    <div className="space-y-2">
      <Button variant="outline">Exporter mes données</Button>
      <p className="text-xs text-muted-foreground">Vos données seront disponibles au téléchargement pendant 7 jours.</p>
    </div>
  )
}
`,
  'src/components/gdpr/DeleteAccountFlow.tsx': `"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"

export function DeleteAccountFlow() {
  return (
    <div className="p-6 border border-destructive/50 bg-destructive/10 rounded-lg space-y-4">
      <h3 className="text-lg font-bold text-destructive">Supprimer mon compte</h3>
      <p className="text-sm">Cette action est irréversible après 14 jours.</p>
      <Button variant="destructive">Commencer la suppression</Button>
    </div>
  )
}
`,
  // Review
  'src/components/review/SpacedReviewCard.tsx': `"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"

export function SpacedReviewCard() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center text-muted-foreground mb-4">12 cartes restantes</div>
      <div className="p-8 border rounded-xl text-center space-y-8">
        <h3 className="text-2xl font-bold">Quelle est l'adresse de boucle locale IPv4 ?</h3>
        {/* Answer section */}
        <div className="pt-8 border-t flex justify-center gap-4">
          <Button variant="destructive">À revoir</Button>
          <Button variant="warning">Difficile</Button>
          <Button variant="secondary" className="bg-blue-500 text-white hover:bg-blue-600">Correct</Button>
          <Button variant="success">Facile</Button>
        </div>
      </div>
    </div>
  )
}
`
};

for (const [filePath, content] of Object.entries(files)) {
  const fullPath = path.join('f:/siteweb', filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(\`Created \${filePath}\`);
}
