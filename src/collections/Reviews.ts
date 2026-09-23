import type { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'guestName',
    defaultColumns: ['guestName', 'source', 'rating', 'stayDate', 'isPublished'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'guestName',
      type: 'text',
      required: true,
      label: 'Nama Tamu',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'source',
          type: 'select',
          required: true,
          defaultValue: 'google',
          options: [
            { label: 'Google Review', value: 'google' },
            { label: 'Tripadvisor', value: 'tripadvisor' },
            { label: 'Agoda / Booking.com', value: 'ota' },
            { label: 'Direct Guest', value: 'direct' },
          ],
          label: 'Sumber Ulasan',
          admin: { width: '33%' },
        },
        {
          name: 'rating',
          type: 'number',
          required: true,
          min: 1,
          max: 5,
          defaultValue: 5,
          label: 'Bintang (1-5)',
          admin: { width: '33%' },
        },
        {
          name: 'stayDate',
          type: 'text',
          label: 'Waktu Menginap (misal: "Januari 2026")',
          admin: { width: '34%' },
        },
      ],
    },
    {
      name: 'comment',
      type: 'textarea',
      required: true,
      localized: true,
      label: 'Isi Ulasan Tamu',
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: true,
      label: 'Publikasikan di Website',
      admin: { position: 'sidebar' },
    },
  ],
}
