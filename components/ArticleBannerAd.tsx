'use client'

import { useEffect, useRef } from 'react'

export function ArticleBannerAd() {
    const adRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // If the ad script needs to be re-run on client-side navigation
        if (adRef.current) {
            const scripts = adRef.current.querySelectorAll('script')
            scripts.forEach((oldScript) => {
                const newScript = document.createElement('script')
                Array.from(oldScript.attributes).forEach((attr) => {
                    newScript.setAttribute(attr.name, attr.value)
                })
                newScript.appendChild(document.createTextNode(oldScript.innerHTML))
                oldScript.parentNode?.replaceChild(newScript, oldScript)
            })
        }
    }, [])

    return (
        <div className="my-8 flex justify-center overflow-hidden w-full">
            <div
                ref={adRef}
                className="max-w-full overflow-x-auto"
                dangerouslySetInnerHTML={{
                    __html: `
            <ins style="width: 728px;height:90px;display:block;margin:0 auto;" 
                 data-width="728" 
                 data-height="90" 
                 class="qeed48d325b" 
                 data-domain="//data527.click" 
                 data-affquery="/1b1bc0e9955c4dbdd935/eed48d325b/?placementName=default">
              <script src="//data527.click/js/responsive.js" async></script>
            </ins>
          `
                }}
            />
        </div>
    )
}
