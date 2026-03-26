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
  title: "Deegenex | #1 IT Company in Salem & Hosur | Web & App Development",
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
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Deegenex | Innovative IT & Software Solutions",
    description: "Expert Web & Mobile App Development services in Salem and Hosur. Building the future of IT.",
    url: "https://www.deegenex.com",
    siteName: "Deegenex",
    images: [
      {
        url: "/og-image.png", // Ensure you have an OG image for social sharing
        width: 1200,
        height: 630,
      },
    ],
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
  // Advanced JSON-LD for Local SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Deegenex",
    "image": "https://www.deegenex.com/logo.png",
    "url": "https://www.deegenex.com",
    "telephone": "+916382141468",
    "priceRange": "$$",
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
    "geo": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "11.6643",
        "longitude": "78.1460"
      },
      "description": "Serving Salem, Hosur, and surrounding areas in Tamil Nadu"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.linkedin.com/company/deegenex/", // Add your actual social links
      "https://www.instagram.com/deegenex/"
    ]
  };

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
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
