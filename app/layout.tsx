import type { Metadata, Viewport } from "next"
import { ClerkProvider } from "@clerk/nextjs"

import { Toaster } from "@/components/ui/toaster"

import "../styles/globals.css"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "Avis - Istanbul Airport Car Rental",
    template: `%s - Avis Istanbul Airport`,
  },
  description: "Reliable car rental service from Istanbul Airport. No credit card required.",
  authors: {
    name: siteConfig.author.name,
    url: siteConfig.author.url,
  },
  creator: siteConfig.author.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: "Avis - Istanbul Airport Car Rental",
    description: "Reliable car rental service from Istanbul Airport",
    siteName: "Avis Istanbul Airport",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/manifest.webmanifest`,
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className={fontSans.variable}>
        <body className="flex min-h-screen flex-col">
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
