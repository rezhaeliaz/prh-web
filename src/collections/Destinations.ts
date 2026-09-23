import type { CollectionConfig } from 'payload'

export const Destinations: CollectionConfig = {
  slug: 'destinations',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'distance', 'travelTime', 'order'],
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
      label: 'Nama Destinasi (Contoh: The Jungle Waterpark BNR, Kebun Raya Bogor)',
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
      defaultValue: 'waterpark',
      options: [
        { label: 'Wahana Air & Keluarga (Waterpark)', value: 'waterpark' },
        { label: 'Alam Bebas & Offroad (Nature)', value: 'nature' },
        { label: 'Warisan Sejarah & Botani (Heritage)', value: 'heritage' },
        { label: 'Kuliner Legendaris (Culinary)', value: 'culinary' },
        { label: 'Olahraga & Golf (Golf)', value: 'golf' },
      ],
      label: 'Kategori Destinasi',
    },
    {
      name: 'categoryLabel',
      type: 'text',
      localized: true,
      label: 'Label Kategori Tampilan (Contoh: Wahana Air & Keluarga / Family Adventure)',
    },
    {
      name: 'distance',
      type: 'text',
      label: 'Jarak dari Hotel (Contoh: 350 m, 4.8 km, 12 km)',
    },
    {
      name: 'travelTime',
      type: 'text',
      localized: true,
      label: 'Estimasi Waktu Tempuh (Contoh: 4 menit jalan kaki, 15 menit berkendara)',
    },
    {
      name: 'tagline',
      type: 'text',
      localized: true,
      label: 'Tagline Singkat Daya Tarik',
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: 'Deskripsi Lengkap Destinasi',
    },
    {
      name: 'imageUrl',
      type: 'text',
      label: 'URL Gambar Eksternal / CDN (Direkomendasikan untuk stabilitas)',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Unggah Gambar Langsung (Opsional)',
    },
    {
      name: 'googleMapsUrl',
      type: 'text',
      label: 'Tautan Navigasi Google Maps Resmi',
    },
    {
      name: 'recommendedFor',
      type: 'text',
      localized: true,
      label: 'Rekomendasi Untuk (Contoh: Keluarga & anak-anak, Eksekutif MICE)',
    },
    {
      name: 'highlights',
      type: 'array',
      localized: true,
      label: 'Poin Daya Tarik Utama (Highlights)',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Poin Unggulan',
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 1,
      admin: { position: 'sidebar' },
      label: 'Urutan Tampil',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
      label: 'Aktifkan di Website Publik',
    },
  ],
}
