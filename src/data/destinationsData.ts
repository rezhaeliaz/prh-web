export interface DestinationItem {
  id: string
  name: string
  category: 'waterpark' | 'nature' | 'heritage' | 'culinary' | 'golf'
  categoryLabel: string
  distance: string
  travelTime: string
  tagline: string
  description: string
  highlights: string[]
  imageUrl: string
  googleMapsUrl: string
  recommendedFor: string
}

export interface CuratedItinerary {
  id: string
  title: string
  duration: string
  targetAudience: string
  description: string
  days: {
    day: number
    title: string
    activities: {
      time: string
      title: string
      desc: string
      location: string
    }[]
  }[]
}

export function getDestinationsData(locale: 'id' | 'en' = 'id'): {
  destinations: DestinationItem[]
  itineraries: CuratedItinerary[]
} {
  const isEn = locale === 'en'

  const destinations: DestinationItem[] = [
    {
      id: 'the-jungle-waterpark',
      name: 'The Jungle Waterpark BNR',
      category: 'waterpark',
      categoryLabel: isEn ? 'Family & Water Adventure' : 'Wahana Air & Keluarga',
      distance: '350 m',
      travelTime: isEn ? '4 mins walk' : '4 menit jalan kaki',
      tagline: isEn ? 'Bogor Most Iconic Family Water Adventure' : 'Wahana Rekreasi Air Terpopuler di Kawasan BNR',
      description: isEn
        ? 'Located just steps from Padjadjaran Suites Resort in Bogor Nirwana Residence, The Jungle Waterpark offers wave pools, lazy rivers, high-speed water slides, and bird park amidst cool mountain climate.'
        : 'Terletak hanya selangkah dari Padjadjaran Suites Resort di kawasan Bogor Nirwana Residence (BNR). Menghadirkan kolam ombak, kolam arus, seluncuran air raksasa, dan taman burung di tengah udara sejuk.',
      highlights: isEn
        ? ['Walking distance from hotel', 'Wave pool & giant water slides', 'Bird park & 4D cinema', 'Family-friendly water play']
        : ['Jarak jalan kaki dari hotel', 'Kolam ombak & seluncuran air', 'Taman burung & bioskop 4D', 'Wahana bermain ramah anak'],
      imageUrl: '/api/media/file/destinasi-the-jungle-waterpark-bnr-bogor.jpg',
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=The+Jungle+Waterpark+Bogor',
      recommendedFor: isEn ? 'Families with children & weekend leisure' : 'Keluarga dengan anak & liburan santai',
    },
    {
      id: 'kebun-raya-bogor',
      name: isEn ? 'Bogor Botanical Gardens & Palace' : 'Kebun Raya & Istana Kepresidenan Bogor',
      category: 'heritage',
      categoryLabel: isEn ? 'Botanical & World Heritage' : 'Warisan Sejarah & Konservasi Botani',
      distance: '4.8 km',
      travelTime: isEn ? '15 mins drive' : '15 menit berkendara',
      tagline: isEn ? 'World-Famous 87-Hectare Botanical Sanctuary Founded in 1817' : 'Taman Botani Kelas Dunia Seluas 87 Hektar Sejak 1817',
      description: isEn
        ? 'The oldest botanical garden in Southeast Asia, housing over 15,000 species of trees and plants, historic lotus ponds, towering canopies, and bordering the historic Bogor Presidential Palace.'
        : 'Taman botani tertua di Asia Tenggara yang mengoleksi lebih dari 15.000 jenis pohon dan tumbuhan langka, kolam teratai legendaris, jembatan gantung merah, serta pemandangan anggun Istana Bogor.',
      highlights: isEn
        ? ['15,000+ plant species', 'Historic Presidential Palace views', 'Scenic bamboo & giant water lily trails', 'Grand Avenue running track']
        : ['15.000+ spesies flora dunia', 'Pemandangan Istana Kepresidenan Bogor', 'Taman teratai raksasa & jembatan merah', 'Jogging track sejuk & rindang'],
      imageUrl: '/api/media/file/destinasi-kebun-raya-bogor-botanical-gardens.jpg',
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Kebun+Raya+Bogor',
      recommendedFor: isEn ? 'Couples, morning runners, and heritage enthusiasts' : 'Pasangan, pencinta alam, dan pelari pagi',
    },
    {
      id: 'curug-putri-nangka',
      name: isEn ? 'Curug Nangka & Curug Putri Waterfalls' : 'Curug Nangka & Air Terjun Curug Putri',
      category: 'nature',
      categoryLabel: isEn ? 'Mountain Waterfall & 4x4 Offroad' : 'Air Terjun Gunung Salak & Offroad 4x4',
      distance: '12 km',
      travelTime: isEn ? '30 mins drive' : '30 menit berkendara (Pintu Masuk Offroad)',
      tagline: isEn ? 'Untouched Mountain Cascades on the Slopes of Mount Salak' : 'Air Terjun Alami di Kaki Gunung Salak dengan Rute Offroad',
      description: isEn
        ? 'Nestled in pine forest at the foot of Mount Salak, Curug Nangka and Curug Putri feature cascading natural mountain streams, refreshing natural rock pools, and popular Jimny 4x4 trail adventure.'
        : 'Tersembunyi di rimbunnya hutan pinus kaki Gunung Salak. Menyajikan gemericik air terjun alami bersumber mata air pegunungan yang sangat jernih, sejuk, dan rute petualangan Family Offroad Jimny 4x4.',
      highlights: isEn
        ? ['Pure Mount Salak spring water', 'Scenic pine forest trekking', 'Partner destination for PRH Offroad Jimny 4x4', 'Tranquil natural swimming basins']
        : ['Mata air alami Gunung Salak', 'Trekking hutan pinus yang asri', 'Rute paket Family Offroad Jimny 4x4 PRH', 'Kolam rendam alami yang segar'],
      imageUrl: '/api/media/file/destinasi-wisata-curug-nangka-kaki-gunung-salak.jpg',
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Curug+Nangka+Bogor',
      recommendedFor: isEn ? 'Adventure seekers, team building groups & nature lovers' : 'Pecinta petualangan, outbound, & alam bebas',
    },
    {
      id: 'surya-kencana-culinary',
      name: isEn ? 'Surya Kencana Heritage Culinary Street' : 'Kawasan Wisata Kuliner Surya Kencana',
      category: 'culinary',
      categoryLabel: isEn ? 'Legendary Street Gastronomy' : 'Pusat Kuliner Legendaris Bogor',
      distance: '3.6 km',
      travelTime: isEn ? '10 mins drive' : '10 menit berkendara',
      tagline: isEn ? 'Bogor Most Renowned Heritage Culinary Corridor' : 'Sentra Kuliner Bersejarah dengan Cita Rasa Otentik',
      description: isEn
        ? 'A vibrant historical street packed with authentic Bogor specialties: Soto Kuning Pak Salam, Ngo Hiong legendaris, Martabak Encek arang, Toge Goreng Ibu Hj. Omah, and aromatic traditional bakeries.'
        : 'Koridor kuliner legendaris paling terkenal di Bogor. Tempat berkumpulnya hidangan legendaris berumur puluhan tahun: Soto Kuning Pak Salam, Toge Goreng H. Omah, Martabak Encek Arang, dan Asinan Bogor.',
      highlights: isEn
        ? ['Heritage culinary stalls dating back decades', 'Famous Soto Kuning & Toge Goreng', 'Chinese-Sundanese acculturation food trail', 'Vibrant local bazaar vibe']
        : ['Kuliner legendaris puluhan tahun', 'Soto Kuning & Toge Goreng otentik', 'Akulturasi kuliner Sunda & Peranakan', 'Suasana jalanan kota tua yang hidup'],
      imageUrl: '/api/media/file/destinasi-kuliner-legendaris-jl-surya-kencana-bogor.jpg',
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Jl.+Surya+Kencana+Bogor',
      recommendedFor: isEn ? 'Foodies & cultural explorers' : 'Pencinta kuliner otentik & fotografi street food',
    },
    {
      id: 'rancamaya-golf',
      name: isEn ? 'Rancamaya Golf & Country Club' : 'Rancamaya Golf & Country Club',
      category: 'golf',
      categoryLabel: isEn ? 'Championship Mountain Golf' : 'Lapangan Golf Kejuaraan Kelas Dunia',
      distance: '8.5 km',
      travelTime: isEn ? '20 mins drive' : '20 menit berkendara',
      tagline: isEn ? 'Ted Robinson Designed 18-Hole Championship Golf Course' : '18-Hole Championship Course Rancangan Ted Robinson',
      description: isEn
        ? 'Ranked among Southeast Asia top golf courses, Rancamaya offers 18-hole championship fairways with sweeping vistas of Mount Salak, Mount Gede, and Mount Pangrango.'
        : 'Salah satu lapangan golf terbaik di Asia Tenggara dengan 18-hole rancangan Ted Robinson. Menawarkan pemandangan spektakuler Gunung Salak, Gunung Gede, dan Gunung Pangrango.',
      highlights: isEn
        ? ['18-hole international standard course', 'Spectacular 3-mountain panorama', 'Executive driving range & clubhouse', 'Preferred retreat for corporate leaders']
        : ['Standar internasional 18-hole', 'Panorama 3 gunung spektakuler', 'Clubhouse & driving range mewah', 'Pilihan utama direksi & eksekutif MICE'],
      imageUrl: '/api/media/file/destinasi-rancamaya-golf-country-club-bogor.jpg',
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Rancamaya+Golf+Country+Club+Bogor',
      recommendedFor: isEn ? 'Corporate executives, golfers & VIP guests' : 'Eksekutif korporat, delegasi MICE, & pegolf',
    },
  ]

  const itineraries: CuratedItinerary[] = [
    {
      id: 'family-nature',
      title: isEn ? 'Family Splash & Nature Weekend Escape' : 'Liburan Akhir Pekan Keluarga & Alam Asri',
      duration: isEn ? '2 Days 1 Night' : '2 Hari 1 Malam',
      targetAudience: isEn ? 'Families with children' : 'Keluarga & Anak-anak',
      description: isEn
        ? 'A delightful itinerary blending water attractions at The Jungle Waterpark BNR, scenic resort dining at Hegarmanah, and tranquil morning garden walks.'
        : 'Rencana perjalanan ideal memadukan serunya wahana air The Jungle BNR, santap nikmat masakan Sunda di Hegarmanah, dan ketenangan kamar berpanorama gunung.',
      days: [
        {
          day: 1,
          title: isEn ? 'Arrival, Resort Splash & Sundanese Dinner' : 'Check-in, Berenang Santai & Jamuan Sunda',
          activities: [
            {
              time: '14:00',
              title: isEn ? 'Check-in at Padjadjaran Suites' : 'Check-in di Padjadjaran Suites Resort',
              desc: isEn
                ? 'Welcome with traditional Sundanese beverage, settling into your panoramic mountain-view suite.'
                : 'Penyambutan dengan welcome drink herbal khas Sunda dan istirahat di kamar berpanorama Gunung Salak.',
              location: 'Padjadjaran Suites Resort',
            },
            {
              time: '15:30',
              title: isEn ? 'The Jungle Waterpark or Resort Outdoor Pool' : 'Bermain Air di The Jungle atau Kolam Resor',
              desc: isEn
                ? 'Splash into the outdoor pool or take a 4-minute walk to The Jungle Waterpark BNR.'
                : 'Berenang di kolam outdoor resor bernuansa tropis atau berjalan kaki 4 menit ke The Jungle Waterpark BNR.',
              location: 'The Jungle BNR / Resort Pool',
            },
            {
              time: '19:00',
              title: isEn ? 'Family Dinner at Restoran Hegarmanah' : 'Makan Malam Keluarga di Restoran Hegarmanah',
              desc: isEn
                ? 'Savor signature Gurame Bakar Cobek, Nasi Timbel Komplit, and refreshing tropical mocktails.'
                : 'Menikmati hidangan Gurame Bakar Cobek, Sop Buntut Spesial, dan Nasi Timbel Komplit di area semi-outdoor.',
              location: 'Restoran Hegarmanah',
            },
          ],
        },
        {
          day: 2,
          title: isEn ? 'Morning Mountain Breeze & Botanical Walk' : 'Pagi Segar Pegunungan & Wisata Kebun Raya',
          activities: [
            {
              time: '07:00',
              title: isEn ? 'Buffet Breakfast with Mount Salak View' : 'Sarapan Prasmanan dengan Pemandangan Gunung',
              desc: isEn
                ? 'Rich breakfast buffet featuring traditional porridge, omelet station, and freshly brewed Bogor coffee.'
                : 'Sarapan prasmanan lengkap dengan live cooking station dan kopi khas Bogor sambil menikmati kabut pagi.',
              location: 'Restoran Hegarmanah',
            },
            {
              time: '09:30',
              title: isEn ? 'Excursion to Bogor Botanical Gardens' : 'Wisata Sejarah ke Kebun Raya Bogor',
              desc: isEn
                ? 'A quick 15-minute drive to explore centuries-old heritage trees and historic Presidential Palace vistas.'
                : 'Berkendara 15 menit ke Kebun Raya Bogor untuk jalan santai di bawah pohon-pohon raksasa berumur ratusan tahun.',
              location: 'Kebun Raya Bogor',
            },
            {
              time: '12:00',
              title: isEn ? 'Late Check-out & Souvenir Shopping' : 'Check-out & Belanja Oleh-oleh Khas Bogor',
              desc: isEn
                ? 'Pick up famous Lapis Talas Bogor and Asinan Sedap Gedung Dalam before departing home.'
                : 'Membeli Lapis Talas Bogor dan Asinan Gedung Dalam yang legendaris sebelum perjalanan pulang.',
              location: 'Padjadjaran Suites Resort',
            },
          ],
        },
      ],
    },
    {
      id: 'corporate-mice',
      title: isEn ? 'Corporate MICE & Outbound Adventure Trail' : 'MICE Korporasi & Petualangan Outbound 4x4',
      duration: isEn ? '2 Days 1 Night' : '2 Hari 1 Malam',
      targetAudience: isEn ? 'Companies, ministries, and corporate boards' : 'Perusahaan, BUMN, Kementerian, & Instansi',
      description: isEn
        ? 'The benchmark itinerary for strategic corporate meetings at Bale Pakuan Ballroom combined with adrenaline-pumping Offroad 4x4 team building to Curug Putri.'
        : 'Paket ideal untuk rapat kerja strategis di Bale Pakuan Ballroom dipadukan dengan outbound team building petualangan Jimny 4x4 ke lereng Gunung Salak.',
      days: [
        {
          day: 1,
          title: isEn ? 'Strategic Conference & Gala Dinner' : 'Rapat Kerja Strategis & Jamuan Gala Dinner',
          activities: [
            {
              time: '08:30',
              title: isEn ? 'Morning Registration & Welcome Coffee Break' : 'Registrasi & Coffee Break Pagi',
              desc: isEn
                ? 'Freshly brewed artisan coffee, traditional Sundanese pastries, and dedicated secretariat reception.'
                : 'Kopi hangat, aneka kue tradisional Sunda, dan registrasi di foyer Bale Pakuan Ballroom.',
              location: 'Bale Pakuan Ballroom Foyer',
            },
            {
              time: '09:00',
              title: isEn ? 'General Session & Hybrid Conference' : 'Sesi Pleno Rapat & Presentasi Hybrid LED',
              desc: isEn
                ? 'Equipped with giant LED videotron, crisp wireless microphones, and dedicated high-speed VLAN.'
                : 'Pemaparan materi menggunakan layar LED Videotron raksasa, tata suara jernih, dan koneksi internet stabil.',
              location: 'Bale Pakuan Grand Ballroom',
            },
            {
              time: '12:30',
              title: isEn ? 'Executive Networking Lunch' : 'Makan Siang Prasmanan Eksekutif',
              desc: isEn
                ? 'Five-star buffet spread with Indonesian and international specialties at Restoran Hegarmanah.'
                : 'Makan siang prasmanan lezat 5-star di Hegarmanah untuk sesi santai delegasi.',
              location: 'Restoran Hegarmanah',
            },
            {
              time: '19:00',
              title: isEn ? 'Gala Banquet Dinner & Entertainment' : 'Gala Dinner & Malam Keakraban',
              desc: isEn
                ? 'Exclusive banquet celebration with live acoustic performance in Bale Pakuan Grand Ballroom.'
                : 'Jamuan makan malam formal berkonsep meja bundar (round table) dengan hiburan musik akustik.',
              location: 'Bale Pakuan Grand Ballroom',
            },
          ],
        },
        {
          day: 2,
          title: isEn ? 'Jimny 4x4 Offroad Team Building to Curug Putri' : 'Petualangan Offroad Jimny 4x4 ke Curug Putri',
          activities: [
            {
              time: '07:30',
              title: isEn ? 'Buffet Breakfast & Safety Briefing' : 'Sarapan Pagi & Briefing Safety Offroad',
              desc: isEn
                ? 'Hearty energy breakfast followed by professional offroad briefing by certified trail instructors.'
                : 'Sarapan bergizi dan pengarahan keselamatan oleh instruktur offroad profesional.',
              location: 'Padjadjaran Suites Lobby',
            },
            {
              time: '08:30',
              title: isEn ? '4x4 Offroad Convoy to Curug Putri Kencana' : 'Konvoi Jimny 4x4 Menuju Jalur Kaki Gunung Salak',
              desc: isEn
                ? 'Exhilarating mud tracks, river crossings, pine forest trails, and team challenges at the waterfall.'
                : 'Melintasi jalur tanah, rimbun pinus, dan tantangan kekompakan tim hingga tiba di kolam alami Curug Putri.',
              location: 'Rute Offroad Gunung Salak',
            },
            {
              time: '12:30',
              title: isEn ? 'Return to Resort, Shower & Check-out' : 'Kembali ke Hotel, Bersih Diri & Check-out',
              desc: isEn
                ? 'Freshen up in comfort, post-event awards distribution, and departure back to Jakarta/destinations.'
                : 'Mandi dan bersih diri di kamar hotel, penyerahan kenang-kenangan, dan kepulangan rombongan.',
              location: 'Padjadjaran Suites Resort',
            },
          ],
        },
      ],
    },
  ]

  return { destinations, itineraries }
}
