import type { CollectionConfig } from 'payload'

export const Galleries: CollectionConfig = {
  slug: 'galleries',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'isVirtualTour', 'order'],
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
      label: 'Judul Foto / Spot',
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug Unik (Opsional)',
      admin: { position: 'sidebar' },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'resort',
      options: [
        { label: 'Kamar & Suites', value: 'rooms' },
        { label: 'Restoran & Kuliner', value: 'dining' },
        { label: 'Fasilitas & Kolam Renang', value: 'facilities' },
        { label: 'Ballroom & Pertemuan', value: 'events' },
        { label: 'Pemandangan & Arsitektur Resor', value: 'resort' },
      ],
      label: 'Kategori Galeri',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'File Foto (Media Library)',
    },
    {
      name: 'imageUrl',
      type: 'text',
      label: 'URL Foto Langsung (CDN / Eksternal jika tidak upload)',
    },
    {
      name: 'caption',
      type: 'text',
      localized: true,
      label: 'Keterangan Singkat Foto (Caption)',
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: 'Deskripsi Lengkap Spot / Virtual Tour',
    },
    {
      name: 'isVirtualTour',
      type: 'checkbox',
      defaultValue: false,
      label: 'Tampilkan di Virtual Tour 360',
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
