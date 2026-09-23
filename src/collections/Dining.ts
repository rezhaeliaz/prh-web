import type { CollectionConfig } from 'payload'

export const Dining: CollectionConfig = {
  slug: 'dining',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'openingHours', 'order'],
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
      label: 'Nama Restoran / Lounge (Contoh: Restoran Hegarmanah)',
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
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Outdoor Restaurant', value: 'outdoor' },
        { label: 'Indoor Restaurant', value: 'indoor' },
        { label: 'Lounge & Bar', value: 'lounge' },
        { label: 'Poolside Cafe', value: 'poolside' },
      ],
      label: 'Kategori Tempat',
    },
    {
      name: 'cuisine',
      type: 'text',
      localized: true,
      label: 'Jenis Masakan (misal: "Indonesian Sundanese & International Cuisine")',
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
      label: 'Deskripsi Lengkap',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'openingHours',
          type: 'text',
          required: true,
          label: 'Jam Operasional (misal: 06:00 - 23:00 WIB)',
          admin: { width: '50%' },
        },
        {
          name: 'capacity',
          type: 'text',
          label: 'Kapasitas Tempat Duduk (misal: 150 Kursi)',
          admin: { width: '50%' },
        },
      ],
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
      label: 'Galeri Foto Suasana & Makanan',
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
      name: 'menuPdf',
      type: 'upload',
      relationTo: 'media',
      label: 'Buku Menu Digital (PDF)',
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
