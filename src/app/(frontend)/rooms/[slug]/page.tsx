import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getRoomBySlug, getSiteSettingsData } from '@/lib/cmsData'
import { RoomDetailClient } from './RoomDetailClient'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const room = await getRoomBySlug(slug)

  if (!room) {
    return {
      title: 'Kamar Tidak Ditemukan | Padjadjaran Suites Resort Bogor',
    }
  }

  return {
    title: `${room.name} | Padjadjaran Suites Resort Bogor`,
    description: room.description ? room.description.slice(0, 160) : `${room.name} di Padjadjaran Suites Resort Bogor.`,
    openGraph: {
      title: `${room.name} | Padjadjaran Suites Resort Bogor`,
      description: room.tagline || room.description,
      images: [room.featuredImage],
    },
  }
}

import { cookies } from 'next/headers'
import type { Locale } from '@/lib/translations'

export default async function RoomDetailPage({ params }: PageProps) {
  const { slug } = await params
  const cookieStore = await cookies()
  const locale = (cookieStore.get('NEXT_LOCALE')?.value as Locale) || 'id'

  const [room, settings] = await Promise.all([
    getRoomBySlug(slug, locale),
    getSiteSettingsData(locale),
  ])

  if (!room) {
    notFound()
  }

  return <RoomDetailClient room={room} settings={settings} locale={locale} />
}
