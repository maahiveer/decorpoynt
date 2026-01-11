'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

interface Category {
  id: string
  name: string
  slug: string
  parent_id?: string | null
}

interface BlogHeaderProps {
  categories: Category[]
}

export function BlogHeader({ categories }: BlogHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#030014]/80 backdrop-blur-xl">
      <div className="container mx-auto px-6">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className="font-mono text-lg tracking-wider font-bold text-white">
              PickPoynt&trade;
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/articles"
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              Recipes
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-white/5 animate-in fade-in slide-in-from-top-4 duration-300">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-lg font-medium text-gray-300 hover:text-white transition-colors px-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/articles"
                className="text-lg font-medium text-gray-300 hover:text-white transition-colors px-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Recipes
              </Link>
              <Link
                href="/about"
                className="text-lg font-medium text-gray-300 hover:text-white transition-colors px-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-lg font-medium text-gray-300 hover:text-white transition-colors px-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

