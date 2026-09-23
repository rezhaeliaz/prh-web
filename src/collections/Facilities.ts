import type { CollectionConfig } from 'payload'

export const Facilities: CollectionConfig = {
  slug: 'facilities',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'openingHours', 'order'],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      label: 'Nama Fasilitas (Contoh: Kolam Renang Infinity, Luxury Spa)',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar' },
      label: 'URL Slug',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Wellness & Spa', value: 'wellness' },
        { label: 'Recreation & Pool', value: 'recreation' },
        { label: 'Family & Kids', value: 'family' },
        { label: 'Hotel Services', value: 'services' },
      ],
      label: 'Kategori Fasilitas',
    },
    {
      name: 'tagline',
      type: 'text',
      localized: true,
      label: 'Tagline Singkat',
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
      label: 'Deskripsi Fasilitas',
    },
    {
      name: 'openingHours',
      type: 'text',
      label: 'Jam Operasional (misal: 06:00 - 20:00 WIB)',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto Utama (Upload)',
    },
    {
      name: 'imageUrl',
      type: 'text',
      label: 'URL Foto Utama (Cadangan / Eksternal)',
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Galeri Foto',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'isHighlight',
      type: 'checkbox',
      defaultValue: false,
      label: 'Tampilkan di Sorotan Homepage',
      admin: { position: 'sidebar' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      label: 'Urutan Tampil',
      admin: { position: 'sidebar' },
    },
  ],
}
