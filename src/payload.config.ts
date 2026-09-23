import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Rooms } from './collections/Rooms'
import { Dining } from './collections/Dining'
import { Facilities } from './collections/Facilities'
import { Events } from './collections/Events'
import { Offers } from './collections/Offers'
import { Galleries } from './collections/Galleries'
import { Posts } from './collections/Posts'
import { Bookings } from './collections/Bookings'
import { Reviews } from './collections/Reviews'
import { Destinations } from './collections/Destinations'

import { SiteSettings } from './globals/SiteSettings'
import { HeaderConfig } from './globals/HeaderConfig'
import { FooterConfig } from './globals/FooterConfig'
import { Popups } from './globals/Popups'
import { HomePage } from './globals/HomePage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '- Padjadjaran Suites CMS',
    },
  },
  collections: [
    Users,
    Media,
    Rooms,
    Dining,
    Facilities,
    Events,
    Offers,
    Galleries,
    Posts,
    Bookings,
    Reviews,
    Destinations,
  ],
  globals: [
    HomePage,
    SiteSettings,
    HeaderConfig,
    FooterConfig,
    Popups,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'padjadjaran_suites_secret_key_default_2026',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./payload.db',
    },
  }),
  sharp,
  localization: {
    locales: [
      { label: 'Bahasa Indonesia', code: 'id' },
      { label: 'English', code: 'en' },
    ],
    defaultLocale: 'id',
    fallback: true,
  },
})
