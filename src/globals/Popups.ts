import type { GlobalConfig } from 'payload'

export const Popups: GlobalConfig = {
  slug: 'popups',
  label: 'Popup Banner Promo & Notifikasi',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'isEnabled',
      type: 'checkbox',
      defaultValue: false,
      label: 'Aktifkan Popup Promo',
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
      label: 'Judul Popup',
    },
    {
      name: 'content',
      type: 'textarea',
      localized: true,
      label: 'Pesan / Informasi Promo',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Gambar Banner Popup',
    },
    {
      name: 'buttonText',
      type: 'text',
      localized: true,
      label: 'Teks Tombol CTA',
    },
    {
      name: 'buttonLink',
      type: 'text',
      label: 'Tautan Tombol CTA (misal: /offers/promo-lebaran)',
    },
  ],
}
