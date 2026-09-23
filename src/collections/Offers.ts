import type { CollectionConfig } from 'payload'

export const Offers: CollectionConfig = {
  slug: 'offers',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'price', 'discountBadge', 'isActive', 'order'],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Judul Promo / Penawaran (Contoh: Honeymoon Package Royal Suite)',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar' },
      label: 'URL Slug (Contoh: honeymoon-package)',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'stay',
      options: [
        { label: 'Kamar & Menginap (Stay)', value: 'stay' },
        { label: 'Restoran & Kuliner (Dining)', value: 'dining' },
        { label: 'Petualangan & Wisata (Adventure)', value: 'adventure' },
        { label: 'Pernikahan & Acara Sosial (Events)', value: 'events' },
        { label: 'Meeting & Edukasi (Meetings)', value: 'meeting' },
      ],
      label: 'Kategori Penawaran',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'categoryLabel',
          type: 'text',
          localized: true,
          label: 'Label Kategori Tampil (misal: "Paket Romantis")',
          admin: { width: '50%' },
        },
        {
          name: 'discountBadge',
          type: 'text',
          localized: true,
          label: 'Badge Penawaran (misal: "Paket Favorit", "Diskon s/d 20%")',
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'price',
          type: 'text',
          localized: true,
          label: 'Tarif / Harga Promo (misal: "Rp 1.985.000,- nett / malam")',
          admin: { width: '50%' },
        },
        {
          name: 'validUntilText',
          type: 'text',
          localized: true,
          label: 'Masa Berlaku (misal: "31 Desember 2026")',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      localized: true,
      label: 'Ringkasan Promo Singkat',
    },
    {
      name: 'inclusions',
      type: 'array',
      label: 'Fasilitas & Keuntungan Termasuk (Inclusions)',
      fields: [
        {
          name: 'item',
          type: 'text',
          localized: true,
          required: true,
          label: 'Keuntungan / Benefit',
        },
      ],
    },
    {
      name: 'terms',
      type: 'array',
      label: 'Syarat & Ketentuan (Terms & Conditions)',
      fields: [
        {
          name: 'item',
          type: 'text',
          localized: true,
          required: true,
          label: 'Syarat & Ketentuan',
        },
      ],
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
      label: 'Deskripsi Tambahan / Catatan Khusus (Opsional)',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto Banner Promo (Upload dari Media Library)',
    },
    {
      name: 'imageUrl',
      type: 'text',
      label: 'URL Foto Banner (CDN / Link Eksternal jika tidak upload)',
    },
    {
      name: 'ctaType',
      type: 'select',
      defaultValue: 'booking',
      options: [
        { label: 'Reservasi Online (/booking)', value: 'booking' },
        { label: 'WhatsApp Concierge', value: 'whatsapp' },
        { label: 'Proposal Acara (/events#rfp)', value: 'rfp' },
      ],
      admin: { position: 'sidebar' },
      label: 'Tipe Aksi Tombol (CTA)',
    },
    {
      name: 'ctaLink',
      type: 'text',
      defaultValue: '/booking',
      admin: { position: 'sidebar' },
      label: 'Link Tombol CTA (URL)',
    },
    {
      name: 'ctaText',
      type: 'text',
      localized: true,
      admin: { position: 'sidebar' },
      label: 'Teks Tombol CTA (misal: "Pesan Sekarang")',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar' },
      label: 'Urutan Tampil',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Aktifkan Promo Ini',
      admin: { position: 'sidebar' },
    },
    {
      name: 'promoCode',
      type: 'text',
      label: 'Kode Voucher (Opsional)',
      admin: { position: 'sidebar' },
    },
  ],
}
