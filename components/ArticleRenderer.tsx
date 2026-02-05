'use client'

import { useEffect, useRef } from 'react'

import { InArticleRelated } from './InArticleRelated'

interface ArticleRendererProps {
    content: string
    articleId?: string
    tags?: string[]
}

export function ArticleRenderer({ content, articleId, tags }: ArticleRendererProps) {
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

    // Logic to split content and inject ads + related articles
    const renderContent = () => {
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

        // Split by </p> to get paragraphs (keep the delimiter)
        const parts = content.split('</p>').map(p => p + '</p>')

        // Remove the extra </p> from the last empty element if split created one
        if (parts[parts.length - 1] === '</p>') parts.pop()

        if (parts.length < 2) {
            return <div dangerouslySetInnerHTML={{ __html: content }} />
        }

        const elements: React.ReactNode[] = []
        let currentBlock = ''

        // Strategy:
        // 1. Accumulate HTML strings
        // 2. Push to elements array when we hit an injection point
        // 3. Push the injection component
        // 4. Reset accumulator

        const relatedInjectionIndex = Math.floor(parts.length * 0.45) // Middle
        const adInjectionIndex1 = 2 // After 3rd paragraph (index 2)
        const adInjectionIndex2 = 6 // After 7th paragraph (index 6)

        parts.forEach((part, index) => {
            currentBlock += part

            // Inject Ad 1
            if (shouldInjectAds && index === adInjectionIndex1) {
                currentBlock += adHtml
            }

            // Inject Related Articles Component
            if (articleId && index === relatedInjectionIndex) {
                // Push accumulated HTML
                elements.push(<div key={`block-${index}`} dangerouslySetInnerHTML={{ __html: currentBlock }} />)
                // Push React Component
                elements.push(
                    <div key="in-article-related" className="my-8">
                        <InArticleRelated currentArticleId={articleId} currentTags={tags} limit={2} />
                    </div>
                )
                // Reset accumulator
                currentBlock = ''
            }

            // Inject Ad 2
            if (shouldInjectAds && index === adInjectionIndex2 && parts.length >= 8) {
                currentBlock += adHtml
            }
        })

        // Push remaining content
        if (currentBlock) {
            elements.push(<div key="remaining" dangerouslySetInnerHTML={{ __html: currentBlock }} />)
        }

        return elements
    }

    return (
        <div
            ref={containerRef}
            className="article-content w-full m-0 p-0"
        >
            {renderContent()}
        </div>
    )
}
