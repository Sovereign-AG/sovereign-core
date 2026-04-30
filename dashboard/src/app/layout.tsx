import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sovereign AG | The Root of Trust for the Agentic Economy",
  description: "A NIST-compliant Control Tower and permanent cryptographic registry for Autonomous AI Agents.",
  openGraph: {
    title: "Sovereign AG Control Tower",
    description: "Enterprise compliance and Identity Vault for AI Agents.",
    url: "https://sovereign-ag.com",
    siteName: "Sovereign AG",
    images: [
      {
        url: "/og-image.png", // Next.js standard public image lookup
        width: 1200,
        height: 630,
        alt: "Sovereign AG Secure Identity Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sovereign AG | Secure AI Infrastructure",
    description: "NIST compliance and Immutable Registry for AI applications.",
  }
};

import InstitutionalHeader from "@/components/InstitutionalHeader";
import InstitutionalFooter from "@/components/InstitutionalFooter";
import CookieConsent from "@/components/CookieConsent";
import CmdKPalette from "@/components/CmdKPalette";

const globalSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://sovereign-ag.ai/#organization",
      "name": "Sovereign AG",
      "url": "https://sovereign-ag.ai",
      "logo": "https://sovereign-ag.ai/logo.png",
      "description": "The Global Root of Trust for AI Agent Identity and Governance."
    },
    {
      "@type": "Service",
      "name": "Sovereign Governance Utility",
      "provider": { "@id": "https://sovereign-ag.ai/#organization" },
      "description": "A $0.01 per action tax-based verification service ensuring NIST-2026 compliance for autonomous agents."
    },
    {
      "@type": "WebPage",
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [".speakable-title", ".speakable-summary"]
      }
    }
  ]
};

import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background relative selection:bg-white/10">
        <Providers>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
          />
          
          {/* 1. Global Blueprint Grid (Institutional Architecture) */}
          <div 
            className="fixed inset-0 pointer-events-none z-0 opacity-[0.08]" 
            style={{ backgroundImage: 'linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }} 
          />
          
          {/* 2. Aurora Mesh Gradient (Subtle Volumetric Light) */}
          <div className="fixed -top-[20%] -right-[10%] w-[1000px] h-[1000px] rounded-full bg-gradient-to-br from-emerald-300/10 via-teal-200/5 to-blue-300/10 blur-[150px] pointer-events-none z-0" />
          
          <div className="relative z-10 flex flex-col min-h-full">
            <InstitutionalHeader />
            <CmdKPalette />
            <main className="flex-grow">
              {children}
            </main>
            <InstitutionalFooter />
            <CookieConsent />
          </div>

          {/* 3. Industrial Paper Noise (Top Layer, Lowest Opacity) */}
          <div 
            className="fixed inset-0 pointer-events-none z-[100] mix-blend-multiply opacity-[0.02]" 
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} 
          />
        </Providers>
      </body>
    </html>
  );
}
