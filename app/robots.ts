import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin',      // Keeps your admin dashboard out of Google
        '/api',        // Keeps your backend API routes private
        '/_next',      // Standard Next.js internal folder
      ],
    },
    sitemap: 'https://www.deegenex.com/sitemap.xml',
  }
}