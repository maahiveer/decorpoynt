'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface Article {
    id: string
    title: string
    slug: string
    featured_image: string | null
}

interface InArticleRelatedProps {
    currentArticleId: string
    currentTags?: string[]
    limit?: number
}

export function InArticleRelated({ currentArticleId, currentTags = [], limit = 2 }: InArticleRelatedProps) {
    const [articles, setArticles] = useState<Article[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchRelatedArticles() {
            try {
                const { data, error } = await supabase
                    .from('articles')
                    .select('id, title, slug, featured_image')
                    .eq('status', 'published')
                    .neq('id', currentArticleId)
                    .order('published_at', { ascending: false })
                    .limit(limit)

                if (error) throw error

                // Prioritize articles with matching tags
                if (data && currentTags.length > 0) {
                    const sorted = data.sort((a: any, b: any) => {
                        const aMatches = (a as any).tags?.filter((tag: string) => currentTags.includes(tag)).length || 0
                        const bMatches = (b as any).tags?.filter((tag: string) => currentTags.includes(tag)).length || 0
                        return bMatches - aMatches
                    })
                    setArticles(sorted)
                } else {
                    setArticles(data || [])
                }
            } catch (error) {
                console.error('Error fetching in-article related:', error)
                setArticles([])
            } finally {
                setLoading(false)
            }
        }

        fetchRelatedArticles()
    }, [currentArticleId, currentTags, limit])

    if (loading || articles.length === 0) {
        return null
    }

    return (
        <div className="my-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-lg border-l-4 border-blue-500">
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                <span className="mr-2">📚</span>
                Continue Reading
            </h3>
            <div className="space-y-3">
                {articles.map((article) => (
                    <Link
                        key={article.id}
                        href={`/articles/${article.slug}`}
                        className="flex items-center gap-3 group hover:bg-white/50 dark:hover:bg-gray-700/50 p-2 rounded transition-all"
                    >
                        {article.featured_image && (
                            <div className="flex-shrink-0 w-16 h-16 rounded overflow-hidden bg-gray-200 dark:bg-gray-700">
                                <img
                                    src={article.featured_image}
                                    alt={article.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                        )}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                {article.title}
                            </p>
                        </div>
                        <svg
                            className="flex-shrink-0 w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                ))}
            </div>
        </div>
    )
}
