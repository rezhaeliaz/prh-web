import configPromise from '@payload-config'
import { getPayload } from 'payload'
import {
  HOTEL_INFO,
  ROOMS_DATA,
  DINING_DATA,
  EVENTS_DATA,
  FACILITIES_DATA,
  OFFERS_DATA_ID,
  OFFERS_DATA_EN,
  RoomItem,
  DiningItem,
  EventItem,
  FacilityItem,
  OfferItem,
} from '@/data/hotelData'
import { getDestinationsData, DestinationItem, CuratedItinerary } from '@/data/destinationsData'

/**
 * 1. Fetch Site Settings (Kontak, Alamat, Medsos, Logo) dari Payload CMS
 */
export async function getSiteSettingsData(locale: 'id' | 'en' = 'id') {
  try {
    const payload = await getPayload({ config: configPromise })
    const settings = await payload.findGlobal({ slug: 'site-settings', locale })

    if (settings) {
      let logoUrl: string | null = null
      if (settings.logo && typeof settings.logo === 'object' && 'url' in settings.logo) {
        logoUrl = (settings.logo.url as string) || null
      }

      let logoWhiteUrl: string | null = null
      if (settings.logoWhite && typeof settings.logoWhite === 'object' && 'url' in settings.logoWhite) {
        logoWhiteUrl = (settings.logoWhite.url as string) || null
      }

      const cleanWa = (settings.whatsapp || HOTEL_INFO.whatsapp).replace(/[^0-9]/g, '')
      const waText =
        locale === 'en'
          ? 'Hello%20Padjadjaran%20Suites,%20I%20would%20like%20to%20inquire%20about%20reservations'
          : 'Halo%20Padjadjaran%20Suites,%20saya%20ingin%20tanya%20reservasi'

      return {
        name: settings.hotelName || HOTEL_INFO.name,
        shortName: HOTEL_INFO.shortName,
        tagline:
          settings.tagline ||
          (locale === 'en'
            ? 'Where Luxury Meets Serene Mountain Views'
            : 'Dimana Kemewahan Menyatu dengan Keindahan Alam'),
        phone: settings.phone || HOTEL_INFO.phone,
        whatsapp: settings.whatsapp || HOTEL_INFO.whatsapp,
        whatsappUrl: `https://wa.me/${cleanWa}?text=${waText}`,
        email: settings.email || HOTEL_INFO.email,
        address: settings.address || HOTEL_INFO.address,
        googleMapsUrl: settings.googleMapsUrl || HOTEL_INFO.googleMapsUrl,
        social: {
          instagram: settings.socialMedia?.instagram || HOTEL_INFO.social.instagram,
          facebook: settings.socialMedia?.facebook || HOTEL_INFO.social.facebook,
          tiktok: settings.socialMedia?.tiktok || HOTEL_INFO.social.tiktok,
        },
        logoUrl: logoUrl ? logoUrl.replace(/ /g, '%20') : '/logo-padjadjaran.png',
        logoWhiteUrl: logoWhiteUrl ? logoWhiteUrl.replace(/ /g, '%20') : '/logo-padjadjaran.png',
        bookingEngineType: settings.bookingConfig?.engineType || 'third-party',
        thirdPartyBookingUrl:
          settings.bookingConfig?.thirdPartyUrl ||
          'https://be.dip.id/booking/cekrooms?keyid=9de3264a0298106659401228618ea286',
      }
    }
  } catch (err) {
    console.warn('[CMS Data] Fallback SiteSettings to static data:', err)
  }

  return {
    ...HOTEL_INFO,
    logoUrl: '/logo-padjadjaran.png',
    logoWhiteUrl: '/logo-padjadjaran.png',
    bookingEngineType: 'third-party',
    thirdPartyBookingUrl: 'https://be.dip.id/booking/cekrooms?keyid=9de3264a0298106659401228618ea286',
  }
}

/**
 * Smart Booking Engine URL builder
 * Handles third-party (DIP Engine), internal wizard (/booking), or WhatsApp Concierge
 */
export function buildBookingUrl(
  params?: {
    checkIn?: string
    checkOut?: string
    adults?: number | string
    room?: string
  },
  settings?: {
    bookingEngineType?: string
    thirdPartyBookingUrl?: string
    whatsappUrl?: string
  }
): string {
  const engineType = settings?.bookingEngineType || 'third-party'
  const thirdPartyBase =
    settings?.thirdPartyBookingUrl ||
    'https://be.dip.id/booking/cekrooms?keyid=9de3264a0298106659401228618ea286'

  if (engineType === 'third-party') {
    try {
      const url = new URL(thirdPartyBase)
      if (params?.checkIn) url.searchParams.set('checkin', params.checkIn)
      if (params?.checkOut) url.searchParams.set('checkout', params.checkOut)
      if (params?.adults) url.searchParams.set('adults', String(params.adults))
      return url.toString()
    } catch {
      return thirdPartyBase
    }
  }

  if (engineType === 'whatsapp') {
    return settings?.whatsappUrl || 'https://wa.me/6285183093061'
  }

  const query = new URLSearchParams()
  if (params?.room) query.set('room', params.room)
  if (params?.checkIn) query.set('checkIn', params.checkIn)
  if (params?.checkOut) query.set('checkOut', params.checkOut)
  if (params?.adults) query.set('guests', String(params.adults))
  const qs = query.toString()
  return `/booking${qs ? `?${qs}` : ''}`
}

/**
 * 2. Fetch Kamar & Suites dari Payload CMS
 */
export async function getRoomsData(locale: 'id' | 'en' = 'id'): Promise<RoomItem[]> {
  try {
    const payload = await getPayload({ config: configPromise })
    const res = await payload.find({
      collection: 'rooms',
      sort: 'order',
      depth: 1,
      locale,
      overrideAccess: true,
    })

    if (res.docs && res.docs.length > 0) {
      return res.docs.map((doc: any) => {
        // Find matching fallback for rich gallery / highlights if not filled
        const fallback = ROOMS_DATA.find((r) => r.slug === doc.slug)

        // Resolve Image
        let featuredImage = doc.imageUrl || fallback?.featuredImage || ''
        if (doc.featuredImage && typeof doc.featuredImage === 'object' && doc.featuredImage.url) {
          featuredImage = doc.featuredImage.url
        }

        // Resolve Gallery
        let gallery: string[] = fallback?.gallery || [featuredImage]
        if (doc.gallery && Array.isArray(doc.gallery) && doc.gallery.length > 0) {
          const cmsGallery = doc.gallery
            .map((g: any) => (typeof g.image === 'object' ? g.image?.url : null))
            .filter(Boolean)
          if (cmsGallery.length > 0) gallery = cmsGallery
        }

        // Resolve Description
        let description = fallback?.description || ''
        if (typeof doc.description === 'string' && doc.description.trim().length > 0) {
          description = doc.description
        } else if (doc.description && doc.description.root) {
          // Simple extract from Lexical JSON
          try {
            const textNodes = JSON.stringify(doc.description)
            const extracted = textNodes.match(/"text":"([^"]+)"/g)
            if (extracted) {
              description = extracted.map((m) => m.replace(/"text":"|"/g, '')).join(' ')
            }
          } catch {}
        }

        // Fallback English descriptions & taglines if locale is 'en' and CMS returned Indonesian fallback
        let tagline = doc.tagline || fallback?.tagline || ''
        if (locale === 'en') {
          if (doc.category === 'royal-suite') {
            tagline = 'The pinnacle of five-star luxury with private living room and panoramic views'
            if (!description || description.includes('kamar') || description.includes('Nikmati')) {
              description =
                'Experience unparalleled luxury in our Royal Suite. Featuring 54 square meters of lavish space, private executive lounge area, marble bathroom, and breathtaking panoramic views of Mount Salak and Bogor city.'
            }
          } else if (doc.category === 'executive') {
            tagline = 'Spacious 33 m² comfort tailored for business executives and family getaways'
            if (!description || description.includes('kamar') || description.includes('Nikmati')) {
              description =
                'Our Executive Room provides a spacious 33 m² sanctuary with dedicated ergonomic work space, high-speed Wi-Fi, and plush bedding designed for discerning travelers and busy executives.'
            }
          } else {
            tagline = 'Modern tranquil retreat in the heart of Bogor Nirwana Residence'
            if (!description || description.includes('kamar') || description.includes('Nikmati')) {
              description =
                'Enjoy contemporary minimalist elegance, crisp mountain air, and restorative sleep in our 22 m² Superior Room, available in comfortable King Double or Twin bed setups.'
            }
          }
        }

        const badge =
          doc.category === 'royal-suite'
            ? locale === 'en'
              ? 'Most Luxurious'
              : 'Paling Mewah'
            : doc.category === 'executive'
            ? locale === 'en'
              ? 'Business Favorite'
              : 'Favorit Bisnis'
            : locale === 'en'
            ? 'Most Popular'
            : 'Paling Populer'

        const highlights =
          locale === 'en'
            ? [
                'Scenic Views of Mount Salak & Bogor City',
                'Daily Housekeeping Service',
                'Complimentary High-Speed Wi-Fi',
                'Resort Swimming Pool Access',
              ]
            : fallback?.highlights || [
                'Pemandangan Asri Gunung Salak / Kota Bogor',
                'Layanan Kebersihan Kamar Harian',
                'Wi-Fi Kecepatan Tinggi Gratis',
                'Akses Kolam Renang Resor',
              ]

        const bedType =
          locale === 'en'
            ? doc.bedType?.includes('Twin')
              ? 'King Double or Twin Beds'
              : 'King Bed'
            : doc.bedType || fallback?.bedType || 'King Bed'

        return {
          id: doc.slug || String(doc.id),
          slug: doc.slug,
          name: doc.name,
          category: doc.category || 'superior',
          badge,
          size: doc.size || fallback?.size || 22,
          bedType,
          capacity: doc.capacity || fallback?.capacity || 2,
          basePrice: doc.basePrice || fallback?.basePrice || 450000,
          discountPrice: doc.discountPrice || fallback?.discountPrice,
          tagline,
          description,
          featuredImage,
          gallery,
          amenities:
            doc.amenities && doc.amenities.length > 0
              ? doc.amenities.map((a: any) => ({ name: a.name, icon: a.icon || 'wifi' }))
              : fallback?.amenities || [],
          highlights,
          virtualTourUrl: doc.virtualTourUrl || fallback?.virtualTourUrl || '#virtual-tour',
        }
      })
    }
  } catch (err) {
    console.warn('[CMS Data] Fallback Rooms to static data:', err)
  }

  return ROOMS_DATA
}

