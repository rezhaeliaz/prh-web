import { getPayload } from 'payload'
import config from '../payload.config'
import fs from 'fs'
import path from 'path'

async function migrateAllMedia() {
  console.log('--- STARTING MEDIA MIGRATION TO PAYLOAD CMS ---')
  const payload = await getPayload({ config })

  const cacheDir = path.resolve(process.cwd(), 'media_cache')
  const catalogPath = path.join(cacheDir, 'catalog.json')

  if (!fs.existsSync(catalogPath)) {
    throw new Error('catalog.json not found in media_cache. Please run download_all_media.py first.')
  }

  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'))
  console.log(`Loaded catalog with ${catalog.length} items.`)

  // 1. Fetch existing media to avoid duplicates
  const existingMediaRes = await payload.find({
    collection: 'media',
    limit: 200,
    pagination: false,
  })
  const existingDocs = existingMediaRes.docs || []
  console.log(`Currently ${existingDocs.length} media items in database.`)

  const keyToMediaId: Record<string, number | string> = {}
  const keyToMediaUrl: Record<string, string> = {}

  // 2. Upload each item if not already uploaded
  for (const item of catalog) {
    const filePath = path.join(cacheDir, item.filename)
    if (!fs.existsSync(filePath)) {
      console.warn(`File missing for ${item.filename}, skipping...`)
      continue
    }

    // Check if media already exists by filename
    const existing = existingDocs.find(
      (m: any) => m.filename === item.filename || m.alt === item.alt
    )

    if (existing) {
      console.log(`[EXISTS] ${item.filename} -> ID: ${existing.id}`)
      keyToMediaId[item.key] = existing.id
      keyToMediaUrl[item.key] = (existing as any).url || `/api/media/file/${item.filename}`
    } else {
      console.log(`[UPLOADING] ${item.filename}...`)
      const fileBuffer = fs.readFileSync(filePath)
      try {
        const created = await payload.create({
          collection: 'media',
          data: {
            alt: item.alt,
            caption: item.caption,
          },
          file: {
            data: fileBuffer,
            mimetype: item.filename.endsWith('.png') ? 'image/png' : 'image/jpeg',
            name: item.filename,
            size: fileBuffer.length,
          },
        })
        console.log(`[UPLOADED OK] ${item.filename} -> ID: ${created.id}`)
        keyToMediaId[item.key] = created.id
        keyToMediaUrl[item.key] = (created as any).url || `/api/media/file/${item.filename}`
      } catch (err: any) {
        console.error(`[UPLOAD ERROR] ${item.filename}:`, err.message)
      }
    }
  }

  console.log('\n--- UPDATING COLLECTIONS WITH AUTHENTIC LOCAL MEDIA ---')

  // Helper function to update collection document safely
  async function updateDoc(
    collection: any,
    slug: string,
    data: Record<string, any>,
    label: string
  ) {
    try {
      const res = await payload.find({
        collection,
        where: { slug: { equals: slug } },
        limit: 1,
      })

      if (res.docs && res.docs.length > 0) {
        const id = res.docs[0].id
        await payload.update({
          collection,
          id,
          data,
        })
        console.log(`[UPDATED] ${label} (${collection}: ${slug})`)
      } else {
        console.warn(`[NOT FOUND] ${label} (${collection}: ${slug})`)
      }
    } catch (err: any) {
      console.error(`[UPDATE ERROR] ${label}:`, err.message)
    }
  }

  // --- ROOMS ---
  if (keyToMediaId['room-superior']) {
    await updateDoc(
      'rooms',
      'superior-room',
      {
        featuredImage: keyToMediaId['room-superior'],
        imageUrl: keyToMediaUrl['room-superior'],
        gallery: [
          { image: keyToMediaId['room-superior'] },
          { image: keyToMediaId['room-superior-bathroom'] || keyToMediaId['room-superior'] },
        ],
      },
      'Superior Room'
    )
  }

  if (keyToMediaId['room-executive']) {
    await updateDoc(
      'rooms',
      'executive-room',
      {
        featuredImage: keyToMediaId['room-executive'],
        imageUrl: keyToMediaUrl['room-executive'],
        gallery: [
          { image: keyToMediaId['room-executive'] },
          { image: keyToMediaId['room-executive-living'] || keyToMediaId['room-executive'] },
        ],
      },
      'Executive Room'
    )
  }

  if (keyToMediaId['room-royal-suite']) {
    await updateDoc(
      'rooms',
      'royal-suite',
      {
        featuredImage: keyToMediaId['room-royal-suite'],
        imageUrl: keyToMediaUrl['room-royal-suite'],
        gallery: [
          { image: keyToMediaId['room-royal-suite'] },
          { image: keyToMediaId['room-royal-bathroom'] || keyToMediaId['room-royal-suite'] },
        ],
      },
      'Royal Suite Room'
    )
  }

  // --- DINING ---
  if (keyToMediaId['dining-hegarmanah']) {
    await updateDoc(
      'dining',
      'restoran-hegarmanah',
      {
        featuredImage: keyToMediaId['dining-hegarmanah'],
        imageUrl: keyToMediaUrl['dining-hegarmanah'],
        gallery: [
          { image: keyToMediaId['dining-hegarmanah'] },
          { image: keyToMediaId['dining-bancakan'] || keyToMediaId['dining-hegarmanah'] },
        ],
      },
      'Restoran Hegarmanah'
    )
  }

  if (keyToMediaId['dining-bancakan']) {
    await updateDoc(
      'dining',
      'restoran-bancakan',
      {
        featuredImage: keyToMediaId['dining-bancakan'],
        imageUrl: keyToMediaUrl['dining-bancakan'],
        gallery: [
          { image: keyToMediaId['dining-bancakan'] },
          { image: keyToMediaId['dining-lobby-lounge'] || keyToMediaId['dining-bancakan'] },
        ],
      },
      'Restoran Bancakan'
    )
  }

  if (keyToMediaId['dining-lobby-lounge']) {
    await updateDoc(
      'dining',
      'lobby-lounge',
      {
        featuredImage: keyToMediaId['dining-lobby-lounge'],
        imageUrl: keyToMediaUrl['dining-lobby-lounge'],
        gallery: [
          { image: keyToMediaId['dining-lobby-lounge'] },
          { image: keyToMediaId['ambience-lobby'] || keyToMediaId['dining-lobby-lounge'] },
        ],
      },
      'Lobby Lounge & Bar'
    )
  }

  // --- EVENTS ---
  if (keyToMediaId['event-ballroom-1']) {
    await updateDoc(
      'events',
      'bale-pakuan-grand-ballroom',
      {
        featuredImage: keyToMediaId['event-ballroom-1'],
        imageUrl: keyToMediaUrl['event-ballroom-1'],
        gallery: [
          { image: keyToMediaId['event-ballroom-1'] },
          { image: keyToMediaId['event-ballroom-2'] || keyToMediaId['event-ballroom-1'] },
          { image: keyToMediaId['event-ballroom-3'] || keyToMediaId['event-ballroom-1'] },
          { image: keyToMediaId['event-ballroom-4'] || keyToMediaId['event-ballroom-1'] },
          { image: keyToMediaId['event-ballroom-5'] || keyToMediaId['event-ballroom-1'] },
        ],
      },
      'Bale Pakuan Grand Ballroom'
    )
  }

  if (keyToMediaId['event-rancage-1']) {
    await updateDoc(
      'events',
      'ruang-pertemuan-rancage',
      {
        featuredImage: keyToMediaId['event-rancage-1'],
        imageUrl: keyToMediaUrl['event-rancage-1'],
        gallery: [
          { image: keyToMediaId['event-rancage-1'] },
          { image: keyToMediaId['event-rancage-2'] || keyToMediaId['event-rancage-1'] },
          { image: keyToMediaId['event-rancage-3'] || keyToMediaId['event-rancage-1'] },
          { image: keyToMediaId['event-rancage-4'] || keyToMediaId['event-rancage-1'] },
        ],
      },
      'Ruang Pertemuan Rancage'
    )
  }

  if (keyToMediaId['event-wedding-royal']) {
    await updateDoc(
      'events',
      'paket-pernikahan-royal-bogor',
      {
        featuredImage: keyToMediaId['event-wedding-royal'],
        imageUrl: keyToMediaUrl['event-wedding-royal'],
        gallery: [
          { image: keyToMediaId['event-wedding-royal'] },
          { image: keyToMediaId['event-ballroom-2'] || keyToMediaId['event-wedding-royal'] },
        ],
      },
      'Paket Pernikahan Royal Bogor'
    )
  }

  // --- FACILITIES (100% SESUAI CAPTION!) ---
  if (keyToMediaId['facility-pool']) {
    await updateDoc(
      'facilities',
      'kolam-renang-outdoor',
      {
        featuredImage: keyToMediaId['facility-pool'],
        imageUrl: keyToMediaUrl['facility-pool'],
      },
      'Kolam Renang Outdoor (Eat & Swim Pool)'
    )
  }

  if (keyToMediaId['facility-spa']) {
    await updateDoc(
      'facilities',
      'padjadjaran-spa-wellness',
      {
        featuredImage: keyToMediaId['facility-spa'],
        imageUrl: keyToMediaUrl['facility-spa'],
      },
      'Nirwana Spa & Massage Sanctuary'
    )
  }

  if (keyToMediaId['facility-fitness']) {
    await updateDoc(
      'facilities',
      'fitness-center',
      {
        featuredImage: keyToMediaId['facility-fitness'],
        imageUrl: keyToMediaUrl['facility-fitness'],
      },
      'Pusat Kebugaran Fitness Center'
    )
  }

  if (keyToMediaId['facility-playground']) {
    await updateDoc(
      'facilities',
      'taman-bermain-anak',
      {
        featuredImage: keyToMediaId['facility-playground'],
        imageUrl: keyToMediaUrl['facility-playground'],
      },
      'Taman Bermain Anak & Aktivitas Keluarga'
    )
  }

  // --- OFFERS (BANNER PROMO RESMI ASLI HOTEL!) ---
  const offerMappings: [string, string, string][] = [
    ['family-offroad-adventure', 'offer-offroad', 'Family Offroad Adventure'],
    ['honeymoon-package', 'offer-honeymoon', 'Honeymoon Package'],
    ['eat-and-stay', 'offer-eat-stay', 'Eat & Stay Package'],
    ['bale-pakuan-wedding-package', 'offer-wedding', 'Bale Pakuan Wedding Package'],
    ['paket-table-manner-bintang-lima', 'offer-table-manner', 'Paket Table Manner'],
    ['paket-ulang-tahun-arisan', 'offer-birthday', 'Paket Ulang Tahun & Arisan'],
    ['best-rate-guarantee-promo', 'offer-flash-sale', 'Best Rate Guarantee Promo'],
  ]

  for (const [slug, key, label] of offerMappings) {
    if (keyToMediaId[key]) {
      await updateDoc(
        'offers',
        slug,
        {
          featuredImage: keyToMediaId[key],
          imageUrl: keyToMediaUrl[key],
        },
        label
      )
    }
  }

  // --- DESTINASI WISATA BOGOR ---
  const destMappings: [string, string, string][] = [
    ['the-jungle-waterpark', 'dest-jungle-waterpark', 'The Jungle Waterpark BNR'],
    ['kebun-raya-bogor', 'dest-kebun-raya', 'Kebun Raya Bogor'],
    ['curug-putri-nangka', 'dest-curug-nangka', 'Curug Nangka / Curug Putri'],
    ['surya-kencana-culinary', 'dest-surya-kencana', 'Pusat Kuliner Surya Kencana'],
    ['rancamaya-golf', 'dest-rancamaya-golf', 'Rancamaya Golf & Country Club'],
  ]

  for (const [slug, key, label] of destMappings) {
    if (keyToMediaId[key]) {
      await updateDoc(
        'destinations',
        slug,
        {
          image: keyToMediaId[key],
          imageUrl: keyToMediaUrl[key],
        },
        label
      )
    }
  }

  console.log('\n--- ALL MEDIA MIGRATION & COLLECTION UPDATES FINISHED SUCCESSFULLY! ---')
  process.exit(0)
}

migrateAllMedia().catch((err) => {
  console.error('Fatal error during migration:', err)
  process.exit(1)
})
