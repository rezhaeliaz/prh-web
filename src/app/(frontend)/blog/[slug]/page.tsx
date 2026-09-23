import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cookies } from 'next/headers'
import type { Locale } from '@/lib/translations'
import { getPostBySlug, getPostsData } from '@/lib/cmsData'
import { BlogPostClient } from './BlogPostClient'

export const dynamic = 'force-dynamic'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const cookieStore = await cookies()
  const locale = (cookieStore.get('NEXT_LOCALE')?.value as Locale) || 'id'

  const post = await getPostBySlug(slug, locale)
  if (!post) {
    return {
      title: 'Artikel Tidak Ditemukan | Padjadjaran Suites Resort',
    }
  }

  return {
    title: `${post.title} | Padjadjaran Suites Resort Bogor`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  }
}

export async function generateStaticParams() {
  const posts = await getPostsData('id')
  return posts.map((p) => ({
    slug: p.slug,
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const cookieStore = await cookies()
  const locale = (cookieStore.get('NEXT_LOCALE')?.value as Locale) || 'id'

  const post = await getPostBySlug(slug, locale)
  if (!post) {
    notFound()
  }

  const allPosts = await getPostsData(locale)
  const relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 3)

  return <BlogPostClient post={post} relatedPosts={relatedPosts} locale={locale} />
}