/**
 * 3. Fetch Kamar Tunggal Berdasarkan Slug
 */
export async function getRoomBySlug(slug: string, locale: 'id' | 'en' = 'id'): Promise<RoomItem | null> {
  const allRooms = await getRoomsData(locale)
  const found = allRooms.find((r) => r.slug === slug)
  return found || null
}

/**
 * 4. Fetch Restoran & Lounge dari Payload CMS
 */
export async function getDiningData(locale: 'id' | 'en' = 'id'): Promise<DiningItem[]> {
  try {
    const payload = await getPayload({ config: configPromise })
    const res = await payload.find({
      collection: 'dining',
      sort: 'order',
      depth: 1,
      locale,
      overrideAccess: true,
    })

    if (res.docs && res.docs.length > 0) {
      return res.docs.map((doc: any) => {
        const fallback = DINING_DATA.find((d) => d.slug === doc.slug)

        let featuredImage = doc.imageUrl || fallback?.featuredImage || ''
        if (doc.featuredImage && typeof doc.featuredImage === 'object' && doc.featuredImage.url) {
          featuredImage = doc.featuredImage.url
        }

        let description = fallback?.description || ''
        if (typeof doc.description === 'string' && doc.description.trim().length > 0) {
          description = doc.description
        }

        let type =
          doc.type === 'outdoor'
            ? locale === 'en'
              ? 'Semi-Outdoor / Scenic Dining'
              : 'Area Terbuka / Semi-Outdoor'
            : doc.type === 'lounge'
            ? 'Lounge & Bar'
            : locale === 'en'
            ? 'Indoor / Fine Casual'
            : 'Dalam Ruangan / Fine Casual'

        let cuisine =
          doc.cuisine ||
          (locale === 'en' ? 'Authentic Sundanese & International Cuisine' : 'Masakan Nusantara & Internasional')

        let capacity =
          doc.capacity || (locale === 'en' ? '150 Seats' : '150 Kursi')

        let specialties =
          locale === 'en'
            ? ['Authentic Sundanese Nasi Timbel', 'Chef Signature Gurame Terbang', 'Barista Specialty Coffee', 'Tropical Mocktails']
            : fallback?.specialties || ['Nasi Timbel Komplit', 'Gurame Terbang Saus Padjadjaran', 'Kopi Khas Barista', 'Tropical Mocktail Segar']

        return {
          id: doc.slug || String(doc.id),
          slug: doc.slug,
          name: doc.name,
          type,
          cuisine,
          openingHours: doc.openingHours || fallback?.openingHours || '06:00 - 22:00 WIB',
          capacity,
          tagline: doc.tagline || fallback?.tagline || '',
          description,
          featuredImage,
          gallery: fallback?.gallery || [featuredImage],
          specialties,
        }
      })
    }
  } catch (err) {
    console.warn('[CMS Data] Fallback Dining to static data:', err)
  }

  return DINING_DATA
}

/**
 * 5. Fetch Venue Acara & MICE dari Payload CMS
 */
export async function getEventsData(locale: 'id' | 'en' = 'id'): Promise<EventItem[]> {
  try {
    const payload = await getPayload({ config: configPromise })
    const res = await payload.find({
      collection: 'events',
      sort: 'order',
      depth: 1,
      locale,
      overrideAccess: true,
    })

    if (res.docs && res.docs.length > 0) {
      return res.docs.map((doc: any) => {
        const fallback = EVENTS_DATA.find((e) => e.slug === doc.slug)

        let featuredImage = doc.imageUrl || fallback?.featuredImage || ''
        if (doc.featuredImage && typeof doc.featuredImage === 'object' && doc.featuredImage.url) {
          featuredImage = doc.featuredImage.url
        }

        let description = fallback?.description || ''
        if (typeof doc.description === 'string' && doc.description.trim().length > 0) {
          description = doc.description
        }

        const layouts =
          doc.seatingLayouts && doc.seatingLayouts.length > 0
            ? doc.seatingLayouts.map((l: any) => ({
                style:
                  l.style === 'theatre'
                    ? 'Theatre Style'
                    : l.style === 'classroom'
                    ? 'Classroom Style'
                    : l.style === 'banquet'
                    ? 'Round Table (Banquet)'
                    : 'U-Shape Style',
                capacity: l.capacity,
              }))
            : fallback?.layouts || []

        const features =
          locale === 'en'
            ? ['Integrated Sound System', 'Stage & Ambient Lighting', 'High-Definition Projectors', 'High-Speed Wi-Fi']
            : fallback?.features || ['Sound System Lengkap', 'Lighting Panggung', 'Proyektor Resolusi Tinggi']

        return {
          id: doc.slug || String(doc.id),
          slug: doc.slug,
          name: doc.name,
          type:
            doc.type === 'ballroom'
              ? 'Grand Ballroom'
              : doc.type === 'meeting-room'
              ? 'Meeting Room'
              : 'Wedding Package',
          areaSize: doc.areaSize || fallback?.areaSize || '1.200 m²',
          ceilingHeight: doc.ceilingHeight || fallback?.ceilingHeight || (locale === 'en' ? '7 Meters' : '7 Meter'),
          capacityMax: doc.capacityMax || fallback?.capacityMax || 1000,
          tagline: doc.tagline || fallback?.tagline || '',
          description,
          featuredImage,
          gallery: fallback?.gallery || [featuredImage],
          layouts,
          features,
        }
      })
    }
  } catch (err) {
    console.warn('[CMS Data] Fallback Events to static data:', err)
  }

  return EVENTS_DATA
}

/**
 * 6. Fetch Fasilitas Resor dari Payload CMS
 */
export async function getFacilitiesData(locale: 'id' | 'en' = 'id'): Promise<FacilityItem[]> {
  try {
    const payload = await getPayload({ config: configPromise })
    const res = await payload.find({
      collection: 'facilities',
      sort: 'order',
      depth: 1,
      locale,
      overrideAccess: true,
    })

    if (res.docs && res.docs.length > 0) {
      return res.docs.map((doc: any) => {
        const fallback = FACILITIES_DATA.find((f) => f.slug === doc.slug)

        let featuredImage = doc.imageUrl || fallback?.featuredImage || ''
        if (doc.featuredImage && typeof doc.featuredImage === 'object' && doc.featuredImage.url) {
          featuredImage = doc.featuredImage.url
        }

        let description = fallback?.description || ''
        if (typeof doc.description === 'string' && doc.description.trim().length > 0) {
          description = doc.description
        }

        const features =
          locale === 'en'
            ? ['Five-Star Hospitality Standards', 'Scenic Resort Environment', 'Complimentary for Hotel Guests']
            : fallback?.features || ['Fasilitas Berstandar Bintang 5', 'Pemandangan Asri']

        return {
          id: doc.slug || String(doc.id),
          slug: doc.slug,
          name: doc.name,
          category: doc.category || 'recreation',
          openingHours: doc.openingHours || fallback?.openingHours || '06:00 - 20:00 WIB',
          tagline: doc.tagline || fallback?.tagline || '',
          description,
          featuredImage,
          features,
        }
      })
    }
  } catch (err) {
    console.warn('[CMS Data] Fallback Facilities to static data:', err)
  }

  return FACILITIES_DATA
}

/**
 * 7. Fetch Navigasi Header dari Payload CMS Global 'header-config'
 */
export async function getHeaderConfigData(locale: 'id' | 'en' = 'id') {
  const defaultNavItemsId = [
    { label: 'Kamar & Suites', href: '/rooms' },
    { label: 'Restoran', href: '/dining' },
    {
      label: 'Pertemuan & Acara',
      href: '/events',
      subItems: [
        {
          label: 'MICE & Ruang Rapat',
          href: '/events',
          description: 'Ruang pertemuan modern & paket meeting bisnis',
        },
        {
          label: 'Wedding & Perayaan',
          href: '/wedding',
          description: 'Pernikahan impian di Bale Pakuan Grand Ballroom',
        },
        {
          label: 'MICE Event Planner',
          href: '/events#planner',
          description: 'Kalkulator layout, kapasitas & estimasi acara',
        },
      ],
    },
    {
      label: 'Pengalaman & Fasilitas',
      href: '/facilities',
      subItems: [
        {
          label: 'Fasilitas Hotel',
          href: '/facilities',
          description: 'Kolam renang, spa, fitness center & lounge',
        },
        {
          label: 'Wisata Sekitar Bogor',
          href: '/destination',
          description: 'Panduan destinasi populer di dekat hotel',
        },
        {
          label: 'Galeri Foto HD',
          href: '/gallery',
          description: 'Dokumentasi visual keindahan dan suasana hotel',
        },
        {
          label: 'Jurnal & Inspirasi',
          href: '/blog',
          description: 'Artikel wisata Bogor & inspirasi acara',
        },
        {
          label: 'Tentang Kami',
          href: '/about',
          description: 'Kisah & warisan keramahan luhur Sunda',
        },
        {
          label: 'Virtual Tour 360°',
          href: '/virtual-tour',
          description: 'Eksplorasi virtual interaktif seluruh area resor',
        },
      ],
    },
    { label: 'Penawaran', href: '/offers' },
    { label: 'Kontak', href: '/contact' },
  ]

  const defaultNavItemsEn = [
    { label: 'Rooms & Suites', href: '/rooms' },
    { label: 'Dining', href: '/dining' },
    {
      label: 'Events & Meetings',
      href: '/events',
      subItems: [
        {
          label: 'MICE & Meeting Rooms',
          href: '/events',
          description: 'Modern venues & corporate business packages',
        },
        {
          label: 'Weddings & Celebrations',
          href: '/wedding',
          description: 'Dream weddings at Bale Pakuan Grand Ballroom',
        },
        {
          label: 'MICE Event Planner',
          href: '/events#planner',
          description: 'Interactive layout & capacity estimator',
        },
      ],
    },
    {
      label: 'Experience & Facilities',
      href: '/facilities',
      subItems: [
        {
          label: 'Resort Facilities',
          href: '/facilities',
          description: 'Swimming pool, spa, fitness center & lounge',
        },
        {
          label: 'Bogor Destinations',
          href: '/destination',
          description: 'Explore popular tourist spots around the hotel',
        },
        {
          label: 'Photo Gallery HD',
          href: '/gallery',
          description: 'Visual showcase of rooms, dining & spaces',
        },
        {
          label: 'Journal & Stories',
          href: '/blog',
          description: 'Travel guides & hospitality stories',
        },
        {
          label: 'About Our Heritage',
          href: '/about',
          description: 'The story and philosophy of our resort',
        },
        {
          label: '360° Virtual Tour',
          href: '/virtual-tour',
          description: 'Interactive virtual walkthrough of all areas',
        },
      ],
    },
    { label: 'Special Offers', href: '/offers' },
    { label: 'Contact', href: '/contact' },
  ]

  const defaultNavItems = locale === 'en' ? defaultNavItemsEn : defaultNavItemsId

  try {
    const payload = await getPayload({ config: configPromise })
    const config = await payload.findGlobal({ slug: 'header-config', locale })

    if (config) {
      let navItems = defaultNavItems
      if (config.navItems && Array.isArray(config.navItems) && config.navItems.length > 0) {
        navItems = config.navItems.map((item: any) => ({
          label: item.label,
          href: item.href,
          subItems: item.subItems && Array.isArray(item.subItems) && item.subItems.length > 0
            ? item.subItems.map((s: any) => ({
                label: s.label,
                href: s.href,
                description: s.description || undefined,
              }))
            : undefined,
        }))
      }

      let bookButtonText = config.bookButtonText || (locale === 'en' ? 'Book Now' : 'Pesan Kamar')
      if (locale === 'en' && (bookButtonText === 'Pesan Sekarang' || bookButtonText === 'Pesan Kamar')) {
        bookButtonText = 'Book Now'
      }

      return {
        navItems,
        bookButtonText,
      }
    }
  } catch (err) {
    console.warn('[CMS Data] Fallback HeaderConfig to static data:', err)
  }

  return {
    navItems: defaultNavItems,
    bookButtonText: locale === 'en' ? 'Book Now' : 'Pesan Kamar',
  }
}

/**
 * 8. Fetch Konfigurasi Footer dari Payload CMS Global 'footer-config'
 */
export async function getFooterConfigData(locale: 'id' | 'en' = 'id') {
  const defaultQuickLinks =
    locale === 'en'
      ? [
          { label: 'Exclusive Offers & Packages', href: '/offers' },
          { label: 'Check Availability & Booking', href: '/booking' },
          { label: 'Location & Contact', href: '/contact' },
          { label: 'Android Mobile App', href: 'https://play.google.com/store/apps/details?id=com.dip.padjadjaransuites' },
          { label: 'CMS Admin Portal', href: '/admin' },
        ]
      : [
          { label: 'Penawaran & Promo Spesial', href: '/offers' },
          { label: 'Cek Ketersediaan & Booking', href: '/booking' },
          { label: 'Lokasi & Kontak', href: '/contact' },
          { label: 'Aplikasi Android', href: 'https://play.google.com/store/apps/details?id=com.dip.padjadjaransuites' },
          { label: 'Portal Admin CMS', href: '/admin' },
        ]

  const defaultAboutText =
    locale === 'en'
      ? 'Delivering the soothing charm of a resort with comprehensive international-standard convention facilities in the prestigious Bogor Nirwana Residence (BNR) area, Bogor, West Java.'
      : 'Menghadirkan pesona resor menenangkan dengan fasilitas konvensi lengkap dan berkelas internasional di kawasan Bogor Nirwana Residence (BNR), Bogor, Jawa Barat.'

  const defaultCopyright = '© 2026 Padjadjaran Suites Resort & Convention Hotel Bogor. All Rights Reserved.'

  try {
    const payload = await getPayload({ config: configPromise })
    const config = await payload.findGlobal({ slug: 'footer-config', locale })

    if (config) {
      let quickLinks = defaultQuickLinks
      if (config.quickLinks && Array.isArray(config.quickLinks) && config.quickLinks.length > 0) {
        quickLinks = config.quickLinks.map((item: any) => ({
          label: item.label,
          href: item.href,
        }))
      }

      return {
        aboutText: config.aboutText || defaultAboutText,
        copyrightText: config.copyrightText || defaultCopyright,
        quickLinks,
      }
    }
  } catch (err) {
    console.warn('[CMS Data] Fallback FooterConfig to static data:', err)
  }

  return {
    aboutText: defaultAboutText,
    copyrightText: defaultCopyright,
    quickLinks: defaultQuickLinks,
  }
}

/**
 * 9. Fetch Popup Promo dari Payload CMS Global 'popups'
 */
export async function getPopupData(locale: 'id' | 'en' = 'id') {
  try {
    const payload = await getPayload({ config: configPromise })
    const popup = await payload.findGlobal({ slug: 'popups', locale })

    if (popup && popup.isEnabled) {
      let imageUrl: string | null = null
      if (popup.image && typeof popup.image === 'object' && 'url' in popup.image) {
        imageUrl = (popup.image.url as string) || null
      }

      return {
        isEnabled: Boolean(popup.isEnabled),
        title: popup.title || (locale === 'en' ? 'Special Offers & Packages' : 'Penawaran Spesial Padjadjaran Suites'),
        content: popup.content || '',
        imageUrl,
        buttonText: popup.buttonText || (locale === 'en' ? 'View Offer' : 'Lihat Promo'),
        buttonLink: popup.buttonLink || '/offers',
      }
    }
  } catch (err) {
    console.warn('[CMS Data] Fallback Popups to null:', err)
  }

  return {
    isEnabled: false,
    title: '',
    content: '',
    imageUrl: null,
    buttonText: '',
    buttonLink: '',
  }
}

/**
 * 10. Fetch Ulasan Tamu dari Payload CMS Collection 'reviews'
 */
export async function getReviewsData(locale: 'id' | 'en' = 'id') {
  const fallbackReviews =
    locale === 'en'
      ? [
          {
            id: '1',
            name: 'Budi Santoso & Family',
            stay: 'Weekend Leisure • Executive Room',
            source: 'Google Review',
            rating: 5,
            quote:
              'A remarkably serene and refreshing resort in Bogor. The room was spacious, spotless, and the mattress was exceptionally plush. Breakfast at Hegarmanah Restaurant with mountain views was unforgettable. We will definitely return.',
          },
          {
            id: '2',
            name: 'Jessica Wibowo',
            stay: 'Wedding Reception at Bale Pakuan',
            source: 'Wedding Guest',
            rating: 5,
            quote:
              'Bale Pakuan Ballroom is grand and prestigious! High ceilings, crystal-clear acoustics, and the catering buffet was praised by all our guests. Staf service was extraordinarily professional.',
          },
          {
            id: '3',
            name: 'Rian Pratama',
            stay: 'Corporate Summit • Superior Room',
            source: 'Tripadvisor',
            rating: 5,
            quote:
              'Rancage meeting room facilities are complete and well-maintained. Fast, reliable internet connection for our hybrid video conference. Strategic location in BNR Bogor.',
          },
        ]
      : [
          {
            id: '1',
            name: 'Budi Santoso & Keluarga',
            stay: 'Liburan Akhir Pekan • Executive Room',
            source: 'Google Review',
            rating: 5,
            quote:
              'Resor yang sangat tenang dan sejuk di Bogor. Kamarnya luas, bersih, dan kasurnya sangat empuk. Sarapan di Restoran Hegarmanah sangat berkesan dengan pemandangan gunung. Pasti akan kembali lagi.',
          },
          {
            id: '2',
            name: 'Jessica Wibowo',
            stay: 'Pernikahan di Bale Pakuan',
            source: 'Wedding Guest',
            rating: 5,
            quote:
              'Ballroom Bale Pakuan sangat megah dan berkelas! Langit-langitnya tinggi, sound system jernih, dan makanan prasmanan resepsi disukai semua tamu undangan kami. Pelayanan staf sangat profesional.',
          },
          {
            id: '3',
            name: 'Rian Pratama',
            stay: 'Corporate Meeting & Stay • Superior Room',
            source: 'Tripadvisor',
            rating: 5,
            quote:
              'Fasilitas ruang meeting Rancage sangat lengkap dan terawat. Koneksi internet stabil untuk video conference. Lokasinya strategis di BNR, dekat dengan berbagai destinasi hiburan di Bogor.',
          },
        ]

  try {
    const payload = await getPayload({ config: configPromise })
    const res = await payload.find({
      collection: 'reviews',
      locale,
      where: {
        isPublished: {
          equals: true,
        },
      },
      limit: 10,
      overrideAccess: true,
    })

    if (res.docs && res.docs.length > 0) {
      return res.docs.map((doc: any) => ({
        id: String(doc.id),
        name: doc.guestName,
        stay: doc.stayDate || (locale === 'en' ? 'Hotel Guest' : 'Tamu Menginap'),
        source:
          doc.source === 'google'
            ? 'Google Review'
            : doc.source === 'tripadvisor'
            ? 'Tripadvisor'
            : doc.source === 'ota'
            ? 'Agoda / Booking.com'
            : locale === 'en'
            ? 'Direct Guest'
            : 'Tamu Langsung',
        rating: doc.rating || 5,
        quote: doc.comment,
      }))
    }
  } catch (err) {
    console.warn('[CMS Data] Fallback Reviews to static data:', err)
  }

  return fallbackReviews
}

/**
 * 11. Fetch Penawaran & Promo dari Payload CMS Collection 'offers'
 */
export async function getOffersData(locale: 'id' | 'en' = 'id'): Promise<OfferItem[]> {
  const fallbackOffers = locale === 'en' ? OFFERS_DATA_EN : OFFERS_DATA_ID

  try {
    const payload = await getPayload({ config: configPromise })
    const res = await payload.find({
      collection: 'offers',
      locale,
      sort: 'order',
      where: {
        isActive: {
          equals: true,
        },
      },
      overrideAccess: true,
    })

    if (res.docs && res.docs.length > 0) {
      return res.docs.map((doc: any, index: number) => {
        let featuredImage = ''
        if (doc.featuredImage && typeof doc.featuredImage === 'object' && doc.featuredImage.url) {
          featuredImage = doc.featuredImage.url
        } else if (typeof doc.featuredImage === 'string') {
          featuredImage = doc.featuredImage
        } else if (doc.imageUrl) {
          featuredImage = doc.imageUrl
        }

        const fallback =
          fallbackOffers.find((f) => f.slug === doc.slug) ||
          fallbackOffers[index % fallbackOffers.length]

        // Parse inclusions
        let inclusions: string[] = fallback?.inclusions || []
        if (doc.inclusions && Array.isArray(doc.inclusions) && doc.inclusions.length > 0) {
          inclusions = doc.inclusions
            .map((inc: any) => (typeof inc === 'string' ? inc : inc.item || ''))
            .filter(Boolean)
        }

        // Parse terms
        let terms: string[] = fallback?.terms || []
        if (doc.terms && Array.isArray(doc.terms) && doc.terms.length > 0) {
          terms = doc.terms
            .map((t: any) => (typeof t === 'string' ? t : t.item || ''))
            .filter(Boolean)
        }

        const validUntil =
          doc.validUntilText ||
          (doc.validUntil ? String(doc.validUntil).split('T')[0] : null) ||
          fallback?.validUntil ||
          (locale === 'en' ? 'December 31, 2026' : '31 Desember 2026')

        return {
          id: String(doc.id),
          slug: doc.slug,
          title: doc.title || fallback?.title,
          category: (doc.category || fallback?.category || 'stay') as any,
          categoryLabel:
            doc.categoryLabel ||
            fallback?.categoryLabel ||
            (locale === 'en' ? 'Exclusive Offer' : 'Penawaran Eksklusif'),
          discountBadge: doc.discountBadge || fallback?.discountBadge || '',
          price: doc.price || fallback?.price || '',
          shortDescription: doc.shortDescription || fallback?.shortDescription || '',
          inclusions,
          terms,
          validUntil,
          featuredImage: featuredImage || fallback?.featuredImage || '',
          ctaType: (doc.ctaType || fallback?.ctaType || 'booking') as any,
          ctaLink: doc.ctaLink || fallback?.ctaLink || '/booking',
          ctaText:
            doc.ctaText ||
            fallback?.ctaText ||
            (locale === 'en' ? 'Book Offer' : 'Pesan Penawaran'),
        }
      })
    }
  } catch (err) {
    console.warn('[CMS Data] Fallback Offers to static data:', err)
  }

  return fallbackOffers
}

export interface HomePageData {
  hero: {
    badge: string
    titleLine1: string
    titleAccent: string
    titleLine2: string
    subtitle: string
    backgroundImageUrl: string
    exploreRoomsText: string
    virtualTourText: string
    features: { title: string; icon: string }[]
  }
  sections: {
    roomsSubtitle: string
    roomsTitle: string
    roomsDesc: string
    diningSubtitle: string
    diningTitle: string
    diningDesc: string
    eventsSubtitle: string
    eventsTitle: string
    eventsDesc: string
  }
  subpageBanners: {
    roomsBannerUrl: string
    diningBannerUrl: string
    eventsBannerUrl: string
    facilitiesBannerUrl: string
    virtualTourBannerUrl: string
  }
}

/**
 * 12. Fetch Data Halaman Beranda (Hero Banner & Section Headers) dari Payload CMS Global 'home-page'
 */
export async function getHomePageData(locale: 'id' | 'en' = 'id'): Promise<HomePageData> {
  const defaultData: HomePageData = {
    hero: {
      badge:
        locale === 'en'
          ? 'Four-Star Luxury Resort & Premier Convention'
          : 'Resor Bintang 4 & Konvensi Megah di Bogor',
      titleLine1: locale === 'en' ? 'Where Luxury Meets' : 'Kemewahan Resor Berpadu',
      titleAccent: locale === 'en' ? 'Serene Mountain' : 'Keindahan Alam',
      titleLine2: locale === 'en' ? 'Salak Views' : 'Gunung Salak',
      subtitle:
        locale === 'en'
          ? 'Experience tranquil serenity nestled at the foot of Mount Salak. Featuring expansive contemporary Sundanese suites, authentic Parahyangan dining, and the grandest standalone convention venue in Bogor Nirwana Residence.'
          : 'Nikmati peristirahatan tenang dengan pemandangan Gunung Salak, kamar luas bergaya modern Sunda, santapan khas Parahyangan, serta gedung konvensi mandiri terbesar di Bogor Nirwana Residence.',
      backgroundImageUrl: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/bilding-1.jpg.jpeg',
      exploreRoomsText: locale === 'en' ? 'Explore Rooms & Suites' : 'Jelajahi Kamar & Suites',
      virtualTourText: 'Virtual Tour 360°',
      features:
        locale === 'en'
          ? [
              { title: 'Panoramic Views of Mount Salak', icon: 'mountain' },
              { title: 'Standalone Ballroom up to 1,000 Guests', icon: 'calendar' },
              { title: 'Authentic Sundanese Fine Dining', icon: 'dining' },
            ]
          : [
              { title: 'Pemandangan Asri Gunung Salak', icon: 'mountain' },
              { title: 'Gedung Konvensi Kapasitas 1.000 Pax', icon: 'calendar' },
              { title: 'Santapan Khas Sunda & Nusantara', icon: 'dining' },
            ],
    },
    sections: {
      roomsSubtitle: locale === 'en' ? 'Exclusive Accommodations' : 'Akomodasi Eksklusif',
      roomsTitle: locale === 'en' ? 'Luxury Rooms & Suites' : 'Pilihan Kamar & Suites Mewah',
      roomsDesc:
        locale === 'en'
          ? 'Every sanctuary is thoughtfully crafted with quiet luxury aesthetics, sweeping panoramic views of Mount Salak or the resort pool, and five-star modern amenities.'
          : 'Setiap kamar dirancang dengan kenyamanan kelas atas, pemandangan Gunung Salak atau kolam renang yang asri, serta fasilitas modern terlengkap.',
      diningSubtitle: locale === 'en' ? 'Sundanese & World Flavors' : 'Cita Rasa Nusantara & Internasional',
      diningTitle: locale === 'en' ? 'Hegarmanah Restaurant & Lounges' : 'Restoran Hegarmanah & Jamuan Kuliner',
      diningDesc:
        locale === 'en'
          ? 'Delight your senses with authentic traditional Sundanese feasts, international culinary delights, and refreshing mountain breezes.'
          : 'Sajikan momen bersantap istimewa dengan hidangan khas Sunda autentik, menu internasional pilihan, dan suasana sejuk pegunungan.',
      eventsSubtitle:
        locale === 'en' ? 'Conventions, Galas & Grand Weddings' : 'Konvensi, Resepsi & Pertemuan Akbar',
      eventsTitle:
        locale === 'en'
          ? 'Bale Pakuan Grand Ballroom & Meeting Venues'
          : 'Bale Pakuan Grand Ballroom & Ruang Pertemuan',
      eventsDesc:
        locale === 'en'
          ? 'The premier standalone convention facility in South Bogor, hosting up to 1,000 guests alongside 20+ fully equipped modern meeting rooms.'
          : 'Gedung konvensi mandiri termegah di kawasan Bogor Selatan dengan kapasitas hingga 1.000 tamu dan 20+ ruang pertemuan berfasilitas modern.',
    },
    subpageBanners: {
      roomsBannerUrl: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/bilding-1.jpg.jpeg',
      diningBannerUrl: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/hegarmanah-1.jpg.jpeg',
      eventsBannerUrl: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/ballroom-1.jpg.jpeg',
      facilitiesBannerUrl: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/bilding.jpg.jpeg',
      virtualTourBannerUrl: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/sunset-view.jpg.jpeg',
    },
  }

  try {
    const payload = await getPayload({ config: configPromise })
    const home = await payload.findGlobal({ slug: 'home-page', locale })

    if (home) {
      let heroBg = home.hero?.backgroundImageUrl || defaultData.hero.backgroundImageUrl
      if (home.hero?.backgroundImage && typeof home.hero.backgroundImage === 'object' && home.hero.backgroundImage.url) {
        heroBg = home.hero.backgroundImage.url
      }

      let features = defaultData.hero.features
      if (home.hero?.features && Array.isArray(home.hero.features) && home.hero.features.length > 0) {
        features = home.hero.features.map((f: any) => ({
          title: f.title,
          icon: f.icon || 'mountain',
        }))
      }

      return {
        hero: {
          badge: home.hero?.badge || defaultData.hero.badge,
          titleLine1: home.hero?.titleLine1 || defaultData.hero.titleLine1,
          titleAccent: home.hero?.titleAccent || defaultData.hero.titleAccent,
          titleLine2: home.hero?.titleLine2 || defaultData.hero.titleLine2,
          subtitle: home.hero?.subtitle || defaultData.hero.subtitle,
          backgroundImageUrl: heroBg,
          exploreRoomsText: home.hero?.exploreRoomsText || defaultData.hero.exploreRoomsText,
          virtualTourText: home.hero?.virtualTourText || defaultData.hero.virtualTourText,
          features,
        },
        sections: {
          roomsSubtitle: home.sections?.roomsSubtitle || defaultData.sections.roomsSubtitle,
          roomsTitle: home.sections?.roomsTitle || defaultData.sections.roomsTitle,
          roomsDesc: home.sections?.roomsDesc || defaultData.sections.roomsDesc,
          diningSubtitle: home.sections?.diningSubtitle || defaultData.sections.diningSubtitle,
          diningTitle: home.sections?.diningTitle || defaultData.sections.diningTitle,
          diningDesc: home.sections?.diningDesc || defaultData.sections.diningDesc,
          eventsSubtitle: home.sections?.eventsSubtitle || defaultData.sections.eventsSubtitle,
          eventsTitle: home.sections?.eventsTitle || defaultData.sections.eventsTitle,
          eventsDesc: home.sections?.eventsDesc || defaultData.sections.eventsDesc,
        },
        subpageBanners: {
          roomsBannerUrl: home.subpageBanners?.roomsBannerUrl || defaultData.subpageBanners.roomsBannerUrl,
          diningBannerUrl: home.subpageBanners?.diningBannerUrl || defaultData.subpageBanners.diningBannerUrl,
          eventsBannerUrl: home.subpageBanners?.eventsBannerUrl || defaultData.subpageBanners.eventsBannerUrl,
          facilitiesBannerUrl: home.subpageBanners?.facilitiesBannerUrl || defaultData.subpageBanners.facilitiesBannerUrl,
          virtualTourBannerUrl: home.subpageBanners?.virtualTourBannerUrl || defaultData.subpageBanners.virtualTourBannerUrl,
        },
      }
    }
  } catch (err) {
    console.warn('[CMS Data] Fallback HomePage to static data:', err)
  }

  return defaultData
}

export interface GalleryItem {
  id: string
  slug: string
  title: string
  category: string
  imageUrl: string
  caption: string
  description?: string
  isVirtualTour: boolean
  order: number
}

/**
 * 13. Fetch Galeri & Spot Virtual Tour 360 dari Payload CMS Collection 'galleries'
 */
export async function getGalleriesData(locale: 'id' | 'en' = 'id', isVirtualTourOnly: boolean = false): Promise<GalleryItem[]> {
  const defaultScenes: GalleryItem[] = [
    {
      id: 'ballroom',
      slug: 'ballroom',
      title: 'Bale Pakuan Grand Ballroom',
      category: 'events',
      imageUrl: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/ballroom-1.jpg.jpeg',
      caption: 'Kapasitas hingga 1.000 Tamu',
      description:
        locale === 'en'
          ? 'Standalone convention venue with 7-meter high ceilings, sparkling crystal chandeliers, and state-of-the-art acoustic sound system.'
          : 'Gedung konvensi mandiri berkapasitas hingga 1.000 pax dengan langit-langit setinggi 7 meter dan lampu chandelier mewah.',
      isVirtualTour: true,
      order: 1,
    },
    {
      id: 'royal-suite',
      slug: 'royal-suite',
      title: 'Royal Suite Luxury Bedroom & Living Area',
      category: 'rooms',
      imageUrl: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/royal.jpg.jpeg',
      caption: 'Suite Termewah 54 m²',
      description:
        locale === 'en'
          ? 'Our most prestigious 54 m² suite featuring a private living room, executive work desk, and marble bathroom with panoramic mountain views.'
          : 'Suite termewah seluas 54 m² dengan ruang tamu privat, meja kerja eksekutif, dan kamar mandi marmer.',
      isVirtualTour: true,
      order: 2,
    },
    {
      id: 'superior',
      slug: 'superior',
      title: 'Superior Room Minimalis Modern',
      category: 'rooms',
      imageUrl: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/superior.jpg.jpeg',
      caption: 'Kamar Modern 22 m²',
      description:
        locale === 'en'
          ? 'Tranquil 22 m² sanctuary with sleek contemporary design and serene views of the Bogor Nirwana landscape.'
          : 'Kamar nyaman seluas 22 m² berkonsep modern minimalis dengan pemandangan asri kawasan Bogor.',
      isVirtualTour: true,
      order: 3,
    },
    {
      id: 'hegarmanah',
      slug: 'hegarmanah',
      title: 'Restoran Hegarmanah Area Terbuka',
      category: 'dining',
      imageUrl: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/hegarmanah-1.jpg.jpeg',
      caption: 'Semi-Outdoor Scenic Dining',
      description:
        locale === 'en'
          ? 'Scenic open-air dining terrace serving signature Sundanese feasts and refreshing tropical beverages.'
          : 'Area santap terbuka dengan udara sejuk pegunungan dan sajian khas kuliner Sunda favorit.',
      isVirtualTour: true,
      order: 4,
    },
    {
      id: 'lobby',
      slug: 'lobby',
      title: 'Lobby Utama & Reception Lounge',
      category: 'resort',
      imageUrl: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/lobby-loung-1.jpg.jpeg',
      caption: 'Hospitality Sambutan Hangat',
      description:
        locale === 'en'
          ? 'Grand lobby lounge welcoming you with five-star warmth, bespoke service, and relaxing ambiance.'
          : 'Ruang resepsionis dan lounge yang menyambut kedatangan Anda dengan keanggunan bintang lima.',
      isVirtualTour: true,
      order: 5,
    },
  ]

  try {
    const payload = await getPayload({ config: configPromise })
    const query: any = {
      collection: 'galleries',
      locale,
      sort: 'order',
      overrideAccess: true,
    }

    if (isVirtualTourOnly) {
      query.where = {
        isVirtualTour: {
          equals: true,
        },
      }
    }

    const res = await payload.find(query)

    if (res.docs && res.docs.length > 0) {
      return res.docs.map((doc: any, i: number) => {
        let imageUrl = doc.imageUrl || ''
        if (doc.image && typeof doc.image === 'object' && doc.image.url) {
          imageUrl = doc.image.url
        }

        return {
          id: String(doc.id),
          slug: doc.slug || `gallery-${doc.id}`,
          title: doc.title,
          category: doc.category || 'resort',
          imageUrl: imageUrl || defaultScenes[i % defaultScenes.length].imageUrl,
          caption: doc.caption || '',
          description: doc.description || '',
          isVirtualTour: Boolean(doc.isVirtualTour),
          order: doc.order || i + 1,
        }
      })
    }
  } catch (err) {
    console.warn('[CMS Data] Fallback Galleries to static data:', err)
  }

  return defaultScenes
}

/**
 * 14. Fetch Panduan Destinasi dari Payload CMS Collection 'destinations'
 */
export async function getDestinationsCMSData(locale: 'id' | 'en' = 'id'): Promise<{
  destinations: DestinationItem[]
  itineraries: CuratedItinerary[]
}> {
  const fallback = getDestinationsData(locale)

  try {
    const payload = await getPayload({ config: configPromise })
    const res = await payload.find({
      collection: 'destinations',
      locale,
      sort: 'order',
      where: {
        isActive: {
          equals: true,
        },
      },
      overrideAccess: true,
    })

    if (res.docs && res.docs.length > 0) {
      const destinations: DestinationItem[] = res.docs.map((doc: any, i: number) => {
        const fallbackItem =
          fallback.destinations.find((d) => d.id === doc.slug) ||
          fallback.destinations[i % fallback.destinations.length]

        let imageUrl = doc.imageUrl || ''
        if (doc.image && typeof doc.image === 'object' && doc.image.url) {
          imageUrl = doc.image.url
        }
        if (!imageUrl && fallbackItem) {
          imageUrl = fallbackItem.imageUrl
        }

        let highlights: string[] = fallbackItem?.highlights || []
        if (doc.highlights && Array.isArray(doc.highlights) && doc.highlights.length > 0) {
          highlights = doc.highlights
            .map((h: any) => (typeof h === 'string' ? h : h.text || ''))
            .filter(Boolean)
        }

        return {
          id: doc.slug || String(doc.id),
          name: doc.name || fallbackItem?.name || '',
          category: (doc.category || fallbackItem?.category || 'nature') as any,
          categoryLabel: doc.categoryLabel || fallbackItem?.categoryLabel || '',
          distance: doc.distance || fallbackItem?.distance || '',
          travelTime: doc.travelTime || fallbackItem?.travelTime || '',
          tagline: doc.tagline || fallbackItem?.tagline || '',
          description: doc.description || fallbackItem?.description || '',
          highlights,
          imageUrl,
          googleMapsUrl: doc.googleMapsUrl || fallbackItem?.googleMapsUrl || 'https://maps.google.com',
          recommendedFor: doc.recommendedFor || fallbackItem?.recommendedFor || '',
        }
      })

      return {
        destinations,
        itineraries: fallback.itineraries,
      }
    }
  } catch (err) {
    console.warn('[CMS Data] Fallback Destinations to static data:', err)
  }

  return fallback
}

/**
 * 15. Fetch Data Artikel & Blog dari Payload CMS Collection 'posts'
 */
export interface PostItem {
  id: string
  slug: string
  title: string
  category: 'news' | 'travel-guide' | 'wedding-tips' | 'culinary'
  categoryLabel: string
  excerpt: string
  content?: string
  featuredImage: string
  publishedAt: string
  readTime: string
  author: string
}

