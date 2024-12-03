"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { MoonIcon, SunIcon, BeakerIcon } from 'lucide-react'

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <BeakerIcon className="h-8 w-8" />
              <span className="font-bold text-xl">ClinicalRFP</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/rfps" className="text-foreground/60 hover:text-foreground">
              RFPs
            </Link>
            <Link href="/sources" className="text-foreground/60 hover:text-foreground">
              Sources
            </Link>
            <Link href="/dashboard" className="text-foreground/60 hover:text-foreground">
              Dashboard
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}