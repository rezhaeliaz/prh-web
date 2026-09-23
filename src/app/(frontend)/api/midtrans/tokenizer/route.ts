import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { orderId, grossAmount, customerDetails, itemDetails } = body

    const serverKey = process.env.MIDTRANS_SERVER_KEY || 'SB-Mid-server-demo'
    const isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true'

    // If actual Midtrans credentials are demo/sandbox dummy, return a simulated Snap Token
    if (serverKey.includes('exampleKey') || serverKey.includes('demo')) {
      const simulatedToken = `snap-token-simulated-${orderId}-${Date.now()}`
      const redirectUrl = `https://app.sandbox.midtrans.com/snap/v2/vtweb/${simulatedToken}`

      return NextResponse.json({
        token: simulatedToken,
        redirect_url: redirectUrl,
        mode: 'sandbox_simulation',
        message: 'Midtrans sandbox simulated token generated successfully.',
      })
    }

    // Call Midtrans Snap API
    const authString = Buffer.from(`${serverKey}:`).toString('base64')
    const midtransEndpoint = isProduction
      ? 'https://app.midtrans.com/snap/v1/transactions'
      : 'https://app.sandbox.midtrans.com/snap/v1/transactions'

    const response = await fetch(midtransEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify({
        transaction_details: {
          order_id: orderId,
          gross_amount: grossAmount,
        },
        customer_details: customerDetails,
        item_details: itemDetails,
        credit_card: {
          secure: true,
        },
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Gagal berkomunikasi dengan gateway Midtrans.')
    }

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Midtrans Tokenizer Error:', error)
    return NextResponse.json(
      { error: error?.message || 'Gagal membuat token pembayaran Midtrans.' },
      { status: 500 }
    )
  }
}
