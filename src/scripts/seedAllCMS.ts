import { getPayload } from 'payload'
import config from '../payload.config'

async function seedAll() {
  console.log('Initializing Payload...')
  const payload = await getPayload({ config })

  // 1. Seed HomePage Global
  console.log('1. Seeding HomePage Global...')
  await payload.updateGlobal({
    slug: 'home-page',
    locale: 'id',
    data: {
      hero: {
        badge: 'Resor Bintang 4 & Konvensi Megah di Bogor',
        titleLine1: 'Kemewahan Resor Berpadu',
        titleAccent: 'Keindahan Alam',
        titleLine2: 'Gunung Salak',
        subtitle:
          'Nikmati peristirahatan tenang dengan pemandangan Gunung Salak, kamar luas bergaya modern Sunda, santapan khas Parahyangan, serta gedung konvensi mandiri terbesar di Bogor Nirwana Residence.',
        backgroundImageUrl: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/bilding-1.jpg.jpeg',
        exploreRoomsText: 'Jelajahi Kamar & Suites',
        virtualTourText: 'Virtual Tour 360°',
        features: [
          { title: 'Pemandangan Asri Gunung Salak', icon: 'mountain' },
          { title: 'Gedung Konvensi Kapasitas 1.000 Pax', icon: 'calendar' },
          { title: 'Santapan Khas Sunda & Nusantara', icon: 'dining' },
        ],
      },
      sections: {
        roomsSubtitle: 'Akomodasi Eksklusif',
        roomsTitle: 'Pilihan Kamar & Suites Mewah',
        roomsDesc:
          'Setiap kamar dirancang dengan kenyamanan kelas atas, pemandangan Gunung Salak atau kolam renang yang asri, serta fasilitas modern terlengkap.',
        diningSubtitle: 'Cita Rasa Nusantara & Internasional',
        diningTitle: 'Restoran Hegarmanah & Jamuan Kuliner',
        diningDesc:
          'Sajikan momen bersantap istimewa dengan hidangan khas Sunda autentik, menu internasional pilihan, dan suasana sejuk pegunungan.',
        eventsSubtitle: 'Konvensi, Resepsi & Pertemuan Akbar',
        eventsTitle: 'Bale Pakuan Grand Ballroom & Ruang Pertemuan',
        eventsDesc:
          'Gedung konvensi mandiri termegah di kawasan Bogor Selatan dengan kapasitas hingga 1.000 tamu dan 20+ ruang pertemuan berfasilitas modern.',
      },
      subpageBanners: {
        roomsBannerUrl: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/bilding-1.jpg.jpeg',
        diningBannerUrl: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/hegarmanah-1.jpg.jpeg',
        eventsBannerUrl: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/ballroom-1.jpg.jpeg',
        facilitiesBannerUrl: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/bilding.jpg.jpeg',
        virtualTourBannerUrl: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/sunset-view.jpg.jpeg',
      },
    },
  })

  // Update English HomePage
  await payload.updateGlobal({
    slug: 'home-page',
    locale: 'en',
    data: {
      hero: {
        badge: 'Four-Star Luxury Resort & Premier Convention',
        titleLine1: 'Where Luxury Meets',
        titleAccent: 'Serene Mountain',
        titleLine2: 'Salak Views',
        subtitle:
          'Experience tranquil serenity nestled at the foot of Mount Salak. Featuring expansive contemporary Sundanese suites, authentic Parahyangan dining, and the grandest standalone convention venue in Bogor Nirwana Residence.',
        exploreRoomsText: 'Explore Rooms & Suites',
        virtualTourText: 'Virtual Tour 360°',
        features: [
          { title: 'Panoramic Views of Mount Salak', icon: 'mountain' },
          { title: 'Standalone Ballroom up to 1,000 Guests', icon: 'calendar' },
          { title: 'Authentic Sundanese Fine Dining', icon: 'dining' },
        ],
      },
      sections: {
        roomsSubtitle: 'Exclusive Accommodations',
        roomsTitle: 'Luxury Rooms & Suites',
        roomsDesc:
          'Every sanctuary is thoughtfully crafted with quiet luxury aesthetics, sweeping panoramic views of Mount Salak or the resort pool, and five-star modern amenities.',
        diningSubtitle: 'Sundanese & World Flavors',
        diningTitle: 'Hegarmanah Restaurant & Lounges',
        diningDesc:
          'Delight your senses with authentic traditional Sundanese feasts, international culinary delights, and refreshing mountain breezes.',
        eventsSubtitle: 'Conventions, Galas & Grand Weddings',
        eventsTitle: 'Bale Pakuan Grand Ballroom & Meeting Venues',
        eventsDesc:
          'The premier standalone convention facility in South Bogor, hosting up to 1,000 guests alongside 20+ fully equipped modern meeting rooms.',
      },
    },
  })
  console.log('   HomePage Global seeded successfully.')

  // 2. Seed HeaderConfig Global
  console.log('2. Seeding HeaderConfig Global...')
  const navItemsId = [
    { label: 'Beranda', href: '/' },
    { label: 'Kamar & Suites', href: '/rooms' },
    { label: 'Penawaran', href: '/offers' },
    { label: 'Restoran', href: '/dining' },
    { label: 'Pertemuan & Acara', href: '/events' },
    { label: 'Fasilitas', href: '/facilities' },
    { label: 'Virtual Tour', href: '/virtual-tour' },
    { label: 'Kontak', href: '/contact' },
  ]
  const navItemsEn = [
    { label: 'Home', href: '/' },
    { label: 'Rooms & Suites', href: '/rooms' },
    { label: 'Offers', href: '/offers' },
    { label: 'Dining', href: '/dining' },
    { label: 'Events & Ballroom', href: '/events' },
    { label: 'Facilities', href: '/facilities' },
    { label: 'Virtual Tour', href: '/virtual-tour' },
    { label: 'Contact', href: '/contact' },
  ]

  const createdHeader = await payload.updateGlobal({
    slug: 'header-config',
    locale: 'id',
    data: {
      navItems: navItemsId,
      bookButtonText: 'Pesan Kamar',
    },
  })

  if (createdHeader?.navItems) {
    await payload.updateGlobal({
      slug: 'header-config',
      locale: 'en',
      data: {
        navItems: createdHeader.navItems.map((item: any, idx: number) => ({
          id: item.id,
          label: navItemsEn[idx]?.label || item.label,
          href: navItemsEn[idx]?.href || item.href,
        })),
        bookButtonText: 'Book Now',
      },
    })
  }
  console.log('   HeaderConfig Global seeded successfully.')

  // 3. Seed FooterConfig Global
  console.log('3. Seeding FooterConfig Global...')
  const quickLinksId = [
    { label: 'Penawaran & Promo Spesial', href: '/offers' },
    { label: 'Cek Ketersediaan & Booking', href: '/booking' },
    { label: 'Lokasi & Kontak', href: '/contact' },
    { label: 'Aplikasi Android', href: 'https://play.google.com/store/apps/details?id=com.dip.padjadjaransuites' },
    { label: 'Portal Admin CMS', href: '/admin' },
  ]
  const quickLinksEn = [
    { label: 'Exclusive Offers & Packages', href: '/offers' },
    { label: 'Check Availability & Booking', href: '/booking' },
    { label: 'Location & Contact', href: '/contact' },
    { label: 'Android Mobile App', href: 'https://play.google.com/store/apps/details?id=com.dip.padjadjaransuites' },
    { label: 'CMS Admin Portal', href: '/admin' },
  ]

  const createdFooter = await payload.updateGlobal({
    slug: 'footer-config',
    locale: 'id',
    data: {
      aboutText:
        'Menghadirkan pesona resor menenangkan dengan fasilitas konvensi lengkap dan berkelas internasional di kawasan Bogor Nirwana Residence (BNR), Bogor, Jawa Barat.',
      copyrightText: '© 2026 Padjadjaran Suites Resort & Convention Hotel Bogor. All Rights Reserved.',
      quickLinks: quickLinksId,
    },
  })

  if (createdFooter?.quickLinks) {
    await payload.updateGlobal({
      slug: 'footer-config',
      locale: 'en',
      data: {
        aboutText:
          'Delivering the soothing charm of a resort with comprehensive international-standard convention facilities in the prestigious Bogor Nirwana Residence (BNR) area, Bogor, West Java.',
        copyrightText: '© 2026 Padjadjaran Suites Resort & Convention Hotel Bogor. All Rights Reserved.',
        quickLinks: createdFooter.quickLinks.map((item: any, idx: number) => ({
          id: item.id,
          label: quickLinksEn[idx]?.label || item.label,
          href: quickLinksEn[idx]?.href || item.href,
        })),
      },
    })
  }
  console.log('   FooterConfig Global seeded successfully.')

  // 4. Seed Reviews Collection
  console.log('4. Seeding Reviews Collection...')
  const reviewsData = [
    {
      name: 'Budi Santoso & Keluarga',
      stayDate: 'Januari 2026 • Liburan Akhir Pekan',
      source: 'google' as const,
      rating: 5,
      commentId:
        'Resor yang sangat tenang dan menyegarkan di Bogor. Kamarnya luas, bersih, dan kasurnya sangat empuk. Sarapan di Restoran Hegarmanah dengan pemandangan Gunung Salak benar-benar luar biasa. Pasti akan kembali lagi.',
      commentEn:
        'A remarkably serene and refreshing resort in Bogor. The room was spacious, spotless, and the mattress was exceptionally plush. Breakfast at Hegarmanah Restaurant with mountain views was unforgettable. We will definitely return.',
    },
    {
      name: 'Jessica Wibowo',
      stayDate: 'Desember 2025 • Resepsi Pernikahan',
      source: 'direct' as const,
      rating: 5,
      commentId:
        'Bale Pakuan Ballroom megah sekali! Plafon tinggi, tata akustik suara jernih, dan makanan buffet prasmanan dipuji seluruh tamu undangan kami. Pelayanan staf sangat profesional.',
      commentEn:
        'Bale Pakuan Ballroom is grand and prestigious! High ceilings, crystal-clear acoustics, and the catering buffet was praised by all our guests. Staff service was extraordinarily professional.',
    },
    {
      name: 'Rian Pratama',
      stayDate: 'Februari 2026 • Rapat Korporat',
      source: 'tripadvisor' as const,
      rating: 5,
      commentId:
        'Fasilitas ruang meeting Rancage lengkap dan terawat. Koneksi internet cepat untuk hybrid meeting perusahaan kami. Lokasi strategis di dalam kawasan BNR Bogor.',
      commentEn:
        'Rancage meeting room facilities are complete and well-maintained. Fast, reliable internet connection for our hybrid video conference. Strategic location in BNR Bogor.',
    },
  ]

  for (const rev of reviewsData) {
    const existing = await payload.find({
      collection: 'reviews',
      where: {
        guestName: { equals: rev.name },
      },
      limit: 1,
    })

    if (existing.docs.length === 0) {
      const createdRev = await payload.create({
        collection: 'reviews',
        locale: 'id',
        data: {
          guestName: rev.name,
          stayDate: rev.stayDate,
          source: rev.source,
          rating: rev.rating,
          comment: rev.commentId,
          isPublished: true,
        },
      })

      if (createdRev) {
        await payload.update({
          collection: 'reviews',
          id: createdRev.id,
          locale: 'en',
          data: {
            comment: rev.commentEn,
          },
        })
      }
    }
  }
  console.log('   Reviews Collection seeded successfully.')

  // 5. Seed Galleries Collection (Virtual Tour & Resort Highlights)
  console.log('5. Seeding Galleries Collection...')
  const galleryScenes = [
    {
      slug: 'ballroom',
      titleId: 'Bale Pakuan Grand Ballroom',
      titleEn: 'Bale Pakuan Grand Ballroom',
      category: 'events' as const,
      imageUrl: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/ballroom-1.jpg.jpeg',
      captionId: 'Kapasitas hingga 1.000 Tamu',
      captionEn: 'Capacity up to 1,000 Guests',
      descId:
        'Gedung konvensi mandiri berkapasitas hingga 1.000 pax dengan langit-langit setinggi 7 meter dan lampu chandelier mewah.',
      descEn:
        'Standalone convention venue with 7-meter high ceilings, sparkling crystal chandeliers, and state-of-the-art acoustic sound system.',
      isVirtualTour: true,
      order: 1,
    },
    {
      slug: 'royal-suite',
      titleId: 'Royal Suite Luxury Bedroom & Living Area',
      titleEn: 'Royal Suite Luxury Bedroom & Living Area',
      category: 'rooms' as const,
      imageUrl: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/royal.jpg.jpeg',
      captionId: 'Suite Termewah 54 m²',
      captionEn: 'Most Luxurious 54 m² Suite',
      descId:
        'Suite termewah seluas 54 m² dengan ruang tamu privat, meja kerja eksekutif, dan kamar mandi marmer.',
      descEn:
        'Our most prestigious 54 m² suite featuring a private living room, executive work desk, and marble bathroom with panoramic mountain views.',
      isVirtualTour: true,
      order: 2,
    },
    {
      slug: 'superior',
      titleId: 'Superior Room Minimalis Modern',
      titleEn: 'Superior Modern Minimalist Room',
      category: 'rooms' as const,
      imageUrl: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/superior.jpg.jpeg',
      captionId: 'Kamar Modern 22 m²',
      captionEn: 'Modern Room 22 m²',
      descId:
        'Kamar nyaman seluas 22 m² berkonsep modern minimalis dengan pemandangan asri kawasan Bogor.',
      descEn:
        'Tranquil 22 m² sanctuary with sleek contemporary design and serene views of the Bogor Nirwana landscape.',
      isVirtualTour: true,
      order: 3,
    },
    {
      slug: 'hegarmanah',
      titleId: 'Restoran Hegarmanah Area Terbuka',
      titleEn: 'Hegarmanah Scenic Open-Air Restaurant',
      category: 'dining' as const,
      imageUrl: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/hegarmanah-1.jpg.jpeg',
      captionId: 'Semi-Outdoor Scenic Dining',
      captionEn: 'Semi-Outdoor Scenic Dining',
      descId:
        'Area santap terbuka dengan udara sejuk pegunungan dan sajian khas kuliner Sunda favorit.',
      descEn:
        'Scenic open-air dining terrace serving signature Sundanese feasts and refreshing tropical beverages.',
      isVirtualTour: true,
      order: 4,
    },
    {
      slug: 'lobby',
      titleId: 'Lobby Utama & Reception Lounge',
      titleEn: 'Grand Lobby & Reception Lounge',
      category: 'resort' as const,
      imageUrl: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/lobby-loung-1.jpg.jpeg',
      captionId: 'Hospitality Sambutan Hangat',
      captionEn: 'Warm Hospitality Reception',
      descId:
        'Ruang resepsionis dan lounge yang menyambut kedatangan Anda dengan keanggunan bintang lima.',
      descEn:
        'Grand lobby lounge welcoming you with five-star warmth, bespoke service, and relaxing ambiance.',
      isVirtualTour: true,
      order: 5,
    },
  ]

  for (const scene of galleryScenes) {
    const existing = await payload.find({
      collection: 'galleries',
      where: {
        slug: { equals: scene.slug },
      },
      limit: 1,
    })

    if (existing.docs.length === 0) {
      const createdGal = await payload.create({
        collection: 'galleries',
        locale: 'id',
        data: {
          title: scene.titleId,
          slug: scene.slug,
          category: scene.category,
          imageUrl: scene.imageUrl,
          caption: scene.captionId,
          description: scene.descId,
          isVirtualTour: scene.isVirtualTour,
          order: scene.order,
        },
      })

      if (createdGal) {
        await payload.update({
          collection: 'galleries',
          id: createdGal.id,
          locale: 'en',
          data: {
            title: scene.titleEn,
            caption: scene.captionEn,
            description: scene.descEn,
          },
        })
      }
    }
  }
  console.log('   Galleries Collection seeded successfully.')

  console.log('All CMS components seeded and synced successfully!')
  process.exit(0)
}

seedAll().catch((err) => {
  console.error('Master seed failed:', err)
  process.exit(1)
})
