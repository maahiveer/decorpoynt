'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Cookie, X } from 'lucide-react'

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem('cookie-consent')
        if (!consent) {
            // Small delay for better UX
            const timer = setTimeout(() => {
                setIsVisible(true)
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [])

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted')
        setIsVisible(false)
    }

    const handleReject = () => {
        localStorage.setItem('cookie-consent', 'rejected')
        setIsVisible(false)
    }

    if (!isVisible) return null

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
            <div className="container mx-auto max-w-5xl">
                <div className="bg-[#030014]/80 backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">

                    {/* Subtle background glow */}
                    <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />

                    <div className="flex items-start gap-5 relative z-10">
                        <div className="hidden sm:flex h-12 w-12 rounded-xl bg-purple-600/20 items-center justify-center shrink-0 border border-purple-500/20">
                            <Cookie className="w-6 h-6 text-purple-400" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-lg font-bold text-white tracking-tight">We value your privacy</h3>
                            <p className="text-sm text-gray-400 leading-relaxed max-w-2xl">
                                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
                                By clicking "Accept", you consent to our use of cookies. Read our{' '}
                                <Link href="/privacy" className="text-purple-400 hover:text-purple-300 underline underline-offset-4">
                                    Privacy Policy
                                </Link>.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 shrink-0 relative z-10 w-full md:w-auto">
                        <button
                            onClick={handleReject}
                            className="flex-1 md:flex-none px-6 py-3 rounded-full bg-white/5 border border-white/10 text-gray-300 font-medium hover:bg-white/10 hover:text-white transition-all active:scale-95 text-sm"
                        >
                            Reject All
                        </button>
                        <button
                            onClick={handleAccept}
                            className="flex-1 md:flex-none px-8 py-3 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-all shadow-xl hover:shadow-white/10 hover:scale-105 active:scale-95 text-sm"
                        >
                            Accept Everything
                        </button>
                        <button
                            onClick={() => setIsVisible(false)}
                            className="hidden md:flex p-2 text-gray-500 hover:text-white transition-colors"
                            aria-label="Close"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
