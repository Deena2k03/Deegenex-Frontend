import "./globals.css";
import { Inter } from "next/font/google";
import LayoutWrapper from "./LayoutWrapper";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

// 1. Enhanced SEO Metadata
export const metadata: Metadata = {
  title: "Deegenex | Best IT Company in Salem & Hosur",
  description: "Deegenex provides expert Web Development, Mobile App Development, Digital Marketing, and Fullstack Software solutions in Salem and Hosur. Intelligence for a Better Future.",
  keywords: [
    "Deegenex", "IT Company Salem", "Web Development Hosur", 
    "Mobile App Development", "Digital Marketing Salem", 
    "Software Development", "Fullstack Development", "E-commerce Site Development"
  ],
  metadataBase: new URL("https://www.deegenex.com"), // Change to your actual domain
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Deegenex | Innovative Software Solutions",
    description: "Expert IT solutions including Web & Mobile App Development in Salem and Hosur.",
    url: "https://www.deegenex.com",
    siteName: "Deegenex",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 2. Local Business Schema (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Deegenex",
    "image": "https://www.deegenex.com/logo.png", // Replace with your logo path
    "url": "https://www.deegenex.com",
    "telephone": "+91-6382141468", // Add your real number here
    "address": [
      {
        "@type": "PostalAddress",
        "addressLocality": "Salem",
        "addressRegion": "Tamil Nadu",
        "addressCountry": "IN"
      },
      {
        "@type": "PostalAddress",
        "addressLocality": "Hosur",
        "addressRegion": "Tamil Nadu",
        "addressCountry": "IN"
      }
    ],
    "services": [
      "Web Development",
      "Mobile App Development",
      "Digital Marketing",
      "Fullstack Development",
      "E-commerce Site Development"
    ]
  };

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* 3. Injecting the Schema for Search Engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}