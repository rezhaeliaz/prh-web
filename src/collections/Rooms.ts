import type { CollectionConfig } from 'payload'

export const Rooms: CollectionConfig = {
  slug: 'rooms',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'basePrice', 'capacity', 'order'],
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
      label: 'Nama Kamar (Contoh: Superior Room)',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
      label: 'URL Slug (contoh: superior-room)',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Superior', value: 'superior' },
        { label: 'Executive', value: 'executive' },
        { label: 'Royal Suite', value: 'royal-suite' },
        { label: 'Family Suite', value: 'family-suite' },
      ],
      label: 'Kategori Kamar',
    },
    {
      name: 'tagline',
      type: 'text',
      localized: true,
      label: 'Tagline Singkat (misal: "Kenyamanan modern dengan pemandangan pegunungan")',
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
          name: 'size',
          type: 'number',
          required: true,
          label: 'Ukuran Kamar (m²)',
          admin: { width: '25%' },
        },
        {
          name: 'bedType',
          type: 'text',
          required: true,
          localized: true,
          label: 'Tipe Tempat Tidur (misal: 1 King Bed atau 2 Twin Beds)',
          admin: { width: '35%' },
        },
        {
          name: 'capacity',
          type: 'number',
          required: true,
          defaultValue: 2,
          label: 'Kapasitas Tamu (Dewasa)',
          admin: { width: '20%' },
        },
        {
          name: 'order',
          type: 'number',
          defaultValue: 0,
          label: 'Urutan Tampil',
          admin: { width: '20%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'basePrice',
          type: 'number',
          required: true,
          label: 'Harga Dasar (IDR / malam)',
          admin: { width: '50%' },
        },
        {
          name: 'discountPrice',
          type: 'number',
          label: 'Harga Promo (IDR / malam - Opsional)',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto Utama Kamar (Upload)',
    },
    {
      name: 'imageUrl',
      type: 'text',
      label: 'URL Foto Utama (Cadangan / Eksternal)',
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Galeri Foto Kamar',
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
      name: 'amenities',
      type: 'array',
      label: 'Fasilitas Kamar',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          localized: true,
          label: 'Nama Fasilitas (misal: Wi-Fi Cepat, Smart TV, Bathrobe)',
        },
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Wi-Fi', value: 'wifi' },
            { label: 'Tempat Tidur', value: 'bed' },
            { label: 'TV Layar Datar', value: 'tv' },
            { label: 'Air Conditioner', value: 'air-conditioning' },
            { label: 'Kamar Mandi & Shower', value: 'shower' },
            { label: 'Bathtub Mewah', value: 'bath' },
            { label: 'Pemandangan Gunung / Kota', value: 'mountain' },
            { label: 'Balkon Pribadi', value: 'balcony' },
            { label: 'Pembuat Kopi / Teh', value: 'coffee' },
            { label: 'Mini Bar / Kulkas', value: 'fridge' },
            { label: 'Brankas Pribadi', value: 'safe' },
            { label: 'Ruang Tamu Terpisah', value: 'sofa' },
            { label: 'Layanan Kamar 24 Jam', value: 'room-service' },
          ],
          label: 'Ikon Fasilitas',
        },
      ],
    },
    {
      name: 'virtualTourUrl',
      type: 'text',
      label: 'URL Virtual Tour 360° (Opsional - Kuula / Matterport / Custom)',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Tampilkan di Homepage (Highlight)',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
