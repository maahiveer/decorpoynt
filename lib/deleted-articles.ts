/**
 * DELETED ARTICLES - 410 GONE
 * 
 * This is a tombstone list of permanently deleted article slugs.
 * Articles in this list will return HTTP 410 (Gone) status.
 * 
 * Why 410 instead of 404?
 * - Tells Google the content is PERMANENTLY gone (not just missing)
 * - Google will remove from search results faster
 * - Prevents wasted crawl budget
 * 
 * HOW TO ADD A DELETED ARTICLE:
 * 1. Add the slug (without leading slash) to the array below
 * 2. Deploy your changes
 * 3. Submit URL to Google Search Console for removal
 */

export const DELETED_ARTICLE_SLUGS = [
    // Spam/Low Quality Content Removed
    'billionaire-brain-wave-reviews',
    'billionaire-brainwave',
    'manifesting-abundance',
    'wealth-manifestation',
    'attract-money-fast',

    // Add any other deleted article slugs here
    // Example: 'old-article-slug',
] as const

/**
 * Banned URL patterns (for category-level blocking)
 */
export const BANNED_PATTERNS = [
    '/health',
    '/manifestation',
    '/supplements',
] as const

/**
 * Check if a path should return 410 Gone
 */
export function isDeleted(pathname: string): boolean {
    const slug = pathname.replace(/^\//, '').replace(/\/$/, '')

    // Check if matches any deleted slug
    if (DELETED_ARTICLE_SLUGS.includes(slug as any)) {
        return true
    }

    // Check if path contains spam keywords
    const spamKeywords = ['billionaire', 'brainwave', 'parasite', 'manifestation']
    if (spamKeywords.some(keyword => pathname.toLowerCase().includes(keyword))) {
        return true
    }

    // Check if matches any banned pattern
    if (BANNED_PATTERNS.some(pattern => pathname.startsWith(pattern))) {
        return true
    }

    return false
}
