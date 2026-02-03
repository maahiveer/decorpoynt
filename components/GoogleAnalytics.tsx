'use client'

import Script from 'next/script'
import { useEffect } from 'react'

export function GoogleAnalytics() {
    // Optional: You can still hide it on localhost if you want cleaner analytics
    useEffect(() => {
        if (window.location.hostname === 'localhost') {
            return
        }
    }, [])

    if (process.env.NODE_ENV === 'development') return null

    return (
        <>
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-E0JTRM3ZZ7"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-E0JTRM3ZZ7');
        `}
            </Script>
        </>
    )
}
