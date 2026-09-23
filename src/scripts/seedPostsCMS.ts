import { getPayload } from 'payload'
import config from '../payload.config'

function markdownToLexical(markdownText: string) {
  const lines = markdownText.split('\n')
  const children: any[] = []

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue

    if (trimmed.startsWith('### ')) {
      children.push({
        type: 'heading',
        tag: 'h3',
        format: '',
        indent: 0,
        version: 1,
        children: [{ text: trimmed.replace('### ', ''), type: 'text', version: 1 }],
      })
    } else if (trimmed.startsWith('## ')) {
      children.push({
        type: 'heading',
        tag: 'h2',
        format: '',
        indent: 0,
        version: 1,
        children: [{ text: trimmed.replace('## ', ''), type: 'text', version: 1 }],
      })
    } else if (trimmed.startsWith('- ')) {
      children.push({
        type: 'listitem',
        value: 1,
        children: [{ text: trimmed.replace('- ', ''), type: 'text', version: 1 }],
      })
    } else {
      children.push({
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        children: [{ text: trimmed, type: 'text', version: 1 }],
      })
    }
  }

  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children,
      direction: 'ltr',
    },
  }
}

async function seedPosts() {
  console.log('--- SEEDING POSTS INTO PAYLOAD CMS DATABASE ---')
  const payload = await getPayload({ config })

  // Find media IDs for featured images
  const mediaRes = await payload.find({ collection: 'media', limit: 100, pagination: false })
  const mediaDocs = mediaRes.docs || []
  const getMediaId = (filenameSub: string) => {
    const found = mediaDocs.find((m: any) => m.filename?.includes(filenameSub))
    return found ? found.id : null
  }

  const jungleMediaId = getMediaId('the-jungle') || getMediaId('Landscape3')
  const ballroomMediaId = getMediaId('ballroom-1')
  const weddingMediaId = getMediaId('Wedding') || getMediaId('ballroom')
  const hegarmanahMediaId = getMediaId('hegarmanah')

  const postsData = [
    {
      slug: '5-destinasi-wisata-bogor-nirwana-residence',
      category: 'travel-guide',
      featuredImage: jungleMediaId,
      imageUrl: '/api/media/file/destinasi-the-jungle-waterpark-bnr-bogor.jpg',
      publishedAt: '2026-09-18T00:00:00.000Z',
      author: 'Padjadjaran Concierge Team',
      id: {
        title: '5 Destinasi Wisata Paling Hits di Sekitar Kawasan BNR Bogor',
        excerpt:
          'Panduan lengkap menikmati liburan akhir pekan seru di Bogor Nirwana Residence, mulai dari wahana air The Jungle Waterpark hingga spot kuliner keluarga.',
        readTime: '4 Menit Baca',
        content: `Bogor Nirwana Residence (BNR) telah lama dikenal sebagai salah satu kawasan hunian dan rekreasi terpadu paling bergengsi di Kota Hujan. Terletak persis di kaki Gunung Salak dengan udara sejuk nan bersih, kawasan ini menyuguhkan beragam daya tarik wisata favorit untuk keluarga, pasangan, maupun rombongan gathering.

### 1. The Jungle Waterpark BNR
Hanya berjarak 350 meter atau 4 menit jalan kaki dari lobi Padjadjaran Suites Resort, The Jungle Waterpark adalah destinasi wahana air terbesar dan terlengkap. Mulai dari Kiddy Pool, Wave Pool (kolam ombak buatan), Tower Slide yang memacu adrenalin, hingga Bird Park edukatif.

### 2. Jalur Trekking & Family Offroad Curug Putri
Bagi pecinta petualangan luar ruangan, kawasan sekitar BNR merupakan titik start ideal menuju lereng Gunung Salak. Anda dapat menikmati paket Family Offroad Suzuki Jimny 4x4 menyusuri hutan pinus asri menuju segarnya air terjun alami Curug Putri.

### 3. Rumah Air Resto & Wisata Danau
Menikmati hidangan khas Sunda di atas saung terapung danau dengan semilir angin sejuk. Sangat cocok dinikmati bersama keluarga besar setelah puas bermain di waterpark.

### 4. Devoyage & Kampung Eropa Bogor
Spot foto instagramable bernuansa desa Eropa mini lengkap dengan replika Menara Eiffel, kanal kincir angin khas Belanda, dan perahu kano romantis.

### 5. Padjadjaran Suites Resort: Oase Relaksasi di Jantung BNR
Setelah seharian mengeksplorasi BNR, kembalilah ke kehangatan Padjadjaran Suites Resort. Nikmati fasilitas kolam renang outdoor berpemandangan taman tropis, spa tradisional Sunda, dan santap malam istimewa di Restoran Hegarmanah.`,
      },
      en: {
        title: '5 Top Attractions Around Bogor Nirwana Residence (BNR)',
        excerpt:
          'Your ultimate weekend guide to Bogor Nirwana Residence, from the thrilling water rides of The Jungle Waterpark to serene culinary lake spots.',
        readTime: '4 Min Read',
        content: `Bogor Nirwana Residence (BNR) is widely recognized as one of the most prestigious resort and lifestyle destinations in Bogor. Nestled right at the foot of Mount Salak with cool, refreshing mountain air, BNR offers a wealth of family leisure activities and team gathering spots.

### 1. The Jungle Waterpark BNR
Located just 350 meters or a 4-minute stroll from Padjadjaran Suites Resort, The Jungle Waterpark is a premier family waterpark featuring giant wave pools, thrilling tower slides, a lazy river, and an interactive bird park.

### 2. Pine Forest Trekking & 4x4 Jimny Offroad Trail
For outdoor enthusiasts, BNR serves as the gateway to the foothills of Mount Salak. Embark on a thrilling Suzuki Jimny 4x4 offroad expedition through pine forests to the pristine cascades of Curug Putri waterfall.

### 3. Rumah Air Floating Lake Restaurant
Savor authentic Sundanese delicacies in floating bamboo gazebos over scenic lake waters with gentle mountain breezes, ideal for family lunches and celebratory gatherings.

### 4. Devoyage European Village Landmark
A vibrant photography haven styled after a charming European village, complete with miniature windmills, picturesque canal waterways, and colorful vintage storefronts.

### 5. Padjadjaran Suites Resort: Your Mountain Sanctuary
After exploring the sights of BNR, unwind at Padjadjaran Suites Resort. Rejuvenate in our sparkling outdoor swimming pool, indulge in therapeutic Sundanese massage, and savor an authentic Sundanese dinner at Hegarmanah Restaurant.`,
      },
    },
    {
      slug: 'tips-memilih-venue-mice-ballroom-bogor',
      category: 'news',
      featuredImage: ballroomMediaId,
      imageUrl: '/api/media/file/bale-pakuan-grand-ballroom-1.jpg',
      publishedAt: '2026-09-10T00:00:00.000Z',
      author: 'Banquet & MICE Team',
      id: {
        title: 'Panduan Memilih Venue MICE & Ballroom untuk Acara Korporasi di Bogor',
        excerpt:
          'Simak faktor krusial saat merencanakan rapat kerja, seminar nasional, maupun konvensi tahunan perusahaan di kawasan sejuk Bogor.',
        readTime: '5 Menit Baca',
        content: `Menyelenggarakan acara korporasi skala besar, rapat kerja tahunan (raker), maupun konvensi kementerian memerlukan ketelitian tinggi dalam memilih tempat. Bogor senantiasa menjadi destinasi terfavorit berkat lokasinya yang mudah diakses dari Jakarta namun menawarkan suasana sejuk yang menyegarkan pikiran.

### 1. Fleksibilitas Kapasitas & Ketinggian Plafon (Ceiling Height)
Pilihlah venue yang memiliki ballroom berplafon tinggi (minimal 6-7 meter) tanpa pilar penghalang, seperti Bale Pakuan Grand Ballroom di Padjadjaran Suites Resort. Plafon tinggi memastikan sirkulasi udara optimal dan memberikan keleluasaan pemasangan panggung megah, LED screen raksasa, serta tata lampu profesional.

### 2. Ketersediaan Breakout Rooms (Ruang Komisi)
Acara rapat kerja seringkali membutuhkan sesi sidang komisi terpisah. Padjadjaran Suites Resort menyediakan lebih dari 20 ruang pertemuan Rancage berfasilitas lengkap untuk diskusi kelompok fokus (FGD) dari 10 hingga 180 orang.

### 3. Akses Internet Dedicated & Keandalan Audio-Visual
Koneksi internet serat optik dengan bandwidth dedicated sangat vital untuk kelancaran live streaming dan hybrid meeting. Pastikan pihak hotel menyediakan tim teknisi audio-visual bersiaga sepanjang jalannya acara.

### 4. Layanan Jamuan Katering Berstandar Hotel Bintang 5
Kualitas hidangan coffee break dan buffet lunch mencerminkan reputasi penyelenggara acara. Padjadjaran Suites menghadirkan menu fusi Nusantara dan Western yang disiapkan langsung oleh tim Executive Chef berpengalaman.`,
      },
      en: {
        title: 'Essential Guide to Choosing Corporate MICE & Ballroom Venues in Bogor',
        excerpt:
          'Crucial factors to evaluate when planning executive retreats, ministry meetings, and corporate conventions in scenic Bogor.',
        readTime: '5 Min Read',
        content: `Hosting large-scale corporate events, annual general meetings, and ministry conventions requires meticulous selection of your event partner. Bogor remains the top choice for business organizers due to its accessibility from Jakarta paired with crisp, revitalizing mountain breezes.

### 1. Capacity Flexibility & High Ceiling Architecture
Opt for a pillarless ballroom with high ceilings (at least 6-7 meters), such as the Bale Pakuan Grand Ballroom at Padjadjaran Suites Resort. High ceilings ensure optimal airflow and accommodate massive LED screens, grand stages, and professional lighting rigs without sightline obstructions.

### 2. Breakout Meeting Rooms for Committee Sessions
Corporate retreats frequently require dedicated breakout rooms for focused committee deliberations. Padjadjaran Suites Resort offers more than 20 modern Rancage meeting rooms tailored for groups ranging from 10 to 180 delegates.

### 3. Dedicated High-Speed Internet & AV Technology
High-speed dedicated fiber optic Wi-Fi is essential for smooth hybrid conferences and global live broadcasts. Ensure your venue provides dedicated on-site technicians throughout the event.

### 4. Five-Star Banquet Catering Quality
The culinary standard of coffee breaks and buffet lunches directly elevates your organization reputation. Our master chefs curate delectable Indonesian royal recipes alongside contemporary international menus.`,
      },
    },
    {
      slug: 'inspirasi-pernikahan-megah-bale-pakuan-ballroom',
      category: 'wedding-tips',
      featuredImage: weddingMediaId,
      imageUrl: '/api/media/file/dekorasi-pernikahan-wedding-bale-pakuan.jpg',
      publishedAt: '2026-09-05T00:00:00.000Z',
      author: 'Wedding Specialist',
      id: {
        title: 'Inspirasi Pernikahan Megah Berlatar Gunung Salak di Bale Pakuan',
        excerpt:
          'Wujudkan momen sakral pernikahan impian dengan jamuan prasmanan istimewa untuk hingga 1.000 tamu dan fasilitas kamar pengantin Royal Suite.',
        readTime: '4 Menit Baca',
        content: `Pernikahan adalah babak terindah dalam perjalanan cinta Anda. Memilih gedung yang mampu menampung seluruh keluarga besar dan tamu kehormatan dengan kenyamanan prima adalah impian setiap pasangan pengantin.

### Chandelier Kristal & Kemegahan Plafon 7 Meter
Bale Pakuan Grand Ballroom menghadirkan atmosfer istana kerajaan dengan kilau chandelier kristal memukau. Ketinggian plafon 7 meter memberikan kebebasan mutlak bagi dekorator pelaminan untuk merancang konsep pernikahan tradisional Sunda yang agung maupun sentuhan modern internasional yang romantis.

### Jamuan Prasmanan Bintang 5 Bersama Master Chef
Resepsi pernikahan yang dikenang sepanjang masa tak lepas dari kelezatan hidangannya. Tim kuliner Padjadjaran Suites Resort memadukan menu prasmanan autentik Nusantara, gubukan live cooking internasional, hingga sesi food tasting privat sebelum hari-H.

### Pengalaman Bulan Madu di Royal Suite
Kedua mempelai mendapatkan fasilitas menginap gratis di kamar Royal Suite seluas 54 m² berfasilitas bathtub rendam mewah dan balkon berpemandangan langsung ke Gunung Salak untuk malam pertama yang penuh kedamaian.`,
      },
      en: {
        title: 'Romantic Grand Weddings Overlooking Mount Salak at Bale Pakuan',
        excerpt:
          'Discover tips for curating your dream wedding banquet for up to 1,000 guests with five-star catering and a complimentary night in the Royal Suite.',
        readTime: '4 Min Read',
        content: `A wedding is the most cherished milestone in your journey of love. Choosing a venue that accommodates your entire family and honored guests with grace and luxury is the top priority for every couple.

### Crystal Chandeliers & 7-Meter Pillarless Grandeur
Bale Pakuan Grand Ballroom provides a palace-like ambiance with sparkling crystal chandeliers. The spacious 7-meter ceiling gives wedding decorators total freedom to build breathtaking traditional or modern bespoke stages.

### Five-Star Master Chef Banquet Catering
A memorable wedding banquet is defined by its culinary excellence. Our culinary team blends authentic Indonesian royal delicacies, Sundanese favorites, and international live cooking stalls, complete with an exclusive private food testing session.

### Royal Suite Honeymoon Experience
The bride and groom enjoy a complimentary romantic stay in our 54 m² Royal Suite with panoramic vistas of Mount Salak for an unforgettable, serene wedding night.`,
      },
    },
    {
      slug: 'cita-rasa-sunda-otentik-restoran-hegarmanah',
      category: 'culinary',
      featuredImage: hegarmanahMediaId,
      imageUrl: '/api/media/file/restoran-hegarmanah-sunda-bogor.jpg',
      publishedAt: '2026-08-28T00:00:00.000Z',
      author: 'Executive Chef Team',
      id: {
        title: 'Menjelajah Cita Rasa Sunda Otentik di Restoran Hegarmanah',
        excerpt:
          'Kelezatan gurame terbang renyah, nasi liwet kastrol wangi, dan sambal terasi dadak di tengah semilir angin sejuk teras hijau Padjadjaran Suites.',
        readTime: '3 Menit Baca',
        content: `Kuliner Parahyangan Jawa Barat senantiasa memikat para penikmat rasa berkat kesegaran lalapan alami, sambal dadak pedas menggugah selera, dan rempah wangi yang kaya. Di Restoran Hegarmanah, warisan resep leluhur ini disajikan dengan sentuhan kualitas hotel bintang 5.

### Gurame Terbang Renyah & Nasi Liwet Kastrol Rempah
Menu yang paling banyak dicari tamu adalah Gurame Terbang Renyah yang digoreng sempurna hingga ke tulang, disajikan berdampingan dengan Nasi Liwet Kastrol panas bertabur daun kemangi, serai, daun salam, dan cabai rawit utuh.

### Suasana Santap Semi-Outdoor yang Asri
Restoran Hegarmanah dirancang dengan konsep semi-terbuka yang menyatu dengan taman resor. Pemandangan hijau dan hawa sejuk khas Bogor menjadikan setiap sesi santap siang bisnis maupun makan malam keluarga terasa begitu menenangkan jiwa.`,
      },
      en: {
        title: 'Savoring Authentic Sundanese Gastronomy at Hegarmanah Restaurant',
        excerpt:
          'Explore signature Parahyangan delicacies, crispy flying gourami, aromatic kastrol liwet rice, and fresh ground sambal on the breezy scenic terrace.',
        readTime: '3 Min Read',
        content: `West Javanese Sundanese gastronomy captivates food connoisseurs with fresh herbs, fiery freshly-ground sambal, and natural aromatic spices. At Hegarmanah Restaurant, heritage recipes are prepared with five-star culinary finesse.

### Signature Crispy Gourami & Aromatic Liwet Rice
The most celebrated dish is the Golden Crispy Flying Gourami, served alongside Nasi Liwet Kastrol cooked with sweet basil, lemongrass, bay leaves, and whole bird's eye chilies in traditional cast-iron pots.

### Relaxing Semi-Outdoor Dining Terrace
Hegarmanah Restaurant is designed with an open-air scenic terrace embracing the soothing mountain breezes. Ideal for business lunches, family gatherings, or candlelit evening dinners overlooking the shimmering lights of Bogor.`,
      },
    },
  ]

  for (const post of postsData) {
    // Check if post already exists
    const existing = await payload.find({
      collection: 'posts',
      where: { slug: { equals: post.slug } },
      limit: 1,
    })

    if (existing.docs && existing.docs.length > 0) {
      const docId = existing.docs[0].id
      console.log(`[UPDATING POST] ${post.slug} (ID: ${docId})...`)

      // Update ID locale
      await payload.update({
        collection: 'posts',
        id: docId,
        locale: 'id',
        data: {
          title: post.id.title,
          excerpt: post.id.excerpt,
          readTime: post.id.readTime,
          content: markdownToLexical(post.id.content),
          category: post.category,
          featuredImage: post.featuredImage,
          imageUrl: post.imageUrl,
          publishedAt: post.publishedAt,
          author: post.author,
          _status: 'published',
        },
      })

      // Update EN locale
      await payload.update({
        collection: 'posts',
        id: docId,
        locale: 'en',
        data: {
          title: post.en.title,
          excerpt: post.en.excerpt,
          readTime: post.en.readTime,
          content: markdownToLexical(post.en.content),
          category: post.category,
          featuredImage: post.featuredImage,
          imageUrl: post.imageUrl,
          publishedAt: post.publishedAt,
          author: post.author,
          _status: 'published',
        },
      })
      console.log(`[UPDATED POST OK] ${post.slug}`)
    } else {
      console.log(`[CREATING POST] ${post.slug}...`)
      // Create ID locale
      const created = await payload.create({
        collection: 'posts',
        locale: 'id',
        data: {
          title: post.id.title,
          slug: post.slug,
          category: post.category,
          excerpt: post.id.excerpt,
          readTime: post.id.readTime,
          content: markdownToLexical(post.id.content),
          featuredImage: post.featuredImage,
          imageUrl: post.imageUrl,
          publishedAt: post.publishedAt,
          author: post.author,
          _status: 'published',
        },
      })

      // Update EN locale
      await payload.update({
        collection: 'posts',
        id: created.id,
        locale: 'en',
        data: {
          title: post.en.title,
          excerpt: post.en.excerpt,
          readTime: post.en.readTime,
          content: markdownToLexical(post.en.content),
          category: post.category,
          featuredImage: post.featuredImage,
          imageUrl: post.imageUrl,
          publishedAt: post.publishedAt,
          author: post.author,
          _status: 'published',
        },
      })
      console.log(`[CREATED POST OK] ${post.slug} (ID: ${created.id})`)
    }
  }

  console.log('\n--- ALL POSTS SUCCESSFULLY SEEDED INTO PAYLOAD CMS! ---')
  process.exit(0)
}

seedPosts().catch((err) => {
  console.error('Fatal error seeding posts:', err)
  process.exit(1)
})
