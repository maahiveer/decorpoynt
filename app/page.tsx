import { BlogHeader } from "@/components/BlogHeader";
import { BlogHero } from "@/components/BlogHero";
import { ArticleList } from "@/components/ArticleList";
import { BlogFooter } from "@/components/BlogFooter";
import { headers } from 'next/headers';

// Force dynamic rendering so newly published articles appear immediately
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  // Set no-cache headers to prevent any caching
  headers().set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
  headers().set('Pragma', 'no-cache');
  headers().set('Expires', '0');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <BlogHeader />
      <main>
        <BlogHero />
        <ArticleList />
      </main>
      <BlogFooter />
    </div>
  );
}
