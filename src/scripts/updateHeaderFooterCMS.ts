import { getPayload } from 'payload'
import config from '../payload.config'

async function updateHeaderFooter() {
  console.log('Initializing Payload for Header & Footer update...')
  const payload = await getPayload({ config })

  const navItemsId = [
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

  const navItemsEn = [
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

  console.log('Updating HeaderConfig ID...')
  const updatedHeaderId = await payload.updateGlobal({
    slug: 'header-config',
    locale: 'id',
    data: {
      navItems: navItemsId,
      bookButtonText: 'Pesan Kamar',
    },
  })

  if (updatedHeaderId?.navItems) {
    console.log('Updating HeaderConfig EN...')
    await payload.updateGlobal({
      slug: 'header-config',
      locale: 'en',
      data: {
        navItems: updatedHeaderId.navItems.map((item: any, idx: number) => {
          const enItem = navItemsEn[idx]
          return {
            id: item.id,
            label: enItem?.label || item.label,
            href: enItem?.href || item.href,
            subItems: item.subItems && enItem?.subItems
              ? item.subItems.map((sub: any, sIdx: number) => ({
                  id: sub.id,
                  label: enItem.subItems[sIdx]?.label || sub.label,
                  href: enItem.subItems[sIdx]?.href || sub.href,
                  description: enItem.subItems[sIdx]?.description || sub.description,
                }))
              : item.subItems,
          }
        }),
        bookButtonText: 'Book Now',
      },
    })
  }

  // Footer
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

  console.log('Updating FooterConfig ID...')
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
    console.log('Updating FooterConfig EN...')
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

  console.log('Header & Footer successfully updated in CMS!')
  process.exit(0)
}

updateHeaderFooter().catch((err) => {
  console.error('Error updating Header & Footer:', err)
  process.exit(1)
})
