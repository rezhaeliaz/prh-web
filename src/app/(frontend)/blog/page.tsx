import React from 'react'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import type { Locale } from '@/lib/translations'
import { getPostsData } from '@/lib/cmsData'
import { BlogClient } from './BlogClient'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Jurnal & Inspirasi Wisata Bogor | Padjadjaran Suites Resort',
  description:
    'Baca panduan wisata Bogor, inspirasi pernikahan di Bale Pakuan Grand Ballroom, tips MICE dan rapat kerja, serta sajian kuliner khas Sunda di Restoran Hegarmanah.',
  openGraph: {
    title: 'Jurnal & Panduan Wisata Bogor | Padjadjaran Suites Resort',
    description:
      'Inspirasi liburan keluarga, tips acara MICE, panduan pernikahan, dan kuliner otentik di kawasan Bogor Nirwana Residence (BNR).',
  },
}

export default async function BlogPage() {
  const cookieStore = await cookies()
  const locale = (cookieStore.get('NEXT_LOCALE')?.value as Locale) || 'id'

  const posts = await getPostsData(locale)

  return <BlogClient initialPosts={posts} locale={locale} />
}
