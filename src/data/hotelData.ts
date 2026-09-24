export type { GalleryItem } from '@/lib/cmsData'

export interface RoomItem {
  id: string
  slug: string
  name: string
  category: 'superior' | 'executive' | 'royal-suite'
  badge: string
  size: number // m2
  bedType: string
  capacity: number
  basePrice: number
  discountPrice?: number
  tagline: string
  description: string
  featuredImage: string
  gallery: string[]
  amenities: { name: string; icon: string }[]
  highlights: string[]
  virtualTourUrl?: string
}

export interface DiningItem {
  id: string
  slug: string
  name: string
  type: string
  cuisine: string
  openingHours: string
  capacity: string
  tagline: string
  description: string
  featuredImage: string
  gallery: string[]
  specialties: string[]
}

export interface EventItem {
  id: string
  slug: string
  name: string
  type: string
  areaSize: string
  ceilingHeight: string
  capacityMax: number
  tagline: string
  description: string
  featuredImage: string
  gallery: string[]
  layouts: { style: string; capacity: number }[]
  features: string[]
}

export interface FacilityItem {
  id: string
  slug: string
  name: string
  category: string
  openingHours: string
  tagline: string
  description: string
  featuredImage: string
  features: string[]
}

export const HOTEL_INFO = {
  name: 'Padjadjaran Suites Resort & Convention Hotel Bogor',
  shortName: 'Padjadjaran Suites Resort',
  tagline: 'Where Luxury Meets Serene Mountain Views',
  phone: '+62 251 756 9000',
  whatsapp: '+62 851 8309 3061',
  whatsappUrl: 'https://wa.me/6285183093061',
  email: 'reservation@padjadjaransuitesresort.com',
  address: 'Jl. Bogor Inner Ring Road Lot XIX C-2 No. 17, Bogor Nirwana Residence (BNR), Bogor 16132, Jawa Barat, Indonesia',
  googleMapsUrl: 'https://maps.app.goo.gl/dEJUfkgHCUi57iWg8',
  social: {
    instagram: 'https://www.instagram.com/padjadjaransuitesresort/',
    facebook: 'https://www.facebook.com/padjadjaran.resort/?locale=id_ID',
    tiktok: 'https://www.tiktok.com/@prh_bogor',
  },
}

export const ROOMS_DATA: RoomItem[] = [
  {
    id: 'superior-room',
    slug: 'superior-room',
    name: 'Superior Room',
    category: 'superior',
    badge: 'Paling Populer',
    size: 22,
    bedType: 'King Double atau 2 Twin Beds',
    capacity: 2,
    basePrice: 450000,
    discountPrice: 380000,
    tagline: 'Kenyamanan modern nan asri di kawasan Bogor Nirwana Residence',
    description:
      'Nikmati kenyamanan kamar berkonsep minimalis modern yang bersih, sejuk, dan dirancang untuk ketenangan istirahat Anda. Kamar Superior merupakan pilihan ideal bagi perjalanan bisnis maupun momen liburan santai di Bogor. Memiliki luas 22 meter persegi, kamar ini tersedia dalam pilihan tempat tidur King Double maupun Twin Beds berkualitas tinggi.',
    featuredImage: '/api/media/file/kamar-superior-padjadjaran-suites.jpg',
    gallery: [
      'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/superior.jpg.jpeg',
      'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/superior-bathroom.jpg.jpeg',
      'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/bilding-1.jpg.jpeg',
    ],
    amenities: [
      { name: 'Wi-Fi Kecepatan Tinggi', icon: 'wifi' },
      { name: 'Smart LED TV 43 Inch', icon: 'tv' },
      { name: 'Pendingin Ruangan (AC)', icon: 'air-conditioning' },
      { name: 'Kamar Mandi Shower Air Hangat', icon: 'shower' },
      { name: 'Pembuat Kopi & Teh Gratis', icon: 'coffee' },
      { name: 'Air Mineral Harian', icon: 'coffee' },
      { name: 'Brankas Pribadi', icon: 'safe' },
      { name: 'Sandal & Perlengkapan Mandi Lengkap', icon: 'bath' },
    ],
    highlights: [
      'Pemandangan Kota / Taman Hijau Resor',
      'Pilihan Kasur Double atau Twin',
      'Desain Ergonomis & Bebas Asap Rokok',
      'Layanan Kebersihan Harian',
    ],
    virtualTourUrl: '#virtual-tour',
  },
  {
    id: 'executive-room',
    slug: 'executive-room',
    name: 'Executive Room',
    category: 'executive',
    badge: 'Favorit Pebisnis & Pasangan',
    size: 33,
    bedType: 'King Bed (160 x 200 cm)',
    capacity: 2,
    basePrice: 750000,
    discountPrice: 650000,
    tagline: 'Ruangan lebih lega dengan sudut kerja profesional dan kenyamanan prima',
    description:
      'Kamar Executive menghadirkan pesona interior berkelas dengan luas 33 meter persegi yang dilengkapi fasilitas lengkap demi kepuasan menginap prima. Menawarkan kenyamanan tempat tidur King berukuran 160 x 200 cm dengan sprei katun premium, meja kerja ergonomis, sofa santai, serta kamar mandi modern berfasilitas shower mewah.',
    featuredImage: '/api/media/file/kamar-executive-padjadjaran-suites.jpg',
    gallery: [
      'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/exe-1.jpg.jpeg',
      'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/exe-2.jpg.jpeg',
      'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/sunset-view.jpg.jpeg',
    ],
    amenities: [
      { name: 'Wi-Fi Fiber Optik Cepat', icon: 'wifi' },
      { name: 'Smart TV 50 Inch', icon: 'tv' },
      { name: 'Meja Kerja Eksekutif', icon: 'sofa' },
      { name: 'AC Digital Sejuk', icon: 'air-conditioning' },
      { name: 'Shower Mewah Bertekanan Tinggi', icon: 'shower' },
      { name: 'Kulkas Mini Bar', icon: 'fridge' },
      { name: 'Fasilitas Kopi & Teh Premium', icon: 'coffee' },
      { name: 'Brankas Elektronik', icon: 'safe' },
      { name: 'Pengering Rambut (Hairdryer)', icon: 'bath' },
    ],
    highlights: [
      'Ruang Duduk Santai Lebih Luas (33 m²)',
      'Meja Kerja Ergonomis Cocok untuk WFH / Bisnis',
      'Pemandangan Asri Pegunungan Salak',
      'Termasuk Sarapan Prasmanan 2 Orang',
    ],
    virtualTourUrl: '#virtual-tour',
  },
  {
    id: 'royal-suite',
    slug: 'royal-suite',
    name: 'Royal Suite Room',
    category: 'royal-suite',
    badge: 'Kemewahan Puncak',
    size: 54,
    bedType: 'Super King Bed (200 x 200 cm)',
    capacity: 3,
    basePrice: 1450000,
    discountPrice: 1250000,
    tagline: 'Keluasan maksimal dengan ruang tamu privat terpisah dan layanan eksklusif',
    description:
      'Dirancang secara eksklusif dalam ruangan yang sangat luas, Royal Suite merupakan puncak kemewahan dan kenyamanan di Padjadjaran Suites Resort. Suite ini disempurnakan dengan ruang tamu terpisah yang mewah untuk menerima tamu atau bersantai bersama keluarga, meja kerja eksekutif, serta kamar mandi luas berfasilitas bathtub rendam dan shower premium.',
    featuredImage: '/api/media/file/royal-suite-mewah-padjadjaran-suites.jpg',
    gallery: [
      'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/royal.jpg.jpeg',
      'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/royal-bathroom.jpg.jpeg',
      'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/lobby-loung-1.jpg.jpeg',
    ],
    amenities: [
      { name: 'Ruang Tamu Terpisah (Living Area)', icon: 'sofa' },
      { name: 'Bathtub Rendam Mewah & Shower', icon: 'bath' },
      { name: 'Super King Bed 200x200 cm', icon: 'bed' },
      { name: '2 Unit Smart TV LED', icon: 'tv' },
      { name: 'Wi-Fi VIP Tanpa Batas', icon: 'wifi' },
      { name: 'Mesin Kopi Kapsul Espresso', icon: 'coffee' },
      { name: 'Mini Bar Gratis (Complimentary)', icon: 'fridge' },
      { name: 'Bathrobe Mewah & Sandal Resor', icon: 'bath' },
      { name: 'Layanan Concierge Prioritas', icon: 'room-service' },
    ],
    highlights: [
      'Keluasan Ekstra 54 Meter Persegi',
      'Ruang Tamu Terpisah dengan Sofa Elegan',
      'Kamar Mandi Marmer dengan Bathtub Rendam',
      'Akses Fasilitas Prioritas & VIP Welcome Drink',
    ],
    virtualTourUrl: '#virtual-tour',
  },
]

export const DINING_DATA: DiningItem[] = [
  {
    id: 'hegarmanah',
    slug: 'restoran-hegarmanah',
    name: 'Restoran Hegarmanah',
    type: 'Open-Air & Semi-Outdoor Dining',
    cuisine: 'Masakan Tradisional Sunda & Favorit Nusantara',
    openingHours: '06:00 - 22:00 WIB',
    capacity: '180 Kursi',
    tagline: 'Bersantap di tengah semilir angin sejuk Bogor dengan panorama hijau',
    description:
      'Restoran Hegarmanah menghadirkan suasana santap terbuka yang menyegarkan di tepi taman resor. Menawarkan aneka hidangan otentik Sunda mulai dari nasi liwet wangi, gurame goreng kipas, ayam bakakak, hingga sambal dadak khas Jawa Barat, disandingkan dengan pemandangan alam Bogor yang menyejukkan jiwa.',
    featuredImage: '/api/media/file/restoran-hegarmanah-sunda-bogor.jpg',
    gallery: [
      'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/hegarmanah-1.jpg.jpeg',
      'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/bancakan.jpg.jpeg',
    ],
    specialties: [
      'Nasi Liwet Komplit Khas Padjadjaran',
      'Gurame Terbang Saus Mangga & Sambal Terasi',
      'Ayam Bakakak Bakar Madu',
      'Es Kelapa Kopyor Madu Segar',
    ],
  },
  {
    id: 'bancakan',
    slug: 'restoran-bancakan',
    name: 'Restoran Bancakan',
    type: 'Indoor Fine Casual Dining',
    cuisine: 'All-Day Dining & International Buffet',
    openingHours: '06:00 - 23:00 WIB',
    capacity: '150 Kursi',
    tagline: 'Ruang jamuan prasmanan mewah ber-AC dengan sentuhan interior kontemporer',
    description:
      'Restoran Bancakan merupakan venue utama untuk sarapan pagi prasmanan (buffet breakfast) berlimpah, santap siang korporat, dan jamuan makan malam elegan. Memadukan kemewahan interior berpendingin udara dengan layanan ramah khas hotel bintang 5.',
    featuredImage: '/api/media/file/restoran-bancakan-buffet-bogor.jpg',
    gallery: [
      'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/bancakan.jpg.jpeg',
      'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/lobby-loung-1.jpg.jpeg',
    ],
    specialties: [
      'International Breakfast Buffet (Western, Asian, Indonesian)',
      'Sop Buntut Spesial Padjadjaran',
      'Australian Tenderloin Steak with Truffle Sauce',
      'Dessert & Pastry Counter Segar Tiap Hari',
    ],
  },
  {
    id: 'lobby-lounge',
    slug: 'lobby-lounge',
    name: 'Lobby Lounge & Bar',
    type: 'Lounge, Bar & Coffee Shop',
    cuisine: 'Kopi Barista, Teh Herbal, Mocktails & Finger Food',
    openingHours: '08:00 - 24:00 WIB',
    capacity: '60 Kursi',
    tagline: 'Tempat ideal untuk pertemuan santai, afternoon tea, dan relaksasi',
    description:
      'Terletak di lobi utama hotel dengan sofa empuk yang nyaman. Menawarkan tempat sempurna untuk menunggu check-in, membaca buku, berdiskusi santai dengan mitra bisnis, atau menikmati senja sambil mencicipi aneka racikan mocktail segar dan afternoon tea.',
    featuredImage: '/api/media/file/lobby-lounge-bar-padjadjaran-suites.jpg',
    gallery: [
      'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/lobby-loung-1.jpg.jpeg',
      'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/lobby-2.jpg.jpeg',
    ],
    specialties: [
      'Specialty Single Origin Indonesian Coffee',
      'Royal Afternoon Tea with Tiered Pastries',
      'Tropical Fruit Smoothies & Mocktails',
      'Truffle Fries & Chicken Bitterballen',
    ],
  },
]

export const EVENTS_DATA: EventItem[] = [
  {
    id: 'bale-pakuan',
    slug: 'bale-pakuan-grand-ballroom',
    name: 'Bale Pakuan Grand Ballroom',
    type: 'Grand Ballroom & Convention Center',
    areaSize: '1.200 m²',
    ceilingHeight: '7 Meter',
    capacityMax: 1000,
    tagline: 'Gedung konvensi terkemuka di Bogor untuk pesta pernikahan megah & MICE',
    description:
      'Bale Pakuan Grand Ballroom merupakan ikon ruang pertemuan di Padjadjaran Suites Resort. Berdiri dalam bangunan mandiri yang luas, ballroom ini dilengkapi panggung megah, tata lampu chandelier kristal memukau, ruang VIP rias pengantin, serta sistem audio-visual terintegrasi yang mampu menampung hingga 1.000 undangan dalam format cocktail / resepsi.',
    featuredImage: '/api/media/file/bale-pakuan-grand-ballroom-1.jpg',
    gallery: [
      'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/ballroom-1.jpg.jpeg',
      'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/ballroom-2.jpg.jpeg',
      'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/ballroom-3.jpg.jpeg',
      'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/ballroom-4.jpg.jpeg',
      'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/ballroom-5.jpg.jpeg',
    ],
    layouts: [
      { style: 'Standing / Cocktail (Resepsi)', capacity: 1000 },
      { style: 'Theatre Style (Seminar Akbar)', capacity: 750 },
      { style: 'Round Table / Banquet (Gala Dinner)', capacity: 450 },
      { style: 'Classroom Style (Pelatihan)', capacity: 350 },
    ],
    features: [
      'Gedung Ballroom Terpisah Bebas Gangguan',
      'Kapasitas Hingga 1.000 Tamu Undangan',
      'Kamar Bridal Suite Termasuk dalam Paket',
      'Area Parkir Luas & Layanan Valet',
      'Panggung Permanen & Sound System 10.000 Watt',
      'Tim Banquet & Event Planner Profesional',
    ],
  },
  {
    id: 'rancage-meeting-rooms',
    slug: 'ruang-pertemuan-rancage',
    name: 'Ruang Pertemuan Rancage (Meeting Rooms)',
    type: 'Corporate Meeting & Training Rooms',
    areaSize: '60 - 250 m²',
    ceilingHeight: '3.5 Meter',
    capacityMax: 180,
    tagline: 'Lebih dari 20 ruang pertemuan berfasilitas modern dan konfigurasi fleksibel',
    description:
      'Tersedia lebih dari 20 ruang rapat (Rancage 1 s/d Rancage 20+) yang dapat disesuaikan untuk kebutuhan rapat dewan direksi, rapat kerja kementerian, pelatihan korporasi, hingga seminar skala menengah. Dilengkapi proyektor resolusi tinggi, whiteboard interaktif, koneksi internet khusus, serta paket coffee break bercita rasa tinggi.',
    featuredImage: '/api/media/file/ruang-rapat-rancage-theatre-bogor.jpg',
    gallery: [
      'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/meeting-room-3.jpg.jpeg',
      'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/meeting-room-1.jpg.jpeg',
      'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/meeting-room-2.jpg.jpeg',
      'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/meeting-room-4.jpg.jpeg',
    ],
    layouts: [
      { style: 'Theatre Style', capacity: 180 },
      { style: 'Classroom Style', capacity: 120 },
      { style: 'Round Table', capacity: 90 },
      { style: 'U-Shape Boardroom', capacity: 50 },
    ],
    features: [
      'Koneksi Internet Dedicated Khusus Peserta',
      'Paket Full Day & Half Day Meeting',
      'Coffee Break Manis & Gurih 2 Sesi',
      'Makan Siang / Malam Prasmanan di Restoran',
      'Flipchart, Notepad & Meeting Kits',
    ],
  },
  {
    id: 'wedding-package',
    slug: 'paket-pernikahan-royal-bogor',
    name: 'Paket Pernikahan Impian (Royal Wedding)',
    type: 'Wedding Package',
    areaSize: 'Bale Pakuan Ballroom',
    ceilingHeight: '7 Meter',
    capacityMax: 800,
    tagline: 'Wujudkan kenangan pernikahan sakral berbalut kemewahan alam Bogor',
    description:
      'Paket pernikahan komprehensif yang dirancang untuk mempermudah calon pengantin mewujudkan pesta pernikahan idaman. Termasuk pemakaian Bale Pakuan Ballroom selama 4 jam, jamuan prasmanan lengkap untuk minimal 500 pax, food tasting gratis, kamar pengantin Royal Suite, kamar keluarga, serta perizinan acara.',
    featuredImage: '/api/media/file/dekorasi-pernikahan-wedding-bale-pakuan.jpg',
    gallery: [
      'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/ballroom-2.jpg.jpeg',
      'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/royal.jpg.jpeg',
      'https://padjadjaransuitesresort.com/wp-content/uploads/2026/06/ballroom-1.jpg.jpeg',
    ],
    layouts: [
      { style: 'Wedding Standing Reception (500-800 Pax)', capacity: 800 },
      { style: 'Intimate Wedding Banquet', capacity: 350 },
    ],
    features: [
      'Pemakaian Bale Pakuan Ballroom 4 Jam',
      'Menu Prasmanan Pilihan + Aneka Food Stall',
      'Gratis 1 Malam di Royal Suite Room untuk Pengantin',
      'Gratis 2 Kamar Superior untuk Keluarga Inti',
      'Food Tasting untuk 6 Orang Sebelum Hari-H',
      'Standar Sound System & Lighting Pelaminan',
    ],
  },
]

export const FACILITIES_DATA: FacilityItem[] = [
  {
    id: 'infinity-pool',
    slug: 'kolam-renang-outdoor',
    name: 'Kolam Renang Outdoor & Kids Pool',
    category: 'Recreation',
    openingHours: '06:00 - 18:00 WIB',
    tagline: 'Berenang di bawah langit biru Bogor dengan pemandangan rimbun',
    description:
      'Kolam renang luar ruangan yang luas dengan air jernih dan segar, dilengkapi dengan kolam dangkal khusus anak-anak serta kursi jemur tepi kolam untuk bersantai menikmati udara pegunungan.',
    featuredImage: '/api/media/file/kolam-renang-outdoor-padjadjaran-suites.jpg',
    features: ['Kolam Renang Dewasa & Anak', 'Towel Service Gratis', 'Area Duduk Tepi Kolam', 'Menu Minuman Poolside'],
  },
  {
    id: 'spa-wellness',
    slug: 'padjadjaran-spa-wellness',
    name: 'Nirwana Spa & Massage Sanctuary',
    category: 'Wellness',
    openingHours: '09:00 - 22:00 WIB',
    tagline: 'Kembalikan kesegaran raga dengan terapi relaksasi tradisional Sunda',
    description:
      'Layanan perawatan spa dan pijat relaksasi yang menggunakan minyak aromaterapi alami dan teknik pijat tradisional Sunda untuk meredakan ketegangan otot dan menyegarkan pikiran Anda.',
    featuredImage: '/api/media/file/nirwana-spa-wellness-sanctuary.jpg',
    features: ['Traditional Sundanese Massage', 'Aromatherapy Reflexology', 'Body Scrub Alami', 'Private Couple Treatment Room'],
  },
  {
    id: 'fitness-center',
    slug: 'fitness-center',
    name: 'Pusat Kebugaran (Fitness Center)',
    category: 'Fitness',
    openingHours: '06:00 - 21:00 WIB',
    tagline: 'Jaga kebugaran tubuh selama perjalanan bisnis dan liburan',
    description:
      'Dilengkapi dengan aneka peralatan kardio seperti treadmill, sepeda statis, dan dumbell beban untuk tamu yang ingin tetap aktif berolahraga selama menginap.',
    featuredImage: '/api/media/file/pusat-kebugaran-fitness-center-hotel.jpg',
    features: ['Treadmill & Cardio Equipment', 'Free Weights & Dumbell Rack', 'Handuk & Air Minum Gratis', 'Khusus Tamu Menginap'],
  },
  {
    id: 'kids-corner',
    slug: 'taman-bermain-anak',
    name: 'Taman Bermain Anak & Aktivitas Keluarga',
    category: 'Family',
    openingHours: '08:00 - 18:00 WIB',
    tagline: 'Momen keceriaan dan kegembiraan buah hati tercinta',
    description:
      'Area bermain ramah anak di kawasan luar dan dalam ruangan yang aman dan menyenangkan, cocok untuk mengisi liburan akhir pekan keluarga Anda di Bogor.',
    featuredImage: '/api/media/file/taman-bermain-anak-kids-playground.jpg',
    features: ['Playground Ayunan & Perosotan', 'Aktivitas Mewarnai Akhir Pekan', 'Lokasi Dekat The Jungle Waterpark BNR'],
  },
]

export interface OfferItem {
  id: string
  slug: string
  title: string
  category: 'stay' | 'dining' | 'adventure' | 'events' | 'meeting'
  categoryLabel: string
  discountBadge: string
  price: string
  shortDescription: string
  inclusions: string[]
  terms: string[]
  validUntil: string
  featuredImage: string
  ctaType: 'booking' | 'whatsapp' | 'rfp'
  ctaLink: string
  ctaText: string
}