export async function getPostsData(locale: 'id' | 'en' = 'id', category?: string): Promise<PostItem[]> {
  const defaultPostsId: PostItem[] = [
    {
      id: '1',
      slug: '5-destinasi-wisata-bogor-nirwana-residence',
      title: '5 Destinasi Wisata Keluarga Terbaik Dekat Bogor Nirwana Residence',
      category: 'travel-guide',
      categoryLabel: 'Panduan Wisata',
      excerpt:
        'Jelajahi keseruan liburan keluarga di sekitar hotel mulai dari The Jungle Waterpark, suasana Eropa di Devoyage, hingga keteduhan Kebun Raya Bogor.',
      content: `Kawasan Bogor Nirwana Residence (BNR) terkenal sebagai salah satu kawasan resor paling prestisius dan asri di Kota Bogor. Dikelilingi udara sejuk pegunungan dan panorama megah Gunung Salak, lokasi Padjadjaran Suites Resort memberikan akses instan ke berbagai daya tarik wisata favorit keluarga.

### 1. The Jungle Waterpark BNR
Hanya berjarak sekitar 3 menit dari lobby hotel, The Jungle Waterpark menawarkan wahana rekreasi air bertaraf internasional dengan latar pemandangan alam pegunungan. Sangat cocok bagi keluarga yang membawa anak-anak untuk menikmati kolam ombak, lazy river, dan seluncuran air yang menantang.

### 2. Devoyage Bogor (Kampung Eropa)
Terletak masih di dalam kawasan BNR, Devoyage menghadirkan miniatur arsitektur pedesaan Eropa yang sangat fotogenik. Di sini Anda bisa menaiki kano menyusuri kanal buatan ala Venesia, berfoto di depan replika Menara Eiffel, dan mencicipi aneka gelato lezat.

### 3. Kebun Raya Bogor & Istana Kepresidenan
Hanya 15-20 menit berkendara dari resor, cagar botani tertua di Asia Tenggara ini menyuguhkan ribuan spesies flora langka, pohon-pohon rindang berusia ratusan tahun, dan suasana piknik yang menenangkan di tepi Danau Gunting.

### 4. Kampung Tematik Mulyaharja
Bagi pecinta suasana pedesaan yang asri, Mulyaharja menyuguhkan hamparan sawah hijau organik berlatar Gunung Salak. Anda bisa berjalan di atas jembatan kayu di tengah sawah dan mencicipi kopi lokal khas Bogor.

### 5. Sentra Kuliner Surya Kencana
Setelah puas berwisata, kunjungi kawasan pecinan legendaris Surya Kencana untuk mencicipi kuliner khas Bogor seperti Soto Kuning, Ngo Hiang, Doclang, dan Bir Kotok yang menghangatkan tubuh.`,
      featuredImage: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/bilding-1.jpg.jpeg',
      publishedAt: '2026-09-18',
      readTime: '4 Menit Baca',
      author: 'Padjadjaran Concierge',
    },
    {
      id: '2',
      slug: 'panduan-sukses-acara-mice-konvensi-bogor',
      title: 'Panduan Sukses Menggelar Acara MICE & Konvensi Perusahaan di Bogor',
      category: 'news',
      categoryLabel: 'MICE & Bisnis',
      excerpt:
        'Strategi memilih venue representatif, rancangan layout meja, tata audio-visual modern, dan fasilitas ruang transit VIP untuk rapat kementerian maupun korporat.',
      content: `Kota Bogor terus menjadi destinasi utama bagi kementerian, BUMN, dan korporat multinasional untuk menyelenggarakan rapat kerja tahunan, seminar strategis, dan konvensi internasional. Jarak tempuh yang terjangkau dari Jakarta via jalan tol Jagorawi serta suasana alam yang sejuk menjadi faktor kunci keberhasilan fokus peserta.

### Mengapa Memilih Venue Gedung Konvensi Mandiri?
Kunci kenyamanan acara skala besar adalah privasi dan aksesibilitas. Bale Pakuan Grand Ballroom di Padjadjaran Suites Resort dirancang sebagai gedung konvensi independen berkapasitas hingga 1.000 delegasi dengan langit-langit setinggi 7 meter tanpa tiang (pillarless), memastikan seluruh peserta memiliki pandangan visual yang sempurna tanpa halangan.

### Dukungan Audio-Visual & Konektivitas
Dalam era hibrida modern, stabilitas jaringan internet dedicated serta sistem videotron LED P3 High-Definition sangat krusial untuk presentasi data dan sambungan konferensi daring internasional. Tim teknisi audio-visual kami selalu siaga mendampingi setiap sesi acara Anda.

### Fasilitas VIP Holding Room & Foyer Pameran
Keberadaan ruang transit VIP eksklusif memungkinkan para pembicara utama, menteri, dan jajaran direksi untuk beristirahat dan melakukan koordinasi sebelum naik ke podium. Ditambah area pre-function foyer yang luas untuk registrasi dan booth pameran bisnis.`,
      featuredImage: '/api/media/file/bale-pakuan-grand-ballroom-1.jpg',
      publishedAt: '2026-09-10',
      readTime: '5 Menit Baca',
      author: 'Banquet & MICE Team',
    },
    {
      id: '3',
      slug: 'inspirasi-pernikahan-megah-bale-pakuan-ballroom',
      title: 'Inspirasi Pernikahan Megah Berlatar Gunung Salak di Bale Pakuan',
      category: 'wedding-tips',
      categoryLabel: 'Tips Pernikahan',
      excerpt:
        'Ketahui tips mewujudkan pesta pernikahan impian dengan kapasitas 1.000 tamu, hidangan katering berkelas bintang lima, dan malam romantis di Royal Suite.',
      content: `Momen pernikahan adalah tonggak sejarah cinta yang paling berharga. Memilih tempat pesta pernikahan yang mampu menampung seluruh keluarga besar dan tamu kehormatan dengan anggun dan nyaman adalah prioritas utama setiap pasangan.

### Kemegahan Lampu Gantung Kristal & Langit-langit 7 Meter
Bale Pakuan Grand Ballroom menghadirkan nuansa ballroom istana dengan tata cahaya lampu kristal mewah. Ketinggian langit-langit 7 meter memberikan sirkulasi udara yang lapang dan kebebasan bagi para perancang dekorasi untuk menciptakan pelaminan impian bertema tradisional maupun modern glamor.

### Standar Katering Bintang Lima
Kesan mendalam sebuah pesta pernikahan sering kali ditentukan oleh kualitas hidangannya. Tim Master Chef Padjadjaran Suites menyajikan perpaduan hidangan otentik Nusantara, masakan khas Sunda prasmanan, dan pilihan stall internasional yang diuji rasa (food testing) terlebih dahulu bersama calon pengantin.

### Kenyamanan Bridal Suite & Ruang Rias Pengantin
Calon pengantin mendapatkan complimentary menginap di Royal Suite seluas 54 m² dengan panorama Gunung Salak yang memukau untuk malam bulan madu yang tenang dan tak terlupakan.`,
      featuredImage: '/api/media/file/dekorasi-pernikahan-wedding-bale-pakuan.jpg',
      publishedAt: '2026-09-05',
      readTime: '4 Menit Baca',
      author: 'Wedding Specialist',
    },
    {
      id: '4',
      slug: 'cita-rasa-sunda-otentik-restoran-hegarmanah',
      title: 'Menelusuri Cita Rasa Sunda Otentik di Restoran Hegarmanah',
      category: 'culinary',
      categoryLabel: 'Kuliner & Rasa',
      excerpt:
        'Eksplorasi ragam menu legendaris khas Parahyangan, gurame terbang renyah, nasi liwet wangi rempah, dan sambal dadak segar di teras semi-terbuka.',
      content: `Kuliner Parahyangan Sunda senantiasa memikat hati dengan kesegaran lalapan, pedasnya sambal terasi dadak, dan aroma rempah alami yang menggugah selera. Di Restoran Hegarmanah Padjadjaran Suites Resort, warisan kuliner Sunda disajikan dengan standar kebersihan dan teknik memasak hotel bintang lima.

### Keistimewaan Ikan Gurame Terbang & Nasi Liwet Kastrol
Menu andalan yang paling banyak dipesan adalah Ikan Gurame Terbang yang digoreng garing keemasan hingga renyah ke tulang, disajikan berdampingan dengan Nasi Liwet Kastrol yang dimasak bersama daun kemangi, serai, daun salam, dan cabai rawit utuh.

### Suasana Santap Semi-Outdoor yang Menenangkan
Restoran Hegarmanah dirancang dengan konsep semi-terbuka yang mengalirkan hawa sejuk alami Bogor. Sangat cocok untuk makan siang santai bersama rekan kerja, perayaan arisan keluarga, hingga jamuan makan malam romantis di bawah gemerlap lampu malam Kota Bogor.`,
      featuredImage: '/api/media/file/restoran-hegarmanah-sunda-bogor.jpg',
      publishedAt: '2026-08-28',
      readTime: '3 Menit Baca',
      author: 'Executive Chef Team',
    },
  ]

  const defaultPostsEn: PostItem[] = [
    {
      id: '1',
      slug: '5-destinasi-wisata-bogor-nirwana-residence',
      title: '5 Top Family Destinations Around Bogor Nirwana Residence',
      category: 'travel-guide',
      categoryLabel: 'Travel Guide',
      excerpt:
        'Discover the best family holiday attractions near the resort, from The Jungle Waterpark to European charm at Devoyage and Bogor Botanical Gardens.',
      content: `The Bogor Nirwana Residence (BNR) area is widely recognized as one of the most prestigious resort enclaves in Bogor. Surrounded by crisp mountain air and panoramic vistas of Mount Salak, Padjadjaran Suites Resort provides instant access to favorite family destinations.

### 1. The Jungle Waterpark BNR
Just 3 minutes from the hotel lobby, The Jungle Waterpark offers international-standard water recreation with a mountain backdrop. Perfect for families with children to enjoy the wave pool, lazy river, and thrilling slides.

### 2. Devoyage Bogor (European Village)
Located within the BNR area, Devoyage features photogenic European village architecture. You can ride gondolas along Venetian canals, take photos in front of Eiffel Tower replicas, and enjoy artisan gelato.

### 3. Bogor Botanical Gardens & Presidential Palace
Only 15-20 minutes drive away, this oldest botanical reserve in Southeast Asia houses thousands of rare plant species, ancient towering trees, and serene picnic spots beside Lake Gunting.

### 4. Mulyaharja Agro-Tourism Village
For nature enthusiasts, Mulyaharja offers scenic organic rice terraces overlooking Mount Salak. Stroll across wooden pathways and sip authentic local Bogor coffee.

### 5. Surya Kencana Heritage Food Street
After exploring, visit the historic Surya Kencana culinary quarter to savor classic Bogor delicacies such as Soto Kuning, Ngo Hiang, and warming traditional herbal drinks.`,
      featuredImage: '/api/media/file/destinasi-the-jungle-waterpark-bnr-bogor.jpg',
      publishedAt: '2026-09-18',
      readTime: '4 Min Read',
      author: 'Padjadjaran Concierge',
    },
    {
      id: '2',
      slug: 'tips-memilih-venue-mice-ballroom-bogor',
      title: 'Master Guide to Hosting High-Impact Corporate MICE Events in Bogor',
      category: 'news',
      categoryLabel: 'MICE & Corporate',
      excerpt:
        'Key strategies for venue selection, seating arrangements, cutting-edge AV systems, and VIP holding lounges for ministerial summits and conferences.',
      content: `Bogor remains the premier destination for government ministries, state-owned enterprises, and multinational corporations to hold annual strategic conferences and summits. The easy drive from Jakarta via the Jagorawi tollway and peaceful mountain surroundings foster undivided participant focus.

### Why Choose a Freestanding Convention Facility?
The cornerstone of major corporate conventions is privacy and unhindered movement. Bale Pakuan Grand Ballroom at Padjadjaran Suites Resort is engineered as an independent convention hall hosting up to 1,000 delegates with 7-meter high pillarless ceilings.

### Audiovisual & High-Speed Connectivity
In today’s hybrid business environment, dedicated gigabit Wi-Fi and high-resolution P3 LED videotron displays are vital for international conferencing and data presentations. Our expert AV engineers are always on standby throughout your event.

### Dedicated VIP Holding Rooms & Pre-Function Foyer
Private VIP suites allow keynote speakers, dignitaries, and board executives to refresh and align before stepping onto the stage, supported by an expansive foyer for registration and sponsor exhibition booths.`,
      featuredImage: '/api/media/file/bale-pakuan-grand-ballroom-1.jpg',
      publishedAt: '2026-09-10',
      readTime: '5 Min Read',
      author: 'Banquet & MICE Team',
    },
    {
      id: '3',
      slug: 'inspirasi-pernikahan-megah-bale-pakuan-ballroom',
      title: 'Romantic Grand Weddings Overlooking Mount Salak at Bale Pakuan',
      category: 'wedding-tips',
      categoryLabel: 'Wedding Inspiration',
      excerpt:
        'Discover tips for curating your dream wedding banquet for up to 1,000 guests with five-star catering and a complimentary night in the Royal Suite.',
      content: `A wedding is the most cherished milestone in your journey of love. Choosing a venue that accommodates your entire family and honored guests with grace and luxury is the top priority for every couple.

### Crystal Chandeliers & 7-Meter Pillarless Grandeur
Bale Pakuan Grand Ballroom provides a palace-like ambiance with sparkling crystal chandeliers. The spacious 7-meter ceiling gives wedding decorators total freedom to build breathtaking traditional or modern bespoke stages.

### Five-Star Master Chef Banquet Catering
A memorable wedding banquet is defined by its culinary excellence. Our culinary team blends authentic Indonesian royal delicacies, Sundanese favorites, and international live cooking stalls, complete with an exclusive private food testing session.

### Royal Suite Honeymoon Experience
The bride and groom enjoy a complimentary romantic stay in our 54 m² Royal Suite with panoramic vistas of Mount Salak for an unforgettable, serene wedding night.`,
      featuredImage: '/api/media/file/dekorasi-pernikahan-wedding-bale-pakuan.jpg',
      publishedAt: '2026-09-05',
      readTime: '4 Min Read',
      author: 'Wedding Specialist',
    },
    {
      id: '4',
      slug: 'cita-rasa-sunda-otentik-restoran-hegarmanah',
      title: 'Savoring Authentic Sundanese Gastronomy at Hegarmanah Restaurant',
      category: 'culinary',
      categoryLabel: 'Dining & Flavors',
      excerpt:
        'Explore signature Parahyangan delicacies, crispy flying gourami, aromatic kastrol liwet rice, and fresh ground sambal on the breezy scenic terrace.',
      content: `West Javanese Sundanese gastronomy captivates food connoisseurs with fresh herbs, fiery freshly-ground sambal, and natural aromatic spices. At Hegarmanah Restaurant, heritage recipes are prepared with five-star culinary finesse.

### Signature Crispy Gourami & Aromatic Liwet Rice
The most celebrated dish is the Golden Crispy Flying Gourami, served alongside Nasi Liwet Kastrol cooked with sweet basil, lemongrass, bay leaves, and whole bird's eye chilies in traditional cast-iron pots.

### Relaxing Semi-Outdoor Dining Terrace
Hegarmanah Restaurant is designed with an open-air scenic terrace embracing the soothing mountain breezes. Ideal for business lunches, family gatherings, or candlelit evening dinners overlooking the shimmering lights of Bogor.`,
      featuredImage: '/api/media/file/restoran-hegarmanah-sunda-bogor.jpg',
      publishedAt: '2026-08-28',
      readTime: '3 Min Read',
      author: 'Executive Chef Team',
    },
  ]

  const fallbackPosts = locale === 'en' ? defaultPostsEn : defaultPostsId

/**
 * Helper to serialize Lexical AST to formatted markdown text
 */
function serializeLexicalToMarkdown(node: any): string {
  if (!node) return ''
  if (typeof node === 'string') return node
  if (node.text) {
    let t = node.text
    if (node.format & 1) t = `**${t}**` // bold
    if (node.format & 2) t = `*${t}*` // italic
    return t
  }

  let childrenText = ''
  if (node.children && Array.isArray(node.children)) {
    childrenText = node.children.map(serializeLexicalToMarkdown).join('')
  }

  if (node.type === 'heading') {
    const level = node.tag === 'h1' ? '#' : node.tag === 'h2' ? '##' : '###'
    return `\n\n${level} ${childrenText}\n\n`
  }
  if (node.type === 'paragraph') {
    return `\n\n${childrenText}\n\n`
  }
  if (node.type === 'listitem') {
    return `\n- ${childrenText}`
  }
  if (node.type === 'list') {
    return `\n${childrenText}\n`
  }

  if (node.root) {
    return serializeLexicalToMarkdown(node.root)
  }

  return childrenText
}

  try {
    const payload = await getPayload({ config: configPromise })
    const res = await payload.find({
      collection: 'posts',
      locale,
      limit: 20,
      sort: '-publishedAt',
    })

    if (res.docs && res.docs.length > 0) {
      return res.docs.map((doc: any, idx: number) => {
        const fallback = fallbackPosts.find((p) => p.slug === doc.slug) || fallbackPosts[idx % fallbackPosts.length]
        let featuredImage = doc.imageUrl || fallback?.featuredImage || ''
        if (doc.featuredImage && typeof doc.featuredImage === 'object' && doc.featuredImage.url) {
          featuredImage = doc.featuredImage.url
        }

        let content = fallback?.content || ''
        if (typeof doc.content === 'string' && doc.content.trim().length > 0) {
          content = doc.content
        } else if (doc.content && typeof doc.content === 'object') {
          const parsed = serializeLexicalToMarkdown(doc.content).trim()
          if (parsed.length > 0) content = parsed
        }

        const cat = doc.category || fallback?.category || 'news'
        const catLabel =
          cat === 'travel-guide'
            ? (locale === 'en' ? 'Travel Guide' : 'Panduan Wisata')
            : cat === 'wedding-tips'
            ? (locale === 'en' ? 'Wedding Inspiration' : 'Tips Pernikahan')
            : cat === 'culinary'
            ? (locale === 'en' ? 'Dining & Flavors' : 'Kuliner & Rasa')
            : (locale === 'en' ? 'News & Events' : 'Berita & Acara')

        return {
          id: String(doc.id),
          slug: doc.slug || fallback?.slug || `post-${doc.id}`,
          title: doc.title || fallback?.title || '',
          category: cat,
          categoryLabel: catLabel,
          excerpt: doc.excerpt || fallback?.excerpt || '',
          content,
          featuredImage,
          publishedAt: doc.publishedAt ? String(doc.publishedAt).split('T')[0] : (fallback?.publishedAt || '2026-09-15'),
          readTime: doc.readTime || fallback?.readTime || (locale === 'en' ? '4 Min Read' : '4 Menit Baca'),
          author: doc.author || fallback?.author || 'Padjadjaran Editorial',
        }
      })
    }
  } catch (err) {
    console.warn('[CMS Data] Fallback Posts to static data:', err)
  }

  if (category && category !== 'all') {
    return fallbackPosts.filter((p) => p.category === category)
  }

  return fallbackPosts
}

export async function getPostBySlug(slug: string, locale: 'id' | 'en' = 'id'): Promise<PostItem | null> {
  const posts = await getPostsData(locale)
  const found = posts.find((p) => p.slug === slug)
  return found || null
}
