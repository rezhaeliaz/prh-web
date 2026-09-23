import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Pengaturan Website & Kontak',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'hotelName',
      type: 'text',
      required: true,
      defaultValue: 'Padjadjaran Suites Resort & Convention Hotel Bogor',
      label: 'Nama Resmi Hotel',
    },
    {
      name: 'tagline',
      type: 'text',
      localized: true,
      defaultValue: 'Where Luxury Meets Serene Mountain Views',
      label: 'Slogan / Tagline',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'phone',
          type: 'text',
          required: true,
          defaultValue: '+62 251 756 9000',
          label: 'Telepon Hotel',
          admin: { width: '33%' },
        },
        {
          name: 'whatsapp',
          type: 'text',
          required: true,
          defaultValue: '+62 851 8309 3061',
          label: 'WhatsApp Reservasi',
          admin: { width: '33%' },
        },
        {
          name: 'email',
          type: 'email',
          required: true,
          defaultValue: 'reservation@padjadjaransuitesresort.com',
          label: 'Email Reservasi',
          admin: { width: '34%' },
        },
      ],
    },
    {
      name: 'address',
      type: 'textarea',
      defaultValue: 'Jl. Bogor Inner Ring Road Lot XIX C-2 No. 17, Bogor Nirwana Residence, Bogor 16132, Jawa Barat, Indonesia',
      label: 'Alamat Lengkap Hotel',
    },
    {
      name: 'googleMapsUrl',
      type: 'text',
      defaultValue: 'https://maps.app.goo.gl/dEJUfkgHCUi57iWg8',
      label: 'Link Google Maps',
    },
    {
      type: 'group',
      name: 'socialMedia',
      label: 'Tautan Media Sosial',
      fields: [
        {
          name: 'instagram',
          type: 'text',
          defaultValue: 'https://www.instagram.com/padjadjaransuitesresort/',
          label: 'Instagram URL',
        },
        {
          name: 'facebook',
          type: 'text',
          defaultValue: 'https://www.facebook.com/padjadjaran.resort/?locale=id_ID',
          label: 'Facebook URL',
        },
        {
          name: 'tiktok',
          type: 'text',
          defaultValue: 'https://www.tiktok.com/@prh_bogor',
          label: 'TikTok URL',
        },
      ],
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo Utama Hotel',
    },
    {
      name: 'logoWhite',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo Warna Putih (Untuk Header Gelap / Transparan)',
    },
    {
      type: 'group',
      name: 'bookingConfig',
      label: 'Pengaturan Sistem Reservasi / Booking Engine',
      fields: [
        {
          name: 'engineType',
          type: 'select',
          defaultValue: 'third-party',
          options: [
            { label: 'Booking Engine Pihak Ketiga (Resmi be.dip.id - Realtime PMS)', value: 'third-party' },
            { label: 'Sistem Internal Baru (/booking)', value: 'internal' },
            { label: 'WhatsApp Concierge Langsung', value: 'whatsapp' },
          ],
          label: 'Sistem Reservasi yang Digunakan',
          admin: {
            description: 'Pilih sistem reservasi yang aktif saat tamu mengklik tombol Pesan Kamar atau Cek Ketersediaan.',
          },
        },
        {
          name: 'thirdPartyUrl',
          type: 'text',
          defaultValue: 'https://be.dip.id/booking/cekrooms?keyid=9de3264a0298106659401228618ea286',
          label: 'URL Booking Engine Pihak Ketiga',
          admin: {
            description: 'Tautan resmi sistem booking engine (misal: DIP Booking Engine dengan keyid hotel).',
          },
        },
      ],
    },
  ],
}
