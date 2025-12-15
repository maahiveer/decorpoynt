import { BlogHeader } from "@/components/BlogHeader";
import { BlogHero } from "@/components/BlogHero";
import { ArticleListSSR } from "@/components/ArticleListSSR";
import { BlogFooter } from "@/components/BlogFooter";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

import type { Metadata } from "next";

// Force dynamic rendering so newly published articles appear immediately
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pickpoynt.com';
const ARTICLES_PER_PAGE = 10;

export const metadata: Metadata = {
  title: "PickPoynt - Decisions made simple",
  description: "Make informed purchasing decisions with PickPoynt's comprehensive product reviews, buying guides, and consumer insights.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "PickPoynt - Decisions made simple",
    description: "Make informed purchasing decisions with PickPoynt's comprehensive product reviews, buying guides, and consumer insights.",
    url: siteUrl,
    siteName: "PickPoynt",
    type: "website",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PickPoynt',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "PickPoynt - Decisions made simple",
    description: "Make informed purchasing decisions with PickPoynt's comprehensive product reviews, buying guides, and consumer insights.",
    images: ['/og-image.png'],
  },
};

async function getCategories() {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co' ||
    !supabase
  ) {
    return []
  }

  try {
    const { data, error } = await supabase
      .from('categories')
      .select('id, name, slug, parent_id')
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching categories:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

interface SiteSetting {
  setting_key: string
  setting_value: string | null
}

async function getHomepageBanners() {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co' ||
    !supabase
  ) {
    return { leftBanner: null, rightBanner: null }
  }

  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('setting_key, setting_value')
      .in('setting_key', ['homepage_left_banner', 'homepage_right_banner'])

    if (error) {
      console.error('Error fetching homepage banners:', error)
      return { leftBanner: null, rightBanner: null }
    }

    const settings = data as SiteSetting[]
    const leftBanner = settings?.find(s => s.setting_key === 'homepage_left_banner')?.setting_value || null
    const rightBanner = settings?.find(s => s.setting_key === 'homepage_right_banner')?.setting_value || null

    return { leftBanner, rightBanner }
  } catch (error) {
    console.error('Error fetching homepage banners:', error)
    return { leftBanner: null, rightBanner: null }
  }
}

async function getArticles(page: number = 1) {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co' ||
    !supabase
  ) {
    return { articles: [], totalArticles: 0 }
  }

  try {
    // Get total count
    const { count } = await supabase
      .from('articles')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'published')

    const totalArticles = count || 0

    // Get paginated articles
    const from = (page - 1) * ARTICLES_PER_PAGE
    const to = from + ARTICLES_PER_PAGE - 1

    const { data, error } = await supabase
      .from('articles')
      .select(`
        *,
        category:categories(id, name, slug)
      `)
      .eq('status', 'published')
      .order('published_at', { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false })
      .range(from, to)

    if (error) {
      console.error('Error fetching published articles:', error)
      return { articles: [], totalArticles: 0 }
    }

    const filteredArticles = (data || []).filter(
      (article: any) => !!article.slug && article.slug.trim() !== ''
    )

    return { articles: filteredArticles, totalArticles }
  } catch (error) {
    console.error('Error fetching articles:', error)
    return { articles: [], totalArticles: 0 }
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams
  const currentPage = Number(params.page) || 1
  const categories = await getCategories()
  const { articles, totalArticles } = await getArticles(currentPage)
  const totalPages = Math.ceil(totalArticles / ARTICLES_PER_PAGE)
  const { leftBanner, rightBanner } = await getHomepageBanners()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <BlogHeader categories={categories} />
      <main>
        <BlogHero />

        {/* Category Grid Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">Explore Topics</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Dive into our comprehensive guides and reviews by category.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.filter((c: any) => !c.parent_id).map((category: any, index: number) => {
              // Assign a gradient based on index to variate the look
              const gradients = [
                'bg-gradient-to-br from-blue-600 to-cyan-500',
                'bg-gradient-to-br from-violet-600 to-purple-500',
                'bg-gradient-to-br from-orange-500 to-red-500',
                'bg-gradient-to-br from-emerald-500 to-teal-600',
                'bg-gradient-to-br from-pink-600 to-rose-500',
                'bg-gradient-to-br from-indigo-600 to-blue-600',
                'bg-gradient-to-br from-amber-500 to-orange-600',
                'bg-gradient-to-br from-fuchsia-600 to-pink-600'
              ];
              const gradient = gradients[index % gradients.length];

              return (
                <Link
                  href={`/categories/${category.slug}`}
                  key={category.id}
                  className={`group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 block aspect-[4/3] ${gradient}`}
                >
                  {/* Decorative Icon Background - always visible but subtle */}
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                    <svg width="150" height="150" viewBox="0 0 24 24" fill="white" className="text-white">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    </svg>
                  </div>

                  <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-10">
                    <div className="relative z-10">
                      <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight shadow-sm">
                        {category.name}
                      </h3>
                      <div className="flex items-center text-white/90 font-bold text-lg opacity-90 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <span>Browse Articles</span>
                        <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <BlogFooter />
    </div>
  );
}
