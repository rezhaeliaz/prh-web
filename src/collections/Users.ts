import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nama Lengkap',
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'editor',
      required: true,
      options: [
        { label: 'Super Admin', value: 'admin' },
        { label: 'Content Editor', value: 'editor' },
        { label: 'Front Desk / Reservasi', value: 'reservations' },
      ],
      label: 'Peran / Hak Akses',
    },
  ],
}
