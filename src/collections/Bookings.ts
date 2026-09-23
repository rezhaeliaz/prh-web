import type { CollectionConfig } from 'payload'

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  admin: {
    useAsTitle: 'bookingCode',
    defaultColumns: ['bookingCode', 'guestName', 'room', 'checkIn', 'checkOut', 'status', 'totalAmount'],
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true, // Guest can initiate booking
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user && user.role === 'admin'),
  },
  fields: [
    {
      name: 'bookingCode',
      type: 'text',
      required: true,
      unique: true,
      label: 'Kode Reservasi (Contoh: PRH-2026-8891)',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'guestName',
          type: 'text',
          required: true,
          label: 'Nama Tamu',
          admin: { width: '50%' },
        },
        {
          name: 'guestEmail',
          type: 'email',
          required: true,
          label: 'Email Tamu',
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'guestPhone',
          type: 'text',
          required: true,
          label: 'No. WhatsApp / Telepon',
          admin: { width: '50%' },
        },
        {
          name: 'guestIdentityNumber',
          type: 'text',
          label: 'No. KTP / Paspor (Opsional)',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'room',
      type: 'relationship',
      relationTo: 'rooms',
      required: true,
      label: 'Tipe Kamar yang Dipesan',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'checkIn',
          type: 'date',
          required: true,
          label: 'Tanggal Check-in',
          admin: { width: '33%' },
        },
        {
          name: 'checkOut',
          type: 'date',
          required: true,
          label: 'Tanggal Check-out',
          admin: { width: '33%' },
        },
        {
          name: 'guestsCount',
          type: 'number',
          defaultValue: 2,
          required: true,
          label: 'Jumlah Tamu',
          admin: { width: '34%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'totalAmount',
          type: 'number',
          required: true,
          label: 'Total Pembayaran (IDR)',
          admin: { width: '50%' },
        },
        {
          name: 'status',
          type: 'select',
          defaultValue: 'pending',
          required: true,
          options: [
            { label: 'Menunggu Pembayaran (Pending)', value: 'pending' },
            { label: 'Lunas (Paid / Confirmed)', value: 'paid' },
            { label: 'Dibatalkan (Cancelled)', value: 'cancelled' },
            { label: 'Kadaluwarsa (Expired)', value: 'expired' },
          ],
          label: 'Status Reservasi',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'midtransTransactionId',
      type: 'text',
      label: 'ID Transaksi Midtrans / Snap Token',
      admin: { position: 'sidebar' },
    },
    {
      name: 'paymentMethod',
      type: 'text',
      label: 'Metode Pembayaran (QRIS, VA BCA, Mandiri, CC, dll)',
      admin: { position: 'sidebar' },
    },
    {
      name: 'specialRequests',
      type: 'textarea',
      label: 'Permintaan Khusus (Non-smoking, high floor, honeymoon, dll)',
    },
  ],
}
