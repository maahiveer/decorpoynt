import Link from 'next/link'
import { ArrowRight, Star, Shield, Zap, Calendar, Clock, ChevronRight, UtensilsCrossed, Cookie, Salad, Pizza, Coffee, Soup, Cake, Leaf } from 'lucide-react'
import { supabase, Article } from '@/lib/supabase'

export const revalidate = 0 // Ensure fresh data on every request

async function getLatestArticles(): Promise<Article[]> {
  if (!supabase) return []

  try {

    const { data: articles, error } = await supabase
      .from('articles')
      .select('id, title, slug, excerpt, featured_image, created_at, tags')
      .eq('status', 'published')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching articles:', error)
      return []
    }

    // Cast the response to Article[] since we are selecting a subset of fields
    return (articles as unknown as Article[]) || []
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}

export default async function Home() {
  const articles = await getLatestArticles()

  return (
    <main className="min-h-screen relative bg-[#030014] text-white overflow-hidden">

      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/20 blur-[120px]" />
      </div>

      {/* Navigation / Header */}
      <header className="container mx-auto px-6 py-6 flex items-center justify-between z-20 relative">
        <div className="font-mono text-lg tracking-wider font-bold">
          PickPoynt&trade;
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-12 pb-12 md:pt-20 md:pb-16 relative z-10 flex flex-col items-center text-center">

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
          Elevate your <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">cooking</span>.
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Delicious recipes, cooking tips, and culinary inspiration from the kitchen.
          For food lovers, by food lovers.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/articles" className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
            Explore Recipes <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/about" className="px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 backdrop-blur text-white font-medium transition-all flex items-center justify-center">
            Our Mission
          </Link>
        </div>
      </div>

      {/* Recipe Categories Section */}
      <section className="container mx-auto px-6 py-16 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore by Category</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover delicious recipes organized by cuisine and meal type
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {/* Italian */}
          <Link
            href="/categories/italian"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600/20 to-red-600/20 border border-white/10 hover:border-green-500/50 p-6 md:p-8 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <Pizza className="w-10 h-10 md:w-12 md:h-12 mb-3 text-green-400 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg md:text-xl font-bold text-white mb-1">Italian</h3>
              <p className="text-xs md:text-sm text-gray-400">Pasta, Pizza & More</p>
            </div>
          </Link>

          {/* Asian */}
          <Link
            href="/categories/asian"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-600/20 to-yellow-600/20 border border-white/10 hover:border-orange-500/50 p-6 md:p-8 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <UtensilsCrossed className="w-10 h-10 md:w-12 md:h-12 mb-3 text-orange-400 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg md:text-xl font-bold text-white mb-1">Asian</h3>
              <p className="text-xs md:text-sm text-gray-400">Stir-fry, Sushi & More</p>
            </div>
          </Link>

          {/* Desserts */}
          <Link
            href="/categories/desserts"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-600/20 to-purple-600/20 border border-white/10 hover:border-pink-500/50 p-6 md:p-8 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <Cake className="w-10 h-10 md:w-12 md:h-12 mb-3 text-pink-400 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg md:text-xl font-bold text-white mb-1">Desserts</h3>
              <p className="text-xs md:text-sm text-gray-400">Cakes, Cookies & Sweets</p>
            </div>
          </Link>

          {/* Breakfast */}
          <Link
            href="/categories/breakfast"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-600/20 to-orange-600/20 border border-white/10 hover:border-amber-500/50 p-6 md:p-8 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <Coffee className="w-10 h-10 md:w-12 md:h-12 mb-3 text-amber-400 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg md:text-xl font-bold text-white mb-1">Breakfast</h3>
              <p className="text-xs md:text-sm text-gray-400">Start Your Day Right</p>
            </div>
          </Link>

          {/* Healthy */}
          <Link
            href="/categories/healthy"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600/20 to-teal-600/20 border border-white/10 hover:border-emerald-500/50 p-6 md:p-8 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <Salad className="w-10 h-10 md:w-12 md:h-12 mb-3 text-emerald-400 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg md:text-xl font-bold text-white mb-1">Healthy</h3>
              <p className="text-xs md:text-sm text-gray-400">Nutritious & Delicious</p>
            </div>
          </Link>

          {/* Vegan */}
          <Link
            href="/categories/vegan"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-lime-600/20 to-green-600/20 border border-white/10 hover:border-lime-500/50 p-6 md:p-8 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-lime-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-lime-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <Leaf className="w-10 h-10 md:w-12 md:h-12 mb-3 text-lime-400 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg md:text-xl font-bold text-white mb-1">Vegan</h3>
              <p className="text-xs md:text-sm text-gray-400">Plant-Based Goodness</p>
            </div>
          </Link>

          {/* Quick Meals */}
          <Link
            href="/categories/quick-meals"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-white/10 hover:border-blue-500/50 p-6 md:p-8 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <Clock className="w-10 h-10 md:w-12 md:h-12 mb-3 text-blue-400 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg md:text-xl font-bold text-white mb-1">Quick Meals</h3>
              <p className="text-xs md:text-sm text-gray-400">30 Minutes or Less</p>
            </div>
          </Link>

          {/* Comfort Food */}
          <Link
            href="/categories/comfort-food"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-600/20 to-red-600/20 border border-white/10 hover:border-rose-500/50 p-6 md:p-8 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-rose-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <Soup className="w-10 h-10 md:w-12 md:h-12 mb-3 text-rose-400 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg md:text-xl font-bold text-white mb-1">Comfort Food</h3>
              <p className="text-xs md:text-sm text-gray-400">Soul-Warming Dishes</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Latest Articles Grid */}
      <section className="container mx-auto px-6 py-20 border-t border-white/5 relative z-10">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold">Latest Recipes</h2>
          <Link href="/articles" className="text-sm text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/${article.slug}`}
                className="group relative flex flex-col h-full rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 overflow-hidden transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/10"
              >
                {/* Image */}
                <div className="aspect-[16/9] w-full overflow-hidden bg-white/5 relative">
                  {article.featured_image ? (
                    <img
                      src={article.featured_image}
                      alt={article.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      <Zap className="w-10 h-10 opacity-20" />
                    </div>
                  )}

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030014] to-transparent opacity-60" />
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col relative">
                  {/* Tags */}
                  {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {article.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-xs font-medium px-2 py-1 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                    {article.excerpt || "Click to read the full story..."}
                  </p>

                  <div className="mt-auto flex items-center text-xs text-gray-500 gap-4 pt-4 border-t border-white/5">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(article.created_at).toLocaleDateString(undefined, {
                        month: 'short', day: 'numeric', year: 'numeric'
                      })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      5 min read
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/5 border-dashed">
            <h3 className="text-xl font-medium text-gray-300 mb-2">No recipes published yet</h3>
            <p className="text-gray-500">Check back soon for delicious recipes.</p>
          </div>
        )}
      </section>


      {/* Footer Simple */}
      <footer className="border-t border-white/5 py-12 text-center text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} PickPoynt. All rights reserved.</p>
      </footer>
    </main>
  )
}
