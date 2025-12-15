'use client'

import Link from 'next/link'
import { ChevronDown, Menu, X } from 'lucide-react'
import { useState } from 'react'

// PickPoynt Logo Component
function PickPoyntLogo({ className = "h-8" }: { className?: string }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <span className="text-[#1e3a8a] font-bold text-2xl tracking-tight" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        PickPoynt
      </span>
      <span className="text-slate-600 dark:text-slate-400 text-xs -mt-1">
        Decisions made simple
      </span>
    </div>
  )
}

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

  // Group categories into hierarchy
  const topLevelCategories = categories.filter(c => !c.parent_id)
  const getSubcategories = (parentId: string) => categories.filter(c => c.parent_id === parentId)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md dark:border-slate-700/60 dark:bg-slate-900/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <PickPoyntLogo className="h-12" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
            >
              Home
            </Link>

            <Link
              href="/about"
              className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-700">
            <nav className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors px-2 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>

              <Link
                href="/about"
                className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors px-2 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors px-2 py-1"
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