export const OFFERS_DATA_ID: OfferItem[] = [
  {
    id: 'honeymoon-package',
    slug: 'honeymoon-package',
    title: 'Paket Bulan Madu Romantis (Honeymoon Package)',
    category: 'stay',
    categoryLabel: 'Kamar & Romantis',
    discountBadge: 'Royal Suite & Dinner',
    price: 'Rp 1.985.000,- /kamar/malam',
    shortDescription:
      'Momen terindah menginap di kamar Royal Suite dengan panorama megah Gunung Salak, penataan dekorasi romantis, serta jamuan makan malam intim bersama pasangan.',
    inclusions: [
      '1 Malam Menginap di Kamar Royal Suite Pemandangan Gunung Salak',
      'Makan Malam Romantis (Candlelight Dinner) Set Menu Eksklusif 2 Orang',
      'Penataan Dekorasi Tempat Tidur Bulan Madu (Honeymoon Bed Setup)',
      'Sarapan Prasmanan Spesial untuk 2 Orang di Restoran Hegarmanah',
      'Welcome Drink Segar & Welcome Cake / Fruit Basket Saat Tiba di Kamar',
    ],
    terms: [
      'Berlaku setiap hari dengan pemesanan minimal 3 hari sebelum kedatangan.',
      'Paket sudah termasuk pajak dan biaya pelayanan hotel.',
      'Tergantung pada ketersediaan kamar Royal Suite.',
    ],
    validUntil: '31 Desember 2026',
    featuredImage: '/api/media/file/promo-paket-bulan-madu-honeymoon-bogor.jpg',
    ctaType: 'booking',
    ctaLink: '/booking?room=royal-suite',
    ctaText: 'Pesan Paket Honeymoon',
  },
  {
    id: 'eat-and-stay',
    slug: 'eat-and-stay',
    title: 'Eat & Stay: Voucher Menginap Kamar Gratis',
    category: 'dining',
    categoryLabel: 'Kuliner & Jamuan',
    discountBadge: 'Gratis Voucher Kamar',
    price: 'Min. Transaksi Rp 1.000.000,-',
    shortDescription:
      'Nikmati aneka jamuan kuliner khas Sunda dan hidangan favorit Nusantara di Restoran Hegarmanah dan dapatkan voucher menginap kamar gratis di Padjadjaran Suites Resort.',
    inclusions: [
      'Voucher Menginap Kamar Gratis di Padjadjaran Suites Resort & Convention Hotel',
      'Berlaku untuk Setiap Transaksi F&B Minimum Rp 1.000.000,- di Restoran Hegarmanah',
      'Pilihan Menu Autentik Sunda (Nasi Timbel, Ayam Bakar Parahyangan, Gurame Goreng)',
      'Suasana Bersantap Semi-Outdoor dengan Pemandangan Gunung Salak yang Sejuk',
    ],
    terms: [
      'Voucher kamar gratis berlaku untuk menginap di hari kerja (Senin s/d Kamis).',
      'Voucher tidak dapat diuangkan dan berlaku sesuai masa aktif yang tertera.',
      'Reservasi kamar menggunakan voucher wajib konfirmasi minimal H-3.',
    ],
    validUntil: '31 Desember 2026',
    featuredImage: '/api/media/file/promo-eat-and-stay-padjadjaran-suites.jpg',
    ctaType: 'whatsapp',
    ctaLink: 'https://wa.me/6285183093061?text=Halo%20Padjadjaran%20Suites,%20saya%20tertarik%20dengan%20Promo%20Eat%20and%20Stay%20Restoran%20Hegarmanah',
    ctaText: 'Reservasi Meja & Info Promo',
  },
  {
    id: 'family-offroad',
    slug: 'family-offroad-adventure',
    title: 'Family Offroad Adventure Suzuki Jimny 4x4',
    category: 'adventure',
    categoryLabel: 'Petualangan & Rekreasi',
    discountBadge: 'Wisata Alam Keluarga',
    price: 'Rute Hotel s/d Curug Putri',
    shortDescription:
      'Pengalaman seru menjelajah alam perbukitan asri Bogor menggunakan armada Suzuki Jimny 4x4 legendaris. Durasi 3 jam sejauh 4,5 km melintasi jalur menantang menuju air terjun Curug Putri.',
    inclusions: [
      'Armada Suzuki Jimny 4x4 Khusus Offroad & Driver Berpengalaman',
      'Durasi Petualangan 3 Jam (Jarak Tempuh 4,5 KM Jalur Menantang)',
      'Rute Eksotis Perbukitan Bogor Hingga Wisata Air Terjun Curug Putri',
      'Air Mineral Segar & Bantuan Spot Foto Terbaik Sepanjang Perjalanan',
      'Titik Kumpul & Penjemputan Langsung dari Lobi Hotel',
    ],
    terms: [
      'Minimal pemesanan 1 mobil (kapasitas 3-4 orang).',
      'Pemesanan wajib dikonfirmasi minimal H-1 sebelum jadwal keberangkatan.',
      'Jadwal keberangkatan fleksibel pagi (08:00 WIB) atau siang (13:00 WIB).',
    ],
    validUntil: '31 Desember 2026',
    featuredImage: '/api/media/file/promo-family-offroad-adventure-bogor.jpg',
    ctaType: 'whatsapp',
    ctaLink: 'https://wa.me/6285183093061?text=Halo%20Padjadjaran%20Suites,%20saya%20ingin%20booking%20Paket%20Family%20Offroad%20Jimny%20ke%20Curug%20Putri',
    ctaText: 'Pesan Paket Offroad via WA',
  },
  {
    id: 'bale-pakuan-wedding',
    slug: 'bale-pakuan-wedding-package',
    title: 'Paket Pernikahan Megah Bale Pakuan (Wedding)',
    category: 'events',
    categoryLabel: 'Pernikahan & Resepsi',
    discountBadge: 'Kapasitas s/d 1.000 Tamu',
    price: 'Mulai Rp 175.000,- nett /pax',
    shortDescription:
      'Wujudkan resepsi pernikahan impian berlatar kemegahan Bale Pakuan Grand Ballroom berkapasitas hingga 1.000 undangan dengan jamuan prasmanan terbaik dan suite pengantin mewah.',
    inclusions: [
      'Penggunaan Bale Pakuan Grand Ballroom Selama 4 Jam Penuh',
      'Menu Prasmanan Banquet Lengkap (Appetizer, Sup, Main Course, Dessert)',
      'Ukiran Es Artistik (Ice Carving) Berinisial Nama Pasangan Pengantin',
      'Gratis 1 Malam Menginap di Kamar Pengantin (Bridal Suite) dengan Honeymoon Setup',
      'Ruang Rias Pengantin Pribadi (Make-up Room) & Fasilitas Ruang Tunggu Keluarga',
      'Layar Raksasa & Proyektor Resolusi Tinggi untuk Video Wedding',
      'Free Flow Air Es Dingin Selama Acara Berlangsung',
    ],
    terms: [
      'Minimum pemesanan 500 pax.',
      'Sudah termasuk sound system standar acara dan pencahayaan ballroom.',
      'Uji coba menu (Food Tasting) gratis untuk 6 orang keluarga setelah DP terkonfirmasi.',
    ],
    validUntil: '31 Desember 2026',
    featuredImage: '/api/media/file/promo-bale-pakuan-wedding-package.jpg',
    ctaType: 'rfp',
    ctaLink: '/events#rfp',
    ctaText: 'Minta Proposal Pernikahan',
  },
  {
    id: 'table-manner-package',
    slug: 'paket-table-manner-bintang-lima',
    title: 'Paket Pelatihan Table Manner Bintang Lima',
    category: 'meeting',
    categoryLabel: 'Bisnis & Edukasi',
    discountBadge: 'Sertifikat Resmi Hotel',
    price: 'Mulai Rp 200.000,- nett /pax',
    shortDescription:
      'Pelatihan etiket bersantap resmi berstandar internasional dipandu instruktur profesional perhotelan, mencakup 4-course fine dining, sertifikat resmi, dan hotel tour keliling resor.',
    inclusions: [
      'Jamuan 4-Course Fine Dining Menu Lengkap (Appetizer, Soup, Main Course, Dessert)',
      'Sertifikat Resmi Pelatihan Table Manner dari Padjadjaran Suites Resort',
      'Buku Panduan Tata Krama Perjamuan Resmi & Etiket Meja Makan Internasional',
      'Hotel Tour Eksklusif Mengunjungi Kamar Mewah, Dapur Banquet, dan Ballroom',
      'Demonstrasi Langsung Cooking / Table Setup oleh Chef dan Banquet Manager',
    ],
    terms: [
      'Minimum pemesanan 30 pax.',
      'Sangat direkomendasikan untuk universitas, sekolah kejuruan, dinas, dan korporasi.',
      'Instruktur bersertifikasi perhotelan nasional.',
    ],
    validUntil: '31 Desember 2026',
    featuredImage: '/api/media/file/promo-kursus-table-manner-bintang-lima.jpg',
    ctaType: 'whatsapp',
    ctaLink: 'https://wa.me/6285183093061?text=Halo%20Padjadjaran%20Suites,%20saya%20ingin%20konsultasi%20Paket%20Table%20Manner%20untuk%20grup%20kami',
    ctaText: 'Konsultasi Table Manner via WA',
  },
  {
    id: 'birthday-social-package',
    slug: 'paket-ulang-tahun-arisan',
    title: 'Paket Perayaan Ulang Tahun & Arisan (Social Event)',
    category: 'events',
    categoryLabel: 'Acara Sosial & Komunitas',
    discountBadge: 'Min. 100 Pax',
    price: 'Mulai Rp 150.000,- nett /pax',
    shortDescription:
      'Rayakan hari ulang tahun istimewa, wisuda, reuni akbar, atau arisan keluarga besar dengan hidangan prasmanan nikmat dan ruang perjamuan sejuk berpemandangan asri Bogor.',
    inclusions: [
      'Penggunaan Ruang Perjamuan (Function Hall) Sejuk Ber-AC Selama 4 Jam',
      'Pilihan Menu Prasmanan Lezat Nusantara & Favorit Masakan Tradisional Sunda',
      'Sound System Standar, Mikrofon Nirkabel, & Fasilitas Panggung Mini',
      'Meja Penerima Tamu Khusus & Tim Banquet Pendamping Berpengalaman',
    ],
    terms: [
      'Minimum pemesanan 100 pax.',
      'Dapat dikombinasikan dengan pesanan kue ulang tahun khusus dari pastry chef kami.',
      'Reservasi tanggal wajib mengonfirmasi booking fee minimal 2 minggu sebelumnya.',
    ],
    validUntil: '31 Desember 2026',
    featuredImage: '/api/media/file/promo-paket-ulang-tahun-arisan-gathering.jpg',
    ctaType: 'whatsapp',
    ctaLink: 'https://wa.me/6285183093061?text=Halo%20Padjadjaran%20Suites,%20saya%20ingin%20tanya%20Paket%20Ulang%20Tahun%20/%20Arisan',
    ctaText: 'Konsultasi Acara via WA',
  },
  {
    id: 'direct-booking-guarantee',
    slug: 'best-rate-guarantee-promo',
    title: 'Jaminan Tarif Resmi Langsung (Best Rate Guarantee)',
    category: 'stay',
    categoryLabel: 'Kamar & Menginap',
    discountBadge: 'Keuntungan Booking Resmi',
    price: 'Tarif Terendah Terjamin',
    shortDescription:
      'Pesan kamar langsung melalui situs web resmi atau WhatsApp concierge kami untuk menikmati tarif terendah terjamin tanpa biaya perantara tersembunyi, dengan opsi sarapan atau room only.',
    inclusions: [
      'Jaminan Tarif Kamar Terendah Dibandingkan Aplikasi Online Travel Agent (OTA)',
      'Pilihan Fleksibel Tarif Termasuk Sarapan Prasmanan 2 Orang atau Room Only',
      'Prioritas Permintaan Early Check-in atau Late Check-out (Sesuai Ketersediaan)',
      'Kemudahan Reschedule Jadwal Menginap Langsung dengan Resepsionis Hotel',
      'Bebas Biaya Pemesanan Tambahan & Transparansi Harga Terbaik',
    ],
    terms: [
      'Berlaku untuk seluruh tipe kamar (Superior, Deluxe, Executive, Royal Suite).',
      'Pemesanan dilakukan langsung via website resmi atau WhatsApp resmi hotel.',
    ],
    validUntil: 'Sepanjang Tahun 2026',
    featuredImage: '/api/media/file/promo-best-rate-guarantee-flash-sale.jpg',
    ctaType: 'booking',
    ctaLink: '/booking',
    ctaText: 'Pesan Kamar Langsung',
  },
]

