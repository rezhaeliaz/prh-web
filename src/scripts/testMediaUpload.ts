import { getPayload } from 'payload'
import config from '../payload.config'
import fs from 'fs'
import path from 'path'

async function testUpload() {
  const payload = await getPayload({ config })
  console.log('Testing payload.create for media...')

  // Fetch an image buffer from the web
  const testUrl = 'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/Landscape3.jpg.jpeg'
  const res = await fetch(testUrl)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const arrayBuffer = await res.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const mediaDoc = await payload.create({
    collection: 'media',
    data: {
      alt: 'Resort Landscape Panorama Padjadjaran Suites',
      caption: 'Pemandangan asri nan hijau di area resor Padjadjaran Suites Bogor',
    },
    file: {
      data: buffer,
      mimetype: 'image/jpeg',
      name: 'Landscape3.jpg',
      size: buffer.length,
    },
  })

  console.log('Uploaded successfully! New Doc ID:', mediaDoc.id)
  console.log('Doc details:', {
    id: mediaDoc.id,
    filename: (mediaDoc as any).filename,
    url: (mediaDoc as any).url,
    sizes: Object.keys((mediaDoc as any).sizes || {}),
  })
  process.exit(0)
}

testUpload().catch((err) => {
  console.error('Error in testUpload:', err)
  process.exit(1)
})
