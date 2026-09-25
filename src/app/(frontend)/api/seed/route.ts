import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import {
  ROOMS_DATA,
  DINING_DATA,
  EVENTS_DATA,
  FACILITIES_DATA,
  OFFERS_DATA_ID,
  OFFERS_DATA_EN,
  HOTEL_INFO,
} from '@/data/hotelData'

export async function GET() {
  try {
    const payload = await getPayload({ config })

    let adminCreated = false
    let roomsCreated = 0
    let diningCreated = 0
    let eventsCreated = 0
    let facilitiesCreated = 0
    let offersCreated = 0

    // 0. Seed Hotel Staff Admin User
    const hotelAdminEmail = process.env.ADMIN_INITIAL_EMAIL || 'admin@padjadjaransuitesresort.com'
    const existingHotelAdmin = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: hotelAdminEmail,
        },
      },
      limit: 1,
    })

    if (existingHotelAdmin.docs.length === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email: hotelAdminEmail,
          password: process.env.ADMIN_INITIAL_PASSWORD || 'Padjadjaran2026!',
          name: 'Staff Admin Padjadjaran Suites',
          role: 'admin',
        },
      })
      adminCreated = true
    }

    // 1. Seed Rooms
    for (const room of ROOMS_DATA) {
      const existing = await payload.find({
        collection: 'rooms',
        where: { slug: { equals: room.slug } },
        limit: 1,
      })

      if (existing.docs.length === 0) {
        await payload.create({
          collection: 'rooms',
          data: {
            name: room.name,
            slug: room.slug,
            category: room.category,
            tagline: room.tagline,
            size: room.size,
            bedType: room.bedType,
            capacity: room.capacity,
            basePrice: room.basePrice,
            discountPrice: room.discountPrice,
            imageUrl: room.featuredImage,
            virtualTourUrl: room.virtualTourUrl || '',
            isFeatured: true,
            amenities: room.amenities.map((a) => {
              const allowed = ['wifi', 'bed', 'tv', 'air-conditioning', 'shower', 'bath', 'mountain', 'balcony', 'coffee', 'fridge', 'safe', 'sofa', 'room-service']
              return {
                name: a.name,
                icon: (allowed.includes(a.icon) ? a.icon : 'wifi') as any,
              }
            }),
          },
        })
        roomsCreated++
      }
    }

    // 2. Seed Dining
    for (const item of DINING_DATA) {
      const existing = await payload.find({
        collection: 'dining',
        where: { slug: { equals: item.slug } },
        limit: 1,
      })

      if (existing.docs.length === 0) {
        const typeMap: Record<string, string> = {
          'hegarmanah-restaurant': 'outdoor',
          'bancakan-restaurant': 'indoor',
          'lobby-lounge': 'lounge',
        }

        await payload.create({
          collection: 'dining',
          data: {
            name: item.name,
            slug: item.slug,
            type: (typeMap[item.slug] as any) || 'indoor',
            cuisine: item.cuisine,
            tagline: item.tagline,
            openingHours: item.openingHours,
            capacity: item.capacity,
            imageUrl: item.featuredImage,
          },
        })
        diningCreated++
      }
    }

    // 3. Seed Events
    for (const event of EVENTS_DATA) {
      const existing = await payload.find({
        collection: 'events',
        where: { slug: { equals: event.slug } },
        limit: 1,
      })

      if (existing.docs.length === 0) {
        await payload.create({
          collection: 'events',
          data: {
            name: event.name,
            slug: event.slug,
            type: (event.slug === 'bale-pakuan-ballroom' ? 'ballroom' : event.slug === 'rancage-meeting-rooms' ? 'meeting-room' : 'wedding') as any,
            tagline: event.tagline,
            areaSize: event.areaSize,
            ceilingHeight: event.ceilingHeight,
            capacityMax: event.capacityMax,
            imageUrl: event.featuredImage,
            seatingLayouts: event.layouts.map((l) => ({
              style: (l.style.toLowerCase().includes('theatre') ? 'theatre' : l.style.toLowerCase().includes('banquet') ? 'banquet' : l.style.toLowerCase().includes('class') ? 'classroom' : 'u-shape') as any,
              capacity: l.capacity,
            })),
          },
        })
        eventsCreated++
      }
    }

    // 4. Seed Facilities
    for (const fac of FACILITIES_DATA) {
      const existing = await payload.find({
        collection: 'facilities',
        where: { slug: { equals: fac.slug } },
        limit: 1,
      })

      if (existing.docs.length === 0) {
        const catMap: Record<string, string> = {
          'swimming-pool': 'recreation',
          'bale-bale-spa': 'wellness',
          'fitness-center': 'wellness',
          'kids-playground': 'family',
        }

        await payload.create({
          collection: 'facilities',
          data: {
            name: fac.name,
            slug: fac.slug,
            category: (catMap[fac.slug] as any) || 'services',
            tagline: fac.tagline,
            openingHours: fac.openingHours,
            imageUrl: fac.featuredImage,
            isHighlight: true,
          },
        })
        facilitiesCreated++
      }
    }

    // 5. Seed Offers (Penawaran & Promo Resmi)
    for (let i = 0; i < OFFERS_DATA_ID.length; i++) {
      const offerId = OFFERS_DATA_ID[i]
      const offerEn = OFFERS_DATA_EN[i]

      const existing = await payload.find({
        collection: 'offers',
        where: { slug: { equals: offerId.slug } },
        limit: 1,
      })

      if (existing.docs.length === 0) {
        const created = await payload.create({
          collection: 'offers',
          locale: 'id',
          draft: false,
          data: {
            title: offerId.title,
            slug: offerId.slug,
            category: offerId.category,
            categoryLabel: offerId.categoryLabel,
            discountBadge: offerId.discountBadge,
            price: offerId.price,
            validUntilText: offerId.validUntil,
            shortDescription: offerId.shortDescription,
            inclusions: offerId.inclusions.map((item) => ({ item })),
            terms: offerId.terms.map((item) => ({ item })),
            imageUrl: offerId.featuredImage,
            ctaType: offerId.ctaType as any,
            ctaLink: offerId.ctaLink,
            ctaText: offerId.ctaText,
            order: i + 1,
            isActive: true,
            _status: 'published',
          },
        })

        if (created && offerEn) {
          await payload.update({
            collection: 'offers',
            id: created.id,
            locale: 'en',
            draft: false,
            data: {
              title: offerEn.title,
              categoryLabel: offerEn.categoryLabel,
              discountBadge: offerEn.discountBadge,
              price: offerEn.price,
              validUntilText: offerEn.validUntil,
              shortDescription: offerEn.shortDescription,
              inclusions: offerEn.inclusions.map((item) => ({ item })),
              terms: offerEn.terms.map((item) => ({ item })),
              ctaText: offerEn.ctaText,
            },
          })
        }
        offersCreated++
      }
    }

    // 6. Update Site Settings Global
    await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        hotelName: HOTEL_INFO.name,
        tagline: HOTEL_INFO.tagline,
        phone: HOTEL_INFO.phone,
        whatsapp: HOTEL_INFO.whatsapp,
        email: HOTEL_INFO.email,
        address: HOTEL_INFO.address,
        googleMapsUrl: HOTEL_INFO.googleMapsUrl,
        socialMedia: {
          instagram: HOTEL_INFO.social.instagram,
          facebook: HOTEL_INFO.social.facebook,
          tiktok: HOTEL_INFO.social.tiktok,
        },
      },
    })

    // 7. Update Footer Config Global (8 Tautan Lengkap)
    const quickLinksId = [
      { label: 'Tentang Padjadjaran Suites', href: '/about' },
      { label: 'Jurnal & Inspirasi Wisata', href: '/blog' },
      { label: 'Galeri Foto HD', href: '/gallery' },
      { label: 'Penawaran & Promo Spesial', href: '/offers' },
      { label: 'Cek Ketersediaan & Booking', href: '/booking' },
      { label: 'Lokasi & Kontak', href: '/contact' },
      { label: 'Aplikasi Android', href: 'https://play.google.com/store/apps/details?id=com.dip.padjadjaransuites' },
      { label: 'Portal Admin CMS', href: '/admin' },
    ]

    const quickLinksEn = [
      { label: 'About Our Heritage', href: '/about' },
      { label: 'Journal & Travel Stories', href: '/blog' },
      { label: 'Photo Gallery HD', href: '/gallery' },
      { label: 'Exclusive Offers & Packages', href: '/offers' },
      { label: 'Check Rates & Booking', href: '/booking' },
      { label: 'Location & Contact', href: '/contact' },
      { label: 'Android Mobile App', href: 'https://play.google.com/store/apps/details?id=com.dip.padjadjaransuites' },
      { label: 'CMS Admin Portal', href: '/admin' },
    ]

    const updatedFooterId = await payload.updateGlobal({
      slug: 'footer-config',
      locale: 'id',
      data: {
        aboutText:
          'Menghadirkan pesona resor menenangkan dengan fasilitas konvensi lengkap dan berkelas internasional di kawasan Bogor Nirwana Residence (BNR), Bogor, Jawa Barat.',
        copyrightText: '© 2026 Padjadjaran Suites Resort & Convention Hotel Bogor. All Rights Reserved.',
        quickLinks: quickLinksId,
      },
    })

    if (updatedFooterId?.quickLinks) {
      await payload.updateGlobal({
        slug: 'footer-config',
        locale: 'en',
        data: {
          aboutText:
            'Delivering the soothing charm of a resort with comprehensive international-standard convention facilities in the prestigious Bogor Nirwana Residence (BNR) area, Bogor, West Java.',
          copyrightText: '© 2026 Padjadjaran Suites Resort & Convention Hotel Bogor. All Rights Reserved.',
          quickLinks: updatedFooterId.quickLinks.map((item: any, idx: number) => ({
            id: item.id,
            label: quickLinksEn[idx]?.label || item.label,
            href: quickLinksEn[idx]?.href || item.href,
          })),
        },
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Database Padjadjaran Suites berhasil disemai (seeded)!',
      summary: {
        adminCreated,
        adminCredentials: adminCreated
          ? {
              email: process.env.ADMIN_INITIAL_EMAIL || 'admin@padjadjaransuites.com',
              password: process.env.ADMIN_INITIAL_PASSWORD || 'Padjadjaran2026!',
              role: 'admin',
              portalUrl: '/admin',
            }
          : 'Akun admin sudah ada sebelumnya.',
        roomsCreated,
        diningCreated,
        eventsCreated,
        facilitiesCreated,
        offersCreated,
        siteSettingsUpdated: true,
      },
    })
  } catch (error: any) {
    console.error('Seed error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Gagal melakukan seeding' },
      { status: 500 }
    )
  }
}
