import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pickpoynt.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PickPoynt - Expert Gardening Tips & Plant Care",
    template: "%s | PickPoynt"
  },
  alternates: {
    canonical: './',
  },
  description: "Your go-to source for expert gardening tips, plant care guides, and landscaping inspiration. From indoor plants to outdoor gardens.",
  keywords: ["gardening", "plants", "plant care", "landscaping", "garden tips", "indoor plants"],
  authors: [{ name: "Devika Nanda" }],
  creator: "Devika Nanda",
  publisher: "Devika Nanda",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'PickPoynt',
    title: 'PickPoynt - Expert Gardening Tips & Plant Care',
    description: "Your go-to source for expert gardening tips, plant care guides, and landscaping inspiration.",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PickPoynt',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PickPoynt - Expert Gardening Tips & Plant Care',
    description: 'Discover amazing gardening tips and plant care inspiration. From indoor jungles to backyard oases, find your next project.',
    images: ['/og-image.png'],
    creator: '@pickpoynt',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

import { CookieConsent } from "@/components/CookieConsent";

import { AdScripts } from "@/components/AdScripts";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
          <CookieConsent />
        </AuthProvider>

        <AdScripts />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
