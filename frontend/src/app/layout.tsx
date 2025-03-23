import "./globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Providers } from "@/app/providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sovereign Ads - Privacy-First Advertising with Zero-Knowledge Proofs",
  description: "Engage with privacy-preserving advertisements powered by zero-knowledge proof technology. Earn rewards for your attention while maintaining complete privacy.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 text-slate-50 antialiased`}>
        <Providers>
          <div className="relative min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 pt-16">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
