import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'capacityMax', 'order'],
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
      label: 'Nama Ruangan / Paket (Contoh: Bale Pakuan Grand Ballroom, Paket Pernikahan Royal)',
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
        { label: 'Grand Ballroom', value: 'ballroom' },
        { label: 'Meeting Room (Ruang Pertemuan)', value: 'meeting-room' },
        { label: 'Wedding Package (Paket Pernikahan)', value: 'wedding' },
        { label: 'Social & Birthday (Ulang Tahun & Acara Sosial)', value: 'social' },
      ],
      label: 'Tipe Fasilitas / Penawaran Acara',
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
          name: 'areaSize',
          type: 'text',
          label: 'Luas Ruangan (misal: 1,200 m²)',
          admin: { width: '33%' },
        },
        {
          name: 'ceilingHeight',
          type: 'text',
          label: 'Tinggi Plafon (misal: 7 meter)',
          admin: { width: '33%' },
        },
        {
          name: 'capacityMax',
          type: 'number',
          label: 'Kapasitas Maksimal (Orang)',
          admin: { width: '33%' },
        },
      ],
    },
    {
      name: 'seatingLayouts',
      type: 'array',
      label: 'Kapasitas Berdasarkan Susunan Meja/Kursi',
      fields: [
        {
          name: 'style',
          type: 'select',
          required: true,
          options: [
            { label: 'Theatre Style', value: 'theatre' },
            { label: 'Classroom Style', value: 'classroom' },
            { label: 'Round Table / Banquet', value: 'banquet' },
            { label: 'U-Shape', value: 'u-shape' },
            { label: 'Cocktail / Standing', value: 'cocktail' },
          ],
          label: 'Layout',
        },
        {
          name: 'capacity',
          type: 'number',
          required: true,
          label: 'Kapasitas (Pax)',
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
      label: 'Galeri Foto Acara',
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
      name: 'brochurePdf',
      type: 'upload',
      relationTo: 'media',
      label: 'Brosur Paket Lengkap (PDF)',
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