export const OFFERS_DATA_EN: OfferItem[] = [
  {
    id: 'honeymoon-package',
    slug: 'honeymoon-package',
    title: 'Romantic Honeymoon Sanctuary Package',
    category: 'stay',
    categoryLabel: 'Stay & Romance',
    discountBadge: 'Royal Suite & Dinner',
    price: 'IDR 1,985,000 /room/night',
    shortDescription:
      'An unforgettable romantic retreat in our Royal Suite featuring panoramic Mount Salak vistas, romantic honeymoon bed decor, and an intimate candlelight dinner.',
    inclusions: [
      '1 Night Stay in Luxurious Royal Suite with Scenic Mount Salak Views',
      'Romantic 3-Course Candlelight Dinner Set Menu for 2 Persons',
      'Artful Romantic Honeymoon Bed Decorations & Rose Petal Touch',
      'Complimentary Daily Buffet Breakfast for 2 Persons at Hegarmanah Restaurant',
      'Refreshing Welcome Drink & Welcome Cake / Fruit Basket upon Arrival',
    ],
    terms: [
      'Valid daily with reservations required at least 3 days prior to arrival.',
      'Rate inclusive of all prevailing service charges and government taxes.',
      'Subject to Royal Suite availability.',
    ],
    validUntil: 'December 31, 2026',
    featuredImage: '/api/media/file/promo-paket-bulan-madu-honeymoon-bogor.jpg',
    ctaType: 'booking',
    ctaLink: '/booking?room=royal-suite',
    ctaText: 'Book Honeymoon Package',
  },
  {
    id: 'eat-and-stay',
    slug: 'eat-and-stay',
    title: 'Eat & Stay: Complimentary Room Stay Voucher',
    category: 'dining',
    categoryLabel: 'Culinary & Dining',
    discountBadge: 'Free Room Voucher',
    price: 'Min. Spend IDR 1,000,000',
    shortDescription:
      'Indulge in authentic Sundanese feasts and Indonesian specialty dining at Hegarmanah Restaurant and earn a complimentary hotel room stay voucher.',
    inclusions: [
      'Complimentary Room Stay Voucher at Padjadjaran Suites Resort & Convention Hotel',
      'Earned with Minimum F&B Spend of IDR 1,000,000 in a Single Receipt at Hegarmanah',
      'Authentic Sundanese Specialties (Nasi Timbel, Parahyangan Grilled Chicken, Crispy Carp)',
      'Semi-Outdoor Scenic Dining Overlooking Mount Salak in Fresh Mountain Air',
    ],
    terms: [
      'Complimentary room voucher valid for weekday stays (Monday through Thursday).',
      'Voucher is non-cashable and valid according to the expiry printed on physical card.',
      'Room reservation using voucher requires minimum 3-day advance notice.',
    ],
    validUntil: 'December 31, 2026',
    featuredImage: '/api/media/file/promo-eat-and-stay-padjadjaran-suites.jpg',
    ctaType: 'whatsapp',
    ctaLink: 'https://wa.me/6285183093061?text=Hello%20Padjadjaran%20Suites,%20I%20am%20interested%20in%20the%20Eat%20and%20Stay%20Promo%20at%20Hegarmanah%20Restaurant',
    ctaText: 'Reserve Table & Inquire',
  },
  {
    id: 'family-offroad',
    slug: 'family-offroad-adventure',
    title: 'Family Offroad 4x4 Mountain Expedition',
    category: 'adventure',
    categoryLabel: 'Adventure & Leisure',
    discountBadge: 'Family Nature Adventure',
    price: 'Hotel to Curug Putri Trail',
    shortDescription:
      'An exhilarating 3-hour offroad expedition in Bogor’s lush hills aboard a rugged Suzuki Jimny 4x4. Traverse 4.5 km of scenic trails directly to Curug Putri waterfall.',
    inclusions: [
      'Dedicated Suzuki Jimny 4x4 Rig & Professional Mountain Driver',
      '3-Hour Offroad Adventure Trail (4.5 KM Exhilarating Jungle & Hill Route)',
      'Scenic Journey Leading Directly to Curug Putri Waterfall',
      'Complimentary Mineral Water & Photo Spot Assistance Along the Way',
      'Convenient Pick-up & Return Departure Directly at Hotel Main Lobby',
    ],
    terms: [
      'Minimum booking of 1 vehicle (capacity 3-4 persons).',
      'Advance reservation required at least 1 day prior to departure.',
      'Flexible morning (08:00 AM) or afternoon (01:00 PM) departure times.',
    ],
    validUntil: 'December 31, 2026',
    featuredImage: '/api/media/file/promo-family-offroad-adventure-bogor.jpg',
    ctaType: 'whatsapp',
    ctaLink: 'https://wa.me/6285183093061?text=Hello%20Padjadjaran%20Suites,%20I%20would%20like%20to%20book%20the%20Family%20Offroad%20Jimny%20Adventure%20to%20Curug%20Putri',
    ctaText: 'Book Offroad via WhatsApp',
  },
  {
    id: 'bale-pakuan-wedding',
    slug: 'bale-pakuan-wedding-package',
    title: 'Bale Pakuan Grand Ballroom Wedding Package',
    category: 'events',
    categoryLabel: 'Weddings & Receptions',
    discountBadge: 'Capacity up to 1,000 Guests',
    price: 'Starts from IDR 175,000 nett /pax',
    shortDescription:
      'Celebrate your once-in-a-lifetime wedding reception in the grand Bale Pakuan Ballroom for up to 1,000 guests, featuring comprehensive banqueting and complimentary bridal suite.',
    inclusions: [
      'Full 4-Hour Exclusive Usage of Bale Pakuan Grand Ballroom',
      'Comprehensive Banquet Buffet (Appetizer, Soup, Main Courses, Assorted Desserts)',
      'Handcrafted Ice Carving with Couple’s Monogram / Initials',
      'Complimentary 1-Night Stay in Luxury Bridal Suite with Honeymoon Decor',
      'Private Bridal Make-Up Suite & VIP Family Waiting Lounge',
      'Giant Projection Screens & High-Definition Audio Visual Equipment',
      'Complimentary Free-Flow Chilled Water Throughout Event',
    ],
    terms: [
      'Minimum guarantee of 500 guests.',
      'Includes standard banquet sound system and grand hall illumination.',
      'Complimentary food tasting for up to 6 family members upon deposit confirmation.',
    ],
    validUntil: 'December 31, 2026',
    featuredImage: '/api/media/file/promo-bale-pakuan-wedding-package.jpg',
    ctaType: 'rfp',
    ctaLink: '/events#rfp',
    ctaText: 'Request Wedding Proposal',
  },
  {
    id: 'table-manner-package',
    slug: 'paket-table-manner-bintang-lima',
    title: 'Five-Star Professional Table Manner Course',
    category: 'meeting',
    categoryLabel: 'Corporate & Education',
    discountBadge: 'Official Certificate',
    price: 'Starts from IDR 200,000 nett /pax',
    shortDescription:
      'Master international dining etiquette led by certified hospitality instructors, featuring a 4-course banquet, official hotel certification, and an exclusive behind-the-scenes resort tour.',
    inclusions: [
      '4-Course Fine Dining Experience (Appetizer, Soup, Main Course, Dessert)',
      'Official Certificate of Completion from Padjadjaran Suites Resort',
      'International Formal Dining Protocol & Table Etiquette Guidebook',
      'Exclusive Resort Tour (Luxury Suites, Banquet Kitchens, Grand Ballroom)',
      'Live Table Setting & Napkin Folding Demonstrations by Hotel Chiefs',
    ],
    terms: [
      'Minimum guarantee of 30 participants.',
      'Highly recommended for universities, vocational colleges, government, and corporate teams.',
      'Conducted by certified professional hospitality masters.',
    ],
    validUntil: 'December 31, 2026',
    featuredImage: '/api/media/file/promo-kursus-table-manner-bintang-lima.jpg',
    ctaType: 'whatsapp',
    ctaLink: 'https://wa.me/6285183093061?text=Hello%20Padjadjaran%20Suites,%20I%20would%20like%20to%20consult%20about%20the%20Table%20Manner%20Course%20for%20our%20group',
    ctaText: 'Inquire Table Manner via WA',
  },
  {
    id: 'birthday-social-package',
    slug: 'paket-ulang-tahun-arisan',
    title: 'Milestone Celebration & Social Gathering Package',
    category: 'events',
    categoryLabel: 'Social & Celebrations',
    discountBadge: 'Min. 100 Pax',
    price: 'Starts from IDR 150,000 nett /pax',
    shortDescription:
      'Host your memorable birthday milestone, graduation celebration, grand reunion, or family gathering with delicious buffet catering in our scenic, air-conditioned banquet halls.',
    inclusions: [
      '4-Hour Exclusive Access to Air-Conditioned Scenic Function Hall',
      'Delightful Buffet Feast Featuring Authentic Indonesian & Western Favorites',
      'Standard Audio System, Wireless Microphones, & Mini Stage Setup',
      'Dedicated Guest Reception Table & Attentive Banquet Service Crew',
    ],
    terms: [
      'Minimum guarantee of 100 guests.',
      'Customizable celebration cakes can be ordered through our resident pastry chef.',
      'Advance reservation deposit required at least 2 weeks prior to event.',
    ],
    validUntil: 'December 31, 2026',
    featuredImage: '/api/media/file/promo-paket-ulang-tahun-arisan-gathering.jpg',
    ctaType: 'whatsapp',
    ctaLink: 'https://wa.me/6285183093061?text=Hello%20Padjadjaran%20Suites,%20I%20would%20like%20to%20inquire%20about%20the%20Birthday%20/%20Social%20Gathering%20Package',
    ctaText: 'Consult Celebration via WA',
  },
  {
    id: 'direct-booking-guarantee',
    slug: 'best-rate-guarantee-promo',
    title: 'Official Best Rate Direct Booking Guarantee',
    category: 'stay',
    categoryLabel: 'Rooms & Stays',
    discountBadge: 'Official Direct Benefits',
    price: 'Guaranteed Lowest Rate',
    shortDescription:
      'Book directly through our official website or WhatsApp concierge to enjoy our guaranteed lowest rates, flexible breakfast options, and zero hidden intermediary markups.',
    inclusions: [
      'Guaranteed Lowest Rates Compared to Any Online Travel Agent (OTA)',
      'Flexible Choice of Buffet Breakfast Included or Room Only Rates',
      'Priority Early Check-in or Late Check-out (Subject to Room Availability)',
      'Seamless Direct Rescheduling Flexibility with Hotel Front Desk',
      'Zero Hidden Booking Surcharges or Administrative Fees',
    ],
    terms: [
      'Applicable across all room tiers (Superior, Deluxe, Executive, Royal Suite).',
      'Valid exclusively for bookings placed through our official website or hotel WhatsApp.',
    ],
    validUntil: 'Throughout 2026',
    featuredImage: '/api/media/file/promo-best-rate-guarantee-flash-sale.jpg',
    ctaType: 'booking',
    ctaLink: '/booking',
    ctaText: 'Book Direct With Confidence',
  },
]

