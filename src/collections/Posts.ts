import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt'],
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
      label: 'Judul Artikel',
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
        { label: 'Berita & Pengumuman', value: 'news' },
        { label: 'Panduan Wisata Bogor', value: 'travel-guide' },
        { label: 'Tips & Inspirasi Pernikahan', value: 'wedding-tips' },
        { label: 'Kuliner & Resep Khas', value: 'culinary' },
      ],
      label: 'Kategori Artikel',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      localized: true,
      label: 'Ringkasan Singkat (Excerpt)',
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
      label: 'Isi Konten Artikel',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto Sampul Artikel (Upload)',
    },
    {
      name: 'imageUrl',
      type: 'text',
      label: 'URL Foto Sampul (Cadangan / Eksternal)',
    },
    {
      name: 'readTime',
      type: 'text',
      localized: true,
      label: 'Estimasi Waktu Baca (misal: "5 Menit Baca")',
    },
    {
      name: 'author',
      type: 'text',
      defaultValue: 'Padjadjaran Editorial',
      label: 'Penulis Artikel',
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar' },
      label: 'Tanggal Publikasi',
    },
  ],
}
