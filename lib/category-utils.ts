import { 
    Lamp, 
    Sofa, 
    Paintbrush, 
    Layout, 
    Palmtree, 
    Bed, 
    Home, 
    ChefHat, 
    Bath,
    LucideIcon 
} from 'lucide-react'

export const getCategoryIcon = (name: string): LucideIcon => {
    const lowerName = name.toLowerCase()
    if (lowerName.includes('living') || lowerName.includes('sofa') || lowerName.includes('furniture')) return Sofa
    if (lowerName.includes('bedroom') || lowerName.includes('sleep') || lowerName.includes('bed')) return Bed
    if (lowerName.includes('kitchen') || lowerName.includes('cooking') || lowerName.includes('dining')) return ChefHat
    if (lowerName.includes('bathroom') || lowerName.includes('bath') || lowerName.includes('shower')) return Bath
    if (lowerName.includes('lighting') || lowerName.includes('lamp') || lowerName.includes('light')) return Lamp
    if (lowerName.includes('color') || lowerName.includes('paint') || lowerName.includes('wall')) return Paintbrush
    if (lowerName.includes('outdoor') || lowerName.includes('patio') || lowerName.includes('garden')) return Palmtree
    if (lowerName.includes('design') || lowerName.includes('style') || lowerName.includes('layout')) return Layout

    // High-quality random fallback icons
    const fallbacks = [Home, Sofa, Lamp, Paintbrush, Layout, Palmtree, Bed]
    const charSum = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return fallbacks[charSum % fallbacks.length]
}

export const getCategoryGradient = (name: string): string => {
    const lowerName = name.toLowerCase()
    if (lowerName.includes('living') || lowerName.includes('furniture')) return 'from-blue-600/40 to-indigo-600/40 hover:border-blue-500/50'
    if (lowerName.includes('bedroom') || lowerName.includes('sleep')) return 'from-purple-600/40 to-violet-600/40 hover:border-purple-500/50'
    if (lowerName.includes('kitchen') || lowerName.includes('dining')) return 'from-orange-600/40 to-red-600/40 hover:border-orange-500/50'
    if (lowerName.includes('bathroom') || lowerName.includes('bath')) return 'from-cyan-600/40 to-teal-600/40 hover:border-cyan-500/50'
    if (lowerName.includes('lighting') || lowerName.includes('lamp')) return 'from-yellow-600/40 to-amber-600/40 hover:border-yellow-500/50'
    if (lowerName.includes('color') || lowerName.includes('paint')) return 'from-pink-600/40 to-rose-600/40 hover:border-pink-500/50'
    if (lowerName.includes('outdoor') || lowerName.includes('patio')) return 'from-green-600/40 to-emerald-600/40 hover:border-green-500/50'
    if (lowerName.includes('design') || lowerName.includes('style')) return 'from-slate-600/40 to-zinc-600/40 hover:border-slate-500/50'

    // High-quality random fallback gradients (more vibrant)
    const gradients = [
        'from-indigo-600/40 to-blue-600/40 hover:border-indigo-500/50 shadow-indigo-500/10',
        'from-violet-600/40 to-fuchsia-600/40 hover:border-violet-500/50 shadow-violet-500/10',
        'from-amber-600/40 to-yellow-600/40 hover:border-amber-500/50 shadow-amber-500/10',
        'from-emerald-600/40 to-cyan-600/40 hover:border-emerald-500/50 shadow-emerald-500/10',
        'from-rose-600/40 to-pink-600/40 hover:border-rose-500/50 shadow-rose-500/10',
        'from-cyan-600/40 to-blue-600/40 hover:border-cyan-500/50 shadow-cyan-500/10'
    ]
    const charSum = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return gradients[charSum % gradients.length]
}

export const getIconColor = (name: string): string => {
    const lowerName = name.toLowerCase()
    if (lowerName.includes('living') || lowerName.includes('furniture')) return 'text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]'
    if (lowerName.includes('bedroom') || lowerName.includes('sleep')) return 'text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.6)]'
    if (lowerName.includes('kitchen') || lowerName.includes('dining')) return 'text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.6)]'
    if (lowerName.includes('bathroom') || lowerName.includes('bath')) return 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]'
    if (lowerName.includes('lighting') || lowerName.includes('lamp')) return 'text-yellow-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]'
    if (lowerName.includes('color') || lowerName.includes('paint')) return 'text-pink-400 drop-shadow-[0_0_8px_rgba(244,114,182,0.6)]'
    if (lowerName.includes('outdoor') || lowerName.includes('patio')) return 'text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]'
    if (lowerName.includes('design') || lowerName.includes('style')) return 'text-slate-400 drop-shadow-[0_0_8px_rgba(148,163,184,0.6)]'

    // High-quality random fallback colors (more vibrant with glow)
    const colors = [
        'text-indigo-400 drop-shadow-[0_0_10px_rgba(129,140,248,0.6)]',
        'text-violet-400 drop-shadow-[0_0_10px_rgba(167,139,250,0.6)]',
        'text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]',
        'text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.6)]',
        'text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]',
        'text-fuchsia-400 drop-shadow-[0_0_10px_rgba(232,121,249,0.6)]',
        'text-orange-400 drop-shadow-[0_0_10px_rgba(251,146,60,0.6)]'
    ]
    const charSum = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return colors[charSum % colors.length]
}

