'use client'

import { useEffect, useRef } from 'react'

interface ArticleRendererProps {
    content: string
}

export function ArticleRenderer({ content }: ArticleRendererProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return

        // Re-execute any scripts found in the content
        const scripts = containerRef.current.querySelectorAll('script')
        scripts.forEach((oldScript) => {
            const newScript = document.createElement('script')

            // Copy all attributes (src, async, etc.)
            Array.from(oldScript.attributes).forEach((attr) => {
                newScript.setAttribute(attr.name, attr.value)
            })

            // Copy inner content if any
            if (oldScript.innerHTML) {
                newScript.appendChild(document.createTextNode(oldScript.innerHTML))
            }

            // Replace the old script with the new one to trigger execution
            oldScript.parentNode?.replaceChild(newScript, oldScript)
        })

        // Add support for "Print" buttons if they exist in the HTML
        const printButtons = containerRef.current.querySelectorAll('.print-recipe, #print-recipe, .print-guide, #print-guide, .print-article, #print-article, [href*="print"]')
        printButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (btn.tagName === 'A' && btn.getAttribute('href')?.includes('print')) {
                    // If it's a link, we might want to prevent default and just print the current page 
                    // but often these are specific print URLs. For now, let's just make sure window.print works
                }
                // Common trigger for recipe/guide tool print
                if (btn.classList.contains('print-recipe') || btn.id === 'print-recipe' ||
                    btn.classList.contains('print-guide') || btn.id === 'print-guide' ||
                    btn.classList.contains('print-article') || btn.id === 'print-article') {
                    e.preventDefault()
                    window.print()
                }
            })
        })

        // Add smooth scroll for "Jump to Recipe/Guide" links
        const jumpLinks = containerRef.current.querySelectorAll('a[href^="#"]')
        jumpLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href')
                if (href?.startsWith('#')) {
                    const target = document.querySelector(href)
                    if (target) {
                        e.preventDefault()
                        target.scrollIntoView({ behavior: 'smooth' })
                    }
                }
            })
        })

    }, [content])

    // Function to inject ads and related articles into the HTML content
    const injectAdsAndRelated = (html: string) => {
        // Only inject ads if it's not localhost (matching AdScripts logic)
        const shouldInjectAds = typeof window !== 'undefined' && window.location.hostname !== 'localhost'

        const adHtml = `
            <div class="my-10 flex justify-center overflow-hidden w-full ad-injection">
                <div class="max-w-full overflow-x-auto">
                    <ins style="width: 728px;height:90px;display:block;margin:0 auto;" 
                         data-width="728" 
                         data-height="90" 
                         class="qeed48d325b" 
                         data-domain="//data527.click" 
                         data-affquery="/1b1bc0e9955c4dbdd935/eed48d325b/?placementName=default">
                         <script src="https://data527.click/js/responsive.js" async></script>
                    </ins>
                </div>
            </div>
        `

        const relatedArticlesHtml = `
            <div class="my-8 mx-auto max-w-4xl px-4">
                <div class="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-lg border-l-4 border-blue-500 shadow-md">
                    <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                        <span class="mr-2">📚</span>
                        You Might Also Like
                    </h3>
                    <div class="text-sm text-gray-600 dark:text-gray-400">
                        Loading related articles...
                    </div>
                </div>
            </div>
        `

        // Split by </p> to find paragraph breaks
        const paragraphs = html.split('</p>')

        // If there are very few paragraphs, don't inject inside
        if (paragraphs.length < 4) return html

        // Inject ad after 3rd paragraph (if ads enabled)
        if (shouldInjectAds) {
            paragraphs[2] = paragraphs[2] + '</p>' + adHtml
        }

        // Inject related articles around 40-50% through the content
        const relatedInjectionPoint = Math.floor(paragraphs.length * 0.45)
        if (relatedInjectionPoint > 2 && relatedInjectionPoint < paragraphs.length - 1) {
            paragraphs[relatedInjectionPoint] = paragraphs[relatedInjectionPoint] + '</p>' + relatedArticlesHtml
        }

        // If it's a long article (8+ paragraphs), inject another ad after 7th paragraph
        if (shouldInjectAds && paragraphs.length >= 8) {
            const adInjectionPoint = relatedInjectionPoint > 6 ? relatedInjectionPoint + 2 : 6
            if (adInjectionPoint < paragraphs.length - 1) {
                paragraphs[adInjectionPoint] = paragraphs[adInjectionPoint] + '</p>' + adHtml
            }
        }

        return paragraphs.join('</p>')
    }

    const contentWithAds = injectAdsAndRelated(content)

    return (
        <div
            ref={containerRef}
            className="article-content w-full m-0 p-0"
            dangerouslySetInnerHTML={{ __html: contentWithAds }}
        />
    )
}
