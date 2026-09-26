import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const rawUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://ps.padjadjaransuitesresort.com'
  const baseUrl = rawUrl.includes('localhost') ? 'https://ps.padjadjaransuitesresort.com' : rawUrl

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/*', '/api/', '/api/*'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
