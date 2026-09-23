import { NextResponse } from 'next/server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      guestName,
      guestEmail,
      guestPhone,
      guestIdentityNumber,
      roomSlug,
      roomName,
      checkIn,
      checkOut,
      guestsCount,
      totalAmount,
      specialRequests,
      paymentMethod,
    } = body

    if (!guestName || !guestEmail || !guestPhone || !checkIn || !checkOut || !totalAmount) {
      return NextResponse.json(
        { error: 'Mohon lengkapi seluruh data reservasi yang diperlukan.' },
        { status: 400 }
      )
    }

    // Generate unique booking code
    const randomDigits = Math.floor(1000 + Math.random() * 9000)
    const bookingCode = `PRH-${new Date().getFullYear()}-${randomDigits}`

    let payloadBookingId = null
    try {
      const payload = await getPayload({ config: configPromise })

      // Find or create room reference if rooms exist in DB
      const existingRooms = await payload.find({
        collection: 'rooms',
        where: {
          slug: {
            equals: roomSlug,
          },
        },
        limit: 1,
      })

      const roomId = existingRooms.docs.length > 0 ? existingRooms.docs[0].id : null

      if (roomId) {
        const newBooking = await payload.create({
          collection: 'bookings',
          data: {
            bookingCode,
            guestName,
            guestEmail,
            guestPhone,
            guestIdentityNumber: guestIdentityNumber || '',
            room: roomId,
            checkIn: new Date(checkIn).toISOString(),
            checkOut: new Date(checkOut).toISOString(),
            guestsCount: Number(guestsCount) || 2,
            totalAmount: Number(totalAmount),
            status: 'pending',
            paymentMethod: paymentMethod || 'Midtrans / WhatsApp Direct',
            specialRequests: specialRequests || '',
          },
        })
        payloadBookingId = newBooking.id
      }
    } catch (cmsErr) {
      console.warn('Payload CMS direct collection save note:', cmsErr)
      // If collection is empty, gracefully proceed with booking code
    }

    return NextResponse.json({
      success: true,
      bookingCode,
      bookingId: payloadBookingId,
      message: 'Reservasi berhasil dibuat.',
      details: {
        bookingCode,
        guestName,
        roomName,
        checkIn,
        checkOut,
        totalAmount,
      },
    })
  } catch (error: any) {
    console.error('Booking API Error:', error)
    return NextResponse.json(
      { error: error?.message || 'Terjadi kesalahan sistem saat memproses reservasi.' },
      { status: 500 }
    )
  }
}
