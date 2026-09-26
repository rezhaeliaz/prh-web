import { MetadataRoute } from 'next'
import { ROOMS_DATA } from '@/data/hotelData'
import { getPostsData } from '@/lib/cmsData'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const rawUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://padjadjaransuitesresort.com'
  const baseUrl = rawUrl.includes('localhost') ? 'https://padjadjaransuitesresort.com' : rawUrl

  const staticRoutes = [
    '',
    '/about',
    '/rooms',
    '/dining',
    '/facilities',
    '/events',
    '/wedding',
    '/offers',
    '/gallery',
    '/virtual-tour',
    '/destination',
    '/contact',
    '/booking',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === '' ? 'daily' : route === '/rooms' || route === '/booking' ? 'weekly' : 'weekly') as
      | 'daily'
      | 'weekly'
      | 'monthly',
    priority: route === '' ? 1.0 : route === '/rooms' || route === '/booking' ? 0.9 : 0.8,
  }))

  const roomRoutes = ROOMS_DATA.map((room) => ({
    url: `${baseUrl}/rooms/${room.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  let blogRoutes: MetadataRoute.Sitemap = []
  try {
    const posts = await getPostsData('id')
    blogRoutes = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt || Date.now()),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  } catch {
    // fallback if CMS not ready
  }

  return [...staticRoutes, ...roomRoutes, ...blogRoutes]
}
