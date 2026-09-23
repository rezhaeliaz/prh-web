import type { GlobalConfig } from 'payload'

export const HeaderConfig: GlobalConfig = {
  slug: 'header-config',
  label: 'Navigasi Menu Header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      label: 'Item Menu Navigasi Utama',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
          label: 'Teks Menu (misal: Kamar & Suites)',
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          label: 'Tautan URL (misal: /rooms)',
        },
        {
          name: 'subItems',
          type: 'array',
          label: 'Sub-Menu Dropdown (Opsional)',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              localized: true,
              label: 'Label Sub-menu',
            },
            {
              name: 'href',
              type: 'text',
              required: true,
              label: 'Tautan URL Sub-menu',
            },
            {
              name: 'description',
              type: 'text',
              localized: true,
              label: 'Deskripsi Singkat (Opsional)',
            },
          ],
        },
      ],
    },
    {
      name: 'bookButtonText',
      type: 'text',
      localized: true,
      defaultValue: 'Pesan Sekarang',
      label: 'Teks Tombol Reservasi',
    },
  ],
}
