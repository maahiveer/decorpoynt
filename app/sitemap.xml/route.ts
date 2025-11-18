import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Force dynamic rendering for sitemap
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const baseUrl = 'https://tracksatscale.vercel.app'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: '1.0'
    },
    {
      url: `${baseUrl}/about`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      url: `${baseUrl}/contact`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      url: `${baseUrl}/privacy`,
      lastmod: new Date().toISOString(),
      changefreq: 'yearly',
      priority: '0.5'
    },
    {
      url: `${baseUrl}/terms`,
      lastmod: new Date().toISOString(),
      changefreq: 'yearly',
      priority: '0.5'
    },
    {
      url: `${baseUrl}/affiliate-disclaimer`,
      lastmod: new Date().toISOString(),
      changefreq: 'yearly',
      priority: '0.5'
    }
  ]

  // Get published articles from database
  let articles: any[] = []
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co') {
      const { data } = await supabase
        .from('articles')
        .select('slug, updated_at, published_at')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
      
      articles = data || []
    }
  } catch (error) {
    console.error('Error fetching articles for sitemap:', error)
  }

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map(page => `
  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')}
  ${articles.map(article => `
  <url>
    <loc>${baseUrl}/${article.slug}</loc>
    <lastmod>${article.updated_at || article.published_at || new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`).join('')}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  })
}
