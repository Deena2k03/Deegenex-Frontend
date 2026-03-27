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

export const metadata: Metadata = {
  // 1. IMPROVED TITLE: Putting keywords first helps match the "Box of Tech" style
  title: "Best Software Development Company in Salem | Deegenex",
  description: "Deegenex offers premium Web Development, Mobile App Development, and Digital Marketing in Salem and Hosur. Expert Fullstack and Software solutions for your business.",
  keywords: [
    "Deegenex", 
    "IT Company in Salem", 
    "Web Development Hosur", 
    "Software Development Company Salem", 
    "Mobile App Development Hosur", 
    "Digital Marketing Agency Salem", 
    "Fullstack Developers Tamil Nadu", 
    "UI UX Design Salem"
  ],
  metadataBase: new URL("https://www.deegenex.com"),
  alternates: {
    canonical: "/",
  },
  // 2. ICON FIX: Ensure you have a 512x512px icon.png in your /public folder
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Deegenex | Innovative IT & Software Solutions",
    description: "Expert Web & Mobile App Development services in Salem and Hosur.",
    url: "https://www.deegenex.com",
    siteName: "Deegenex", // Crucial for Brand identity
    locale: "en_US",
    type: "website",
  },
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 3. MULTI-SCHEMA: Adding WebSite schema specifically fixes the "Unknown Link" name
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Deegenex",
      "url": "https://www.deegenex.com",
      "alternateName": ["DeeGenex", "Deegenex IT Solutions"]
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareCompany", // Changed from ProfessionalService to match "Tech" niche
      "name": "Deegenex",
      "url": "https://www.deegenex.com",
      "telephone": "+916382141468",
      "priceRange": "$$",
      "address": {
          "@type": "PostalAddress",
          "streetAddress": "4/55,33, NGGO's Colony, First Cross, Bagalur Road",
          "addressLocality": "Hosur",
          "addressRegion": "Tamil Nadu",
          "postalCode": "635109",
          "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "12.7409",
        "longitude": "77.8253"
      },
      "sameAs": [
        "https://www.linkedin.com/company/deegenex/",
        "https://www.instagram.com/deegenex/"
      ]
    }
  ];

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <meta 
          name="norton-safeweb-site-verification" 
          content="GVKJO6W3BL9Y9Y49PJ3WSYM6E5A32702O9XI4UY-2IQT0LHEFEFQMCUWZU1QPGYJPTM-I7A-PJ1FKU4Z4Q640DKEMVIDZPKHBKJ-0DP15L109C9Y7CUA029BYZ9BHO5XW" 
        />
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
