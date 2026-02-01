'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Wand2, Sparkles, Loader2, AlertCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function GeneratorPage() {
    const router = useRouter()
    const [topic, setTopic] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)
    const [error, setError] = useState('')
    const [loadingStep, setLoadingStep] = useState('')

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!topic.trim()) return

        setIsGenerating(true)
        setError('')
        setLoadingStep('Initializing AI specific agents...')

        try {
            // Simulate steps for better UX
            setTimeout(() => setLoadingStep('Analyzing topic trends...'), 1000)
            setTimeout(() => setLoadingStep('Drafting structured content...'), 2500)
            setTimeout(() => setLoadingStep('Generating professional imagery...'), 4500)
            setTimeout(() => setLoadingStep('Finalizing formatted article...'), 6000)

            const response = await fetch('/api/generate-article', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic }),
            })

            if (!response.ok) {
                throw new Error('Failed to generate article')
            }

            const generatedData = await response.json()

            setLoadingStep('Saving to database...')

            // Save to Supabase as a Draft
            const { data, error: dbError } = await supabase
                .from('articles')
                .insert({
                    title: generatedData.title,
                    slug: generatedData.slug,
                    content: generatedData.content,
                    excerpt: generatedData.excerpt,
                    featured_image: generatedData.featured_image,
                    tags: generatedData.tags,
                    status: 'draft',
                    created_at: new Date().toISOString(),
                    author_id: null // Or fetch current user ID
                })
                .select()
                .single()

            if (dbError) throw dbError

            // Redirect to Editor
            router.push(`/admin/articles/${data.id}/edit`)

        } catch (err: any) {
            console.error(err)
            setError(err.message || 'Something went wrong during generation')
            setIsGenerating(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg glow">
                    <Wand2 className="h-10 w-10 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
                    AI Article Generator
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                    Transform a simple keyword into a full-length, formatted article with high-quality AI-generated images in seconds.
                </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                <div className="p-8 md:p-12">
                    {!isGenerating ? (
                        <form onSubmit={handleGenerate} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    What would you like to write about?
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={topic}
                                        onChange={(e) => setTopic(e.target.value)}
                                        placeholder="e.g., 12 cozy sweater outfits for work"
                                        className="w-full px-6 py-4 text-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                        required
                                    />
                                    <Sparkles className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-500 h-6 w-6 animate-pulse" />
                                </div>
                            </div>

                            {error && (
                                <div className="flex items-center p-4 text-red-800 bg-red-50 dark:bg-red-900/20 dark:text-red-300 rounded-lg">
                                    <AlertCircle className="h-5 w-5 mr-2" />
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={!topic.trim()}
                                className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg rounded-xl shadow-lg transform transition hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                            >
                                <Wand2 className="h-5 w-5" />
                                <span>Generate Article Magic</span>
                            </button>
                        </form>
                    ) : (
                        <div className="text-center py-12">
                            <div className="relative w-24 h-24 mx-auto mb-8">
                                <div className="absolute inset-0 border-t-4 border-blue-500 rounded-full animate-spin"></div>
                                <div className="absolute inset-2 border-r-4 border-purple-500 rounded-full animate-spin-reverse"></div>
                                <Wand2 className="absolute inset-0 m-auto h-8 w-8 text-slate-400 animate-pulse" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                Creating Magic...
                            </h3>
                            <p className="text-purple-600 dark:text-purple-400 font-medium animate-pulse">
                                {loadingStep}
                            </p>
                            <p className="mt-8 text-sm text-slate-500 max-w-md mx-auto">
                                Our AI is researching, writing, and generating custom imagery for "{topic}". This usually takes about 10-15 seconds.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
