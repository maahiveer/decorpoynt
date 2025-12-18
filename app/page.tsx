import Link from 'next/link'
import { ArrowRight, Star, Shield, Zap } from 'lucide-react'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 relative overflow-hidden bg-[#030014]">
      {/* Background Gradient Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/20 blur-[120px]" />
      </div>

      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex text-white">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-white/10 bg-black/20 backdrop-blur-md pb-6 pt-8 lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-white/5 lg:p-4 hover:bg-white/10 transition-colors cursor-default">
          PickPoynt&trade;
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-black via-black/50 to-transparent lg:static lg:h-auto lg:w-auto lg:bg-none">
          <Link
            className="flex place-items-center gap-2 p-8 lg:p-0 font-bold hover:text-purple-400 transition-colors"
            href="/about"
          >
            About Us
          </Link>
        </div>
      </div>

      <div className="relative flex flex-col place-items-center z-[1]">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 text-white">
            Decisions made <span className="text-gradient">simple</span>.
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Your ultimate destination for unbiased reviews, comprehensive buying guides, and data-driven insights.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/articles" className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur transition-all hover:scale-105 active:scale-95 flex items-center gap-2 text-white font-medium">
              Browse Reviews <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/categories" className="px-8 py-4 rounded-full bg-transparent hover:bg-white/5 border border-transparent hover:border-white/10 transition-all text-gray-300 hover:text-white">
              View Categories
            </Link>
          </div>
        </div>
      </div>

      <div className="grid text-center lg:max-w-6xl lg:w-full lg:grid-cols-3 lg:text-left gap-8 mt-20 lg:mt-0">

        <div className="group rounded-2xl border border-white/5 bg-white/5 px-8 py-8 transition-all hover:border-purple-500/50 hover:bg-purple-500/10 hover:-translate-y-1">
          <div className="mb-4 inline-block p-4 rounded-xl bg-purple-500/20 text-purple-400 group-hover:scale-110 transition-transform">
            <Star className="w-8 h-8" />
          </div>
          <h2 className={`mb-3 text-2xl font-bold text-white`}>
            Expert Reviews
          </h2>
          <p className={`m-0 max-w-[30ch] text-base text-gray-400`}>
            In-depth analysis from industry experts ensuring you get the full picture.
          </p>
        </div>

        <div className="group rounded-2xl border border-white/5 bg-white/5 px-8 py-8 transition-all hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:-translate-y-1">
          <div className="mb-4 inline-block p-4 rounded-xl bg-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
            <Zap className="w-8 h-8" />
          </div>
          <h2 className={`mb-3 text-2xl font-bold text-white`}>
            Data Driven
          </h2>
          <p className={`m-0 max-w-[30ch] text-base text-gray-400`}>
            We back our verdicts with hard data, benchmarks, and real-world testing.
          </p>
        </div>

        <div className="group rounded-2xl border border-white/5 bg-white/5 px-8 py-8 transition-all hover:border-pink-500/50 hover:bg-pink-500/10 hover:-translate-y-1">
          <div className="mb-4 inline-block p-4 rounded-xl bg-pink-500/20 text-pink-400 group-hover:scale-110 transition-transform">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className={`mb-3 text-2xl font-bold text-white`}>
            Unbiased
          </h2>
          <p className={`m-0 max-w-[30ch] text-base text-gray-400`}>
            100% independent. We work for you, not the brands. No paid placements.
          </p>
        </div>

      </div>
    </main>
  )
}
