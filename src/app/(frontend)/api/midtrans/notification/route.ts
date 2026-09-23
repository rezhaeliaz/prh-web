import { NextResponse } from 'next/server'
import crypto from 'crypto'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function POST(req: Request) {
  try {
    const notification = await req.json()
    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      transaction_status,
      fraud_status,
      payment_type,
      transaction_id,
    } = notification

    if (!order_id || !transaction_status) {
      return NextResponse.json(
        { error: 'Format notifikasi Midtrans tidak valid.' },
        { status: 400 }
      )
    }

    // Verify signature key if real Midtrans server key is provided
    const serverKey = process.env.MIDTRANS_SERVER_KEY
    if (serverKey && !serverKey.includes('demo') && signature_key) {
      const hashInput = `${order_id}${status_code}${gross_amount}${serverKey}`
      const calculatedSignature = crypto.createHash('sha512').update(hashInput).digest('hex')

      if (calculatedSignature !== signature_key) {
        console.warn('Signature verification failed for order:', order_id)
        return NextResponse.json({ error: 'Signature Key tidak valid' }, { status: 403 })
      }
    }

    // Determine booking status
    let bookingStatus: 'pending' | 'paid' | 'cancelled' | 'expired' = 'pending'

    if (transaction_status === 'capture') {
      if (fraud_status === 'challenge') {
        bookingStatus = 'pending'
      } else if (fraud_status === 'accept') {
        bookingStatus = 'paid'
      }
    } else if (transaction_status === 'settlement') {
      bookingStatus = 'paid'
    } else if (transaction_status === 'cancel' || transaction_status === 'deny') {
      bookingStatus = 'cancelled'
    } else if (transaction_status === 'expire') {
      bookingStatus = 'expired'
    } else if (transaction_status === 'pending') {
      bookingStatus = 'pending'
    }

    // Update in Payload CMS
    try {
      const payload = await getPayload({ config: configPromise })

      const matchingBookings = await payload.find({
        collection: 'bookings',
        where: {
          bookingCode: {
            equals: order_id,
          },
        },
        limit: 1,
      })

      if (matchingBookings.docs.length > 0) {
        const bookingId = matchingBookings.docs[0].id
        await payload.update({
          collection: 'bookings',
          id: bookingId,
          data: {
            status: bookingStatus,
            paymentMethod: payment_type || matchingBookings.docs[0].paymentMethod || 'Midtrans',
            midtransTransactionId: transaction_id || '',
          },
        })

        console.log(`[Midtrans Webhook] Booking ${order_id} status updated to: ${bookingStatus}`)
      } else {
        console.log(`[Midtrans Webhook] Booking with code ${order_id} not found in database.`)
      }
    } catch (cmsErr) {
      console.error('[Midtrans Webhook] Error updating booking in Payload CMS:', cmsErr)
    }

    return NextResponse.json({
      status: 'OK',
      message: `Notifikasi transaksi ${order_id} berhasil diproses.`,
      bookingStatus,
    })
  } catch (error: any) {
    console.error('Midtrans Notification Error:', error)
    return NextResponse.json(
      { error: error?.message || 'Gagal memproses notifikasi Midtrans.' },
      { status: 500 }
    )
  }
}
