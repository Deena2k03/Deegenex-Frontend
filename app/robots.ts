import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin',      // Protects your admin dashboard
        '/api',        // Protects backend routes
        '/_next',      // Internal Next.js files
        '/private',    // Any other private folders
      ],
    },
    sitemap: 'https://www.deegenex.com/sitemap.xml',
  }
}
