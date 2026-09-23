import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Halaman Beranda & Banner',
  access: {
    read: () => true,
  },
  fields: [
    // 1. Hero Section Group
    {
      type: 'group',
      name: 'hero',
      label: 'Hero Banner Utama Beranda',
      fields: [
        {
          name: 'badge',
          type: 'text',
          localized: true,
          defaultValue: 'Resor Bintang 4 & Konvensi Megah di Bogor',
          label: 'Badge Kemewahan Atas',
        },
        {
          name: 'titleLine1',
          type: 'text',
          localized: true,
          defaultValue: 'Kemewahan Resor Berpadu',
          label: 'Judul Baris 1',
        },
        {
          name: 'titleAccent',
          type: 'text',
          localized: true,
          defaultValue: 'Keindahan Alam',
          label: 'Kata Berwarna Emas (Accent)',
        },
        {
          name: 'titleLine2',
          type: 'text',
          localized: true,
          defaultValue: 'Gunung Salak',
          label: 'Judul Baris 2',
        },
        {
          name: 'subtitle',
          type: 'textarea',
          localized: true,
          defaultValue:
            'Nikmati peristirahatan tenang dengan pemandangan Gunung Salak, kamar luas bergaya modern Sunda, santapan khas Parahyangan, serta gedung konvensi mandiri terbesar di Bogor Nirwana Residence.',
          label: 'Deskripsi Subtitle Hero',
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Foto Latar Belakang Hero (Upload dari Media Library)',
        },
        {
          name: 'backgroundImageUrl',
          type: 'text',
          defaultValue: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/bilding-1.jpg.jpeg',
          label: 'URL Foto Latar Belakang Hero (Cadangan / CDN)',
        },
        {
          name: 'exploreRoomsText',
          type: 'text',
          localized: true,
          defaultValue: 'Jelajahi Kamar & Suites',
          label: 'Teks Tombol Eksplorasi Kamar',
        },
        {
          name: 'virtualTourText',
          type: 'text',
          localized: true,
          defaultValue: 'Virtual Tour 360°',
          label: 'Teks Tombol Virtual Tour',
        },
        {
          name: 'features',
          type: 'array',
          label: 'Tiga Poin Keunggulan Bawah Hero',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              localized: true,
              label: 'Teks Poin Keunggulan',
            },
            {
              name: 'icon',
              type: 'select',
              defaultValue: 'mountain',
              options: [
                { label: 'Gunung / Pemandangan Alam', value: 'mountain' },
                { label: 'Kalender / Event Ballroom', value: 'calendar' },
                { label: 'Kuliner / Restoran Sunda', value: 'dining' },
                { label: 'Bintang / Kemewahan', value: 'sparkle' },
              ],
              label: 'Pilihan Ikon',
            },
          ],
        },
      ],
    },

    // 2. Section Headers Group
    {
      type: 'group',
      name: 'sections',
      label: 'Judul & Deskripsi Tiap Section Beranda',
      fields: [
        {
          name: 'roomsSubtitle',
          type: 'text',
          localized: true,
          defaultValue: 'Akomodasi Eksklusif',
          label: 'Sub-judul Section Kamar',
        },
        {
          name: 'roomsTitle',
          type: 'text',
          localized: true,
          defaultValue: 'Pilihan Kamar & Suites Mewah',
          label: 'Judul Utama Section Kamar',
        },
        {
          name: 'roomsDesc',
          type: 'textarea',
          localized: true,
          defaultValue:
            'Setiap kamar dirancang dengan kenyamanan kelas atas, pemandangan Gunung Salak atau kolam renang yang asri, serta fasilitas modern terlengkap.',
          label: 'Deskripsi Section Kamar',
        },
        {
          name: 'diningSubtitle',
          type: 'text',
          localized: true,
          defaultValue: 'Cita Rasa Nusantara & Internasional',
          label: 'Sub-judul Section Restoran',
        },
        {
          name: 'diningTitle',
          type: 'text',
          localized: true,
          defaultValue: 'Restoran Hegarmanah & Jamuan Kuliner',
          label: 'Judul Utama Section Restoran',
        },
        {
          name: 'diningDesc',
          type: 'textarea',
          localized: true,
          defaultValue:
            'Sajikan momen bersantap istimewa dengan hidangan khas Sunda autentik, menu internasional pilihan, dan suasana sejuk pegunungan.',
          label: 'Deskripsi Section Restoran',
        },
        {
          name: 'eventsSubtitle',
          type: 'text',
          localized: true,
          defaultValue: 'Konvensi, Resepsi & Pertemuan Akbar',
          label: 'Sub-judul Section Acara & MICE',
        },
        {
          name: 'eventsTitle',
          type: 'text',
          localized: true,
          defaultValue: 'Bale Pakuan Grand Ballroom & Ruang Pertemuan',
          label: 'Judul Utama Section Acara',
        },
        {
          name: 'eventsDesc',
          type: 'textarea',
          localized: true,
          defaultValue:
            'Gedung konvensi mandiri termegah di kawasan Bogor Selatan dengan kapasitas hingga 1.000 tamu dan 20+ ruang pertemuan berfasilitas modern.',
          label: 'Deskripsi Section Acara',
        },
      ],
    },

    // 3. Subpage Header Banners
    {
      type: 'group',
      name: 'subpageBanners',
      label: 'Foto Banner Atas Halaman Sub (Header Hero)',
      fields: [
        {
          name: 'roomsBannerUrl',
          type: 'text',
          defaultValue: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/bilding-1.jpg.jpeg',
          label: 'Banner Halaman Kamar (/rooms)',
        },
        {
          name: 'diningBannerUrl',
          type: 'text',
          defaultValue: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/hegarmanah-1.jpg.jpeg',
          label: 'Banner Halaman Restoran (/dining)',
        },
        {
          name: 'eventsBannerUrl',
          type: 'text',
          defaultValue: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/ballroom-1.jpg.jpeg',
          label: 'Banner Halaman Acara & MICE (/events)',
        },
        {
          name: 'facilitiesBannerUrl',
          type: 'text',
          defaultValue: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/bilding.jpg.jpeg',
          label: 'Banner Halaman Fasilitas (/facilities)',
        },
        {
          name: 'virtualTourBannerUrl',
          type: 'text',
          defaultValue: 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/sunset-view.jpg.jpeg',
          label: 'Banner Bagian Virtual Tour Beranda',
        },
      ],
    },
  ],
}
