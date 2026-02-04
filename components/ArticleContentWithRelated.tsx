'use client'

import { InArticleRelated } from './InArticleRelated'

interface ArticleContentWithRelatedProps {
    content: string
    articleId: string
    tags?: string[]
}

export function ArticleContentWithRelated({ content, articleId, tags = [] }: ArticleContentWithRelatedProps) {
    // Function to inject the InArticleRelated component in the middle of the content
    const injectRelatedArticles = (html: string) => {
        // Split by closing paragraph tags
        const paragraphs = html.split('</p>')

        // If there are fewer than 6 paragraphs, don't inject in the middle
        if (paragraphs.length < 6) {
            return html
        }

        // Calculate the middle point (around 40-50% through the article)
        const injectionPoint = Math.floor(paragraphs.length * 0.45)

        // Create a placeholder div that we'll replace with the React component
        const placeholder = `<div id="in-article-related-${articleId}" class="in-article-related-placeholder"></div>`

        // Insert the placeholder
        paragraphs[injectionPoint] = paragraphs[injectionPoint] + '</p>' + placeholder

        return paragraphs.join('</p>')
    }

    const contentWithPlaceholder = injectRelatedArticles(content)

    return (
        <>
            <div dangerouslySetInnerHTML={{ __html: contentWithPlaceholder }} />

            {/* This will be positioned using a portal-like approach */}
            <InArticleRelatedPortal articleId={articleId} tags={tags} />
        </>
    )
}

// Component to inject the InArticleRelated into the placeholder
function InArticleRelatedPortal({ articleId, tags }: { articleId: string; tags: string[] }) {
    return (
        <script
            dangerouslySetInnerHTML={{
                __html: `
          (function() {
            const placeholder = document.getElementById('in-article-related-${articleId}');
            if (placeholder) {
              // We'll render the component here using a different approach
              // For now, let's just add a simple HTML version
              placeholder.innerHTML = \`
                <div class="my-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-lg border-l-4 border-blue-500">
                  <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                    <span class="mr-2">📚</span>
                    Continue Reading
                  </h3>
                  <div id="related-articles-container-${articleId}"></div>
                </div>
              \`;
            }
          })();
        `,
            }}
        />
    )
}
