import { getPayload } from 'payload'
import config from '../payload.config'
import { getDestinationsData } from '../data/destinationsData'

async function seedDestinations() {
  console.log('Initializing Payload for Destinations seeding...')
  const payload = await getPayload({ config })

  const { destinations: destinationsId } = getDestinationsData('id')
  const { destinations: destinationsEn } = getDestinationsData('en')

  console.log(`Found ${destinationsId.length} destinations to seed...`)

  for (let i = 0; i < destinationsId.length; i++) {
    const item = destinationsId[i]
    const itemEn = destinationsEn[i]

    console.log(`Seeding destination [${i + 1}/${destinationsId.length}]: ${item.name} (${item.id})...`)

    // Check if exists
    const existing = await payload.find({
      collection: 'destinations' as any,
      where: {
        slug: {
          equals: item.id,
        },
      },
    })

    const payloadDataId = {
      name: item.name,
      slug: item.id,
      category: item.category,
      categoryLabel: item.categoryLabel,
      distance: item.distance,
      travelTime: item.travelTime,
      tagline: item.tagline,
      description: item.description,
      imageUrl: item.imageUrl,
      googleMapsUrl: item.googleMapsUrl,
      recommendedFor: item.recommendedFor,
      highlights: item.highlights.map((h) => ({ text: h })),
      order: i + 1,
      isActive: true,
    }

    let docId: string | number

    if (existing.docs && existing.docs.length > 0) {
      docId = existing.docs[0].id
      await payload.update({
        collection: 'destinations' as any,
        id: docId,
        locale: 'id',
        data: payloadDataId,
      })
      console.log(`   Updated ID locale for ${item.name} (id: ${docId})`)
    } else {
      const created = await payload.create({
        collection: 'destinations' as any,
        locale: 'id',
        data: payloadDataId,
      })
      docId = created.id
      console.log(`   Created ${item.name} (id: ${docId})`)
    }

    // Now update English locale
    const payloadDataEn = {
      name: itemEn.name,
      categoryLabel: itemEn.categoryLabel,
      travelTime: itemEn.travelTime,
      tagline: itemEn.tagline,
      description: itemEn.description,
      recommendedFor: itemEn.recommendedFor,
      highlights: itemEn.highlights.map((h) => ({ text: h })),
    }

    await payload.update({
      collection: 'destinations' as any,
      id: docId,
      locale: 'en',
      data: payloadDataEn,
    })
    console.log(`   Updated EN locale for ${itemEn.name}`)
  }

  console.log('Destinations successfully seeded into Payload CMS!')
  process.exit(0)
}

seedDestinations().catch((err) => {
  console.error('Error seeding destinations:', err)
  process.exit(1)
})
