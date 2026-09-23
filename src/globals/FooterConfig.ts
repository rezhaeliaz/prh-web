import type { GlobalConfig } from 'payload'

export const FooterConfig: GlobalConfig = {
  slug: 'footer-config',
  label: 'Pengaturan Footer & Hak Cipta',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'aboutText',
      type: 'textarea',
      localized: true,
      defaultValue: 'Padjadjaran Suites Resort & Convention Hotel Bogor menghadirkan perpaduan sempurna antara kemewahan resor yang menenangkan dan fasilitas konvensi berstandar internasional.',
      label: 'Teks Tentang Hotel di Footer',
    },
    {
      name: 'copyrightText',
      type: 'text',
      defaultValue: '© 2026 Padjadjaran Suites Resort & Convention Hotel Bogor. All Rights Reserved.',
      label: 'Teks Hak Cipta',
    },
    {
      name: 'quickLinks',
      type: 'array',
      label: 'Tautan Cepat (Quick Links)',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'href',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
