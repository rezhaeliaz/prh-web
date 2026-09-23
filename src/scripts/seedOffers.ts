import { getPayload } from 'payload'
import config from '../payload.config'
import { OFFERS_DATA_ID, OFFERS_DATA_EN } from '../data/hotelData'

async function seed() {
  console.log('Initializing Payload...')
  const payload = await getPayload({ config })

  console.log('Seeding / Updating Offers...')

  for (let i = 0; i < OFFERS_DATA_ID.length; i++) {
    const offerId = OFFERS_DATA_ID[i]
    const offerEn = OFFERS_DATA_EN[i]

    console.log(`Processing offer ${i + 1}/7: ${offerId.slug}`)

    const existing = await payload.find({
      collection: 'offers',
      where: {
        slug: { equals: offerId.slug },
      },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      const doc = existing.docs[0] as any
      console.log(`  Updating existing doc ID ${doc.id} for locale 'id'...`)

      const updatedId = await payload.update({
        collection: 'offers',
        id: doc.id,
        locale: 'id',
        draft: false,
        data: {
          title: offerId.title,
          category: offerId.category,
          categoryLabel: offerId.categoryLabel,
          discountBadge: offerId.discountBadge,
          price: offerId.price,
          validUntilText: offerId.validUntil,
          shortDescription: offerId.shortDescription,
          inclusions: doc.inclusions && doc.inclusions.length > 0
            ? doc.inclusions.map((row: any, idx: number) => ({
                id: row.id,
                item: offerId.inclusions[idx] || row.item || '',
              }))
            : offerId.inclusions.map((item) => ({ item })),
          terms: doc.terms && doc.terms.length > 0
            ? doc.terms.map((row: any, idx: number) => ({
                id: row.id,
                item: offerId.terms[idx] || row.item || '',
              }))
            : offerId.terms.map((item) => ({ item })),
          imageUrl: offerId.featuredImage,
          ctaType: offerId.ctaType as any,
          ctaLink: offerId.ctaLink,
          ctaText: offerId.ctaText,
          order: i + 1,
          isActive: true,
          _status: 'published',
        },
      })

      if (offerEn && updatedId) {
        console.log(`  Updating doc ID ${doc.id} for locale 'en'...`)
        await payload.update({
          collection: 'offers',
          id: doc.id,
          locale: 'en',
          draft: false,
          data: {
            title: offerEn.title,
            categoryLabel: offerEn.categoryLabel,
            discountBadge: offerEn.discountBadge,
            price: offerEn.price,
            validUntilText: offerEn.validUntil,
            shortDescription: offerEn.shortDescription,
            inclusions: updatedId.inclusions && updatedId.inclusions.length > 0
              ? updatedId.inclusions.map((row: any, idx: number) => ({
                  id: row.id,
                  item: offerEn.inclusions[idx] || row.item || '',
                }))
              : offerEn.inclusions.map((item) => ({ item })),
            terms: updatedId.terms && updatedId.terms.length > 0
              ? updatedId.terms.map((row: any, idx: number) => ({
                  id: row.id,
                  item: offerEn.terms[idx] || row.item || '',
                }))
              : offerEn.terms.map((item) => ({ item })),
            ctaText: offerEn.ctaText,
          },
        })
      }
    }
  }

  console.log('Seeding finished successfully!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
