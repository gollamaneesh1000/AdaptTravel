/**
 * Master Travel Database (India Travel & Vibe Directory)
 * Contains structured master data for:
 * - 50+ Top Destinations across all Indian states and regions
 * - 300+ Vibe-Categorized Places (Spiritual, Adventure, Romantic, Heritage, Nature, Beaches, Party, Culinary)
 * - Accommodations (Ashrams, Homestays, Heritage Palaces, 5★ Luxury)
 * - Transit Hubs & Route Operators (AC Sleeper Buses, Vande Bharat Trains, Domestic Flights, Private Cabs)
 */

export const MASTER_DESTINATIONS = [
  // --- HIMALAYAN & NORTH REGION ---
  {
    id: 'manali',
    name: 'Manali',
    state: 'Himachal Pradesh',
    region: 'North',
    altitude: '6,726 ft',
    coordinates: { lat: 32.2396, lng: 77.1887 },
    weather: { temp: '14°C', condition: 'Crisp Pine Breeze', icon: 'CloudSnow', humidity: '52%', rain: '5%', wind: '10 km/h' },
    bestSeason: 'Oct – Jun',
    description: 'High-altitude Himalayan valley nestled among towering deodar forests, glacial rivers, and snow passes.',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1000&auto=format&fit=crop',
    tags: ['Snow', 'Treks', 'Rivers', 'Pine Forests', 'Temples'],
    primaryHub: {
      bus: 'Manali Central ISBT (Mall Road)',
      train: 'Chandigarh Junction (310 km) / Joginder Nagar (165 km)',
      flight: 'Bhuntar Kullu Airport (KUU, 50 km)',
    }
  },
  {
    id: 'kedarnath',
    name: 'Kedarnath Dham',
    state: 'Uttarakhand',
    region: 'North',
    altitude: '11,755 ft',
    coordinates: { lat: 30.7352, lng: 79.0669 },
    weather: { temp: '6°C', condition: 'Sacred Himalayan Chill', icon: 'CloudSnow', humidity: '55%', rain: '10%', wind: '14 km/h' },
    bestSeason: 'May – Oct',
    description: 'The supreme Himalayan Jyotirlinga and pinnacle of Chardham, situated beneath majestic snow-clad Kedarnath Peak.',
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?q=80&w=1000&auto=format&fit=crop',
    tags: ['Chardham', 'Jyotirlinga', 'Lord Shiva', 'High Altitude', 'Glacial River'],
    primaryHub: {
      bus: 'Sonprayag / Gaurikund Bus Stand',
      train: 'Rishikesh / Haridwar Railway Junction (215 km)',
      flight: 'Dehradun Jolly Grant (DED, 240 km) / Phata Helipad',
    }
  },
  {
    id: 'badrinath',
    name: 'Badrinath Dham',
    state: 'Uttarakhand',
    region: 'North',
    altitude: '10,279 ft',
    coordinates: { lat: 30.7433, lng: 79.4938 },
    weather: { temp: '8°C', condition: 'Alpine Breeze', icon: 'CloudSnow', humidity: '58%', rain: '8%', wind: '12 km/h' },
    bestSeason: 'May – Nov',
    description: 'Ancient Himalayan sanctum of Lord Badri on the banks of Alaknanda River between Nar and Narayana mountains.',
    image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=1000&auto=format&fit=crop',
    tags: ['Chardham', 'Lord Vishnu', 'Mana Village', 'Hot Springs', 'Alaknanda'],
    primaryHub: {
      bus: 'Badrinath Bus Stand (Near Alaknanda Bridge)',
      train: 'Rishikesh Railway Junction (295 km)',
      flight: 'Dehradun Jolly Grant Airport (315 km)',
    }
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh & Haridwar',
    state: 'Uttarakhand',
    region: 'North',
    altitude: '1,220 ft',
    coordinates: { lat: 30.0869, lng: 78.2676 },
    weather: { temp: '24°C', condition: 'Divine River Breeze', icon: 'Sun', humidity: '50%', rain: '2%', wind: '8 km/h' },
    bestSeason: 'Sep – Apr',
    description: 'Yoga Capital of the World and sacred gateway to the Himalayas, famed for Ganga Aarti and river rafting.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1000&auto=format&fit=crop',
    tags: ['Ganga Aarti', 'Yoga', 'River Rafting', 'Ashrams', 'Suspension Bridges'],
    primaryHub: {
      bus: 'Rishikesh Natraj Chowk ISBT',
      train: 'Yog Nagari Rishikesh (YNRK) / Haridwar Junction',
      flight: 'Dehradun Jolly Grant Airport (DED, 20 km)',
    }
  },
  {
    id: 'leh_ladakh',
    name: 'Leh Ladakh',
    state: 'Ladakh',
    region: 'North',
    altitude: '11,562 ft',
    coordinates: { lat: 34.1526, lng: 77.5771 },
    weather: { temp: '11°C', condition: 'Cold Desert Sun', icon: 'Sun', humidity: '30%', rain: '0%', wind: '16 km/h' },
    bestSeason: 'May – Sep',
    description: 'Enchanting moonscape of high-altitude passes, turquoise glacial lakes, and cliffside Buddhist monasteries.',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=1000&auto=format&fit=crop',
    tags: ['Pangong Lake', 'Khardung La', 'Monasteries', 'Motorcycle Expeditions'],
    primaryHub: {
      bus: 'Leh General Bus Stand',
      train: 'Jammu Tawi (700 km)',
      flight: 'Kushok Bakula Rimpochee Airport (IXL, Leh)',
    }
  },
  {
    id: 'shimla',
    name: 'Shimla & Kufri',
    state: 'Himachal Pradesh',
    region: 'North',
    altitude: '7,238 ft',
    coordinates: { lat: 31.1048, lng: 77.1734 },
    weather: { temp: '16°C', condition: 'Mild Mountain Air', icon: 'Sun', humidity: '48%', rain: '2%', wind: '9 km/h' },
    bestSeason: 'All Year',
    description: 'Historic colonial summer capital surrounded by rhododendron forests, Victorian architecture, and the Ridge.',
    image: 'https://images.unsplash.com/photo-1562674332-9c3f73c6a461?q=80&w=1000&auto=format&fit=crop',
    tags: ['Toy Train', 'Mall Road', 'The Ridge', 'Kufri Snow', 'Colonial Heritage'],
    primaryHub: {
      bus: 'Shimla ISBT Tutikandi',
      train: 'Shimla Toy Train Station / Kalka Junction',
      flight: 'Jubarhati Shimla Airport (22 km) / Chandigarh (115 km)',
    }
  },

  // --- SPIRITUAL JYOTIRLINGAS & GANGA PLAINS ---
  {
    id: 'varanasi',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    region: 'North',
    altitude: '260 ft',
    coordinates: { lat: 25.3176, lng: 82.9739 },
    weather: { temp: '26°C', condition: 'Pleasant & Spiritual', icon: 'Sun', humidity: '45%', rain: '0%', wind: '8 km/h' },
    bestSeason: 'Oct – Mar',
    description: 'The ancient spiritual heart of India where eternal Ganga ghats, sacred aartis, and Kashi Vishwanath convene.',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=1000&auto=format&fit=crop',
    tags: ['Kashi Vishwanath', 'Ganga Aarti', 'Boat Rides', 'Ancient City', 'Silk Handlooms'],
    primaryHub: {
      bus: 'Varanasi Cantt ISBT',
      train: 'Varanasi Junction (BSB) / Banaras (BSBS)',
      flight: 'Lal Bahadur Shastri Airport (VNS, Babatpur)',
    }
  },
  {
    id: 'amritsar',
    name: 'Amritsar',
    state: 'Punjab',
    region: 'North',
    altitude: '768 ft',
    coordinates: { lat: 31.6340, lng: 74.8723 },
    weather: { temp: '25°C', condition: 'Warm & Welcoming', icon: 'Sun', humidity: '42%', rain: '0%', wind: '10 km/h' },
    bestSeason: 'Oct – Mar',
    description: 'Home to the gilded Golden Temple (Harmandir Sahib), 24/7 world largest community kitchen langar, and Wagah Border.',
    image: 'https://images.unsplash.com/photo-1588083949404-c4f1ed1323b3?q=80&w=1000&auto=format&fit=crop',
    tags: ['Golden Temple', 'Langar', 'Wagah Border', 'Punjabi Kulcha', 'Heritage Walk'],
    primaryHub: {
      bus: 'Amritsar Central Bus Stand',
      train: 'Amritsar Railway Junction (ASR)',
      flight: 'Sri Guru Ram Dass Jee International Airport (ATQ)',
    }
  },
  {
    id: 'ujjain',
    name: 'Ujjain & Omkareshwar',
    state: 'Madhya Pradesh',
    region: 'Central',
    altitude: '1,614 ft',
    coordinates: { lat: 23.1765, lng: 75.7885 },
    weather: { temp: '27°C', condition: 'Sacred Sun', icon: 'Sun', humidity: '40%', rain: '0%', wind: '9 km/h' },
    bestSeason: 'Oct – Mar',
    description: 'Ancient celestial meridian city hosting Mahakaleshwar Jyotirlinga, dawn Bhasma Aarti, and sacred Shipra River.',
    image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=1000&auto=format&fit=crop',
    tags: ['Mahakaleshwar', 'Bhasma Aarti', 'Omkareshwar', 'Shipra Ghats', 'Kumbh City'],
    primaryHub: {
      bus: 'Ujjain Dewas Gate Bus Terminal',
      train: 'Ujjain Junction (UJN)',
      flight: 'Indore Devi Ahilya Bai Holkar Airport (IDR, 55 km)',
    }
  },
  {
    id: 'puri',
    name: 'Puri Jagannath & Konark',
    state: 'Odisha',
    region: 'East',
    altitude: '33 ft',
    coordinates: { lat: 19.8135, lng: 85.8312 },
    weather: { temp: '28°C', condition: 'Oceanic Breeze', icon: 'Sun', humidity: '72%', rain: '5%', wind: '18 km/h' },
    bestSeason: 'Oct – Mar',
    description: 'Eastern Chardham shrine of Lord Jagannath, oceanfront beach promenade, and 13th-century Konark Sun Temple chariot.',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1000&auto=format&fit=crop',
    tags: ['Jagannath Temple', 'Maha Prasadam', 'Konark Sun Temple', 'Golden Beach', 'Rath Yatra'],
    primaryHub: {
      bus: 'Puri Central Bus Stand (Gundicha Temple)',
      train: 'Puri Railway Terminus (PURI)',
      flight: 'Bhubaneswar Biju Patnaik Airport (BBI, 60 km)',
    }
  },

  // --- RAJASTHAN & HERITAGE FORTS ---
  {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    region: 'Northwest',
    altitude: '1,414 ft',
    coordinates: { lat: 26.9124, lng: 75.7873 },
    weather: { temp: '26°C', condition: 'Pleasant & Sunny', icon: 'Sun', humidity: '38%', rain: '0%', wind: '10 km/h' },
    bestSeason: 'Oct – Mar',
    description: 'UNESCO World Heritage Pink City, featuring hilltop Amber Fort, City Palace, Hawa Mahal, and royal bazaars.',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1000&auto=format&fit=crop',
    tags: ['Amber Fort', 'Hawa Mahal', 'City Palace', 'UNESCO Heritage', 'Handicrafts'],
    primaryHub: {
      bus: 'Jaipur Sindhi Camp Central ISBT',
      train: 'Jaipur Junction (JP)',
      flight: 'Jaipur International Airport (JAI, Sanganer)',
    }
  },
  {
    id: 'udaipur',
    name: 'Udaipur',
    state: 'Rajasthan',
    region: 'Northwest',
    altitude: '1,962 ft',
    coordinates: { lat: 24.5854, lng: 73.7125 },
    weather: { temp: '25°C', condition: 'Lakeside Serenity', icon: 'Sun', humidity: '42%', rain: '0%', wind: '8 km/h' },
    bestSeason: 'Sep – Mar',
    description: 'City of Lakes and Venice of the East, famed for Lake Pichola, opulent City Palace, and Monsoon Palace sunsets.',
    image: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?q=80&w=1000&auto=format&fit=crop',
    tags: ['Lake Pichola', 'City Palace', 'Romantic', 'Jag Mandir', 'Monsoon Palace'],
    primaryHub: {
      bus: 'Udaipur Udiapole Bus Terminal',
      train: 'Udaipur City Railway Station (UDZ)',
      flight: 'Maharana Pratap Airport (UDR, Dabok, 22 km)',
    }
  },
  {
    id: 'hampi',
    name: 'Hampi',
    state: 'Karnataka',
    region: 'South',
    altitude: '1,532 ft',
    coordinates: { lat: 15.3350, lng: 76.4600 },
    weather: { temp: '28°C', condition: 'Warm Boulder Breeze', icon: 'Sun', humidity: '44%', rain: '0%', wind: '9 km/h' },
    bestSeason: 'Oct – Mar',
    description: 'UNESCO World Heritage open-air museum of the 14th-century Vijayanagara Empire with stone chariots and ruins.',
    image: 'https://images.unsplash.com/photo-1600100397608-f010f444641e?q=80&w=1000&auto=format&fit=crop',
    tags: ['Stone Chariot', 'Virupaksha Temple', 'Vijayanagara Empire', 'Coracle Ride', 'Boulders'],
    primaryHub: {
      bus: 'Hampi Bazaar / Hospet KSRTC Central Terminal (12 km)',
      train: 'Hosapete Junction (HPT, 13 km)',
      flight: 'Hubballi Airport (HBX, 160 km) / Jindal Vijayanagar (VDY, 40 km)',
    }
  },

  // --- COASTAL & BEACH PARADISES ---
  {
    id: 'goa',
    name: 'Goa',
    state: 'Goa',
    region: 'West',
    altitude: '30 ft',
    coordinates: { lat: 15.2993, lng: 74.1240 },
    weather: { temp: '29°C', condition: 'Golden Tropical Sun', icon: 'Sun', humidity: '68%', rain: '0%', wind: '12 km/h' },
    bestSeason: 'Oct – Apr',
    description: 'Golden sand beaches, 17th-century Portuguese cathedrals, beachfront shacks, water sports, and sunset cruises.',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000&auto=format&fit=crop',
    tags: ['Beaches', 'Portuguese Forts', 'Water Sports', 'Nightlife', 'Seafood'],
    primaryHub: {
      bus: 'Panaji KADAMBA Terminal / Mapusa Bus Stand',
      train: 'Madgaon Junction (MAO) / Thivim (THVM)',
      flight: 'Manohar International Mopa (GOX) / Dabolim (GOI)',
    }
  },
  {
    id: 'gokarna',
    name: 'Gokarna',
    state: 'Karnataka',
    region: 'South',
    altitude: '20 ft',
    coordinates: { lat: 14.5479, lng: 74.3188 },
    weather: { temp: '28°C', condition: 'Oceanic Serenity', icon: 'Sun', humidity: '65%', rain: '0%', wind: '11 km/h' },
    bestSeason: 'Oct – Mar',
    description: 'Sacred coastal temple town home to Mahabaleshwar Atmalinga, paired with famous crescent beach cliff hikes.',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1000&auto=format&fit=crop',
    tags: ['Om Beach', 'Atmalinga Temple', 'Cliff Treks', 'Kudle Beach', 'Bohemian Vibe'],
    primaryHub: {
      bus: 'Gokarna KSRTC Bus Stand',
      train: 'Gokarna Road (GOK, 9 km) / Kumta (30 km)',
      flight: 'Goa Dabolim Airport (GOI, 140 km)',
    }
  },
  {
    id: 'andaman',
    name: 'Andaman & Nicobar Islands',
    state: 'Andaman and Nicobar',
    region: 'Islands',
    altitude: '15 ft',
    coordinates: { lat: 11.6234, lng: 92.7265 },
    weather: { temp: '29°C', condition: 'Tropical Turquoise Warmth', icon: 'Sun', humidity: '74%', rain: '5%', wind: '15 km/h' },
    bestSeason: 'Oct – May',
    description: 'Archipelago of pristine coral reefs, turquoise lagoons, Asia’s finest Radhanagar Beach, and historic Cellular Jail.',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1000&auto=format&fit=crop',
    tags: ['Radhanagar Beach', 'Scuba Diving', 'Havelock', 'Cellular Jail', 'Corals'],
    primaryHub: {
      bus: 'Port Blair Phoenix Bay Ferry Terminal',
      train: 'N/A (Island Territory)',
      flight: 'Veer Savarkar International Airport (IXZ, Port Blair)',
    }
  },

  // --- SOUTH INDIA HILLS & TEMPLE CIRCUITS ---
  {
    id: 'ooty',
    name: 'Ooty (Nilgiris)',
    state: 'Tamil Nadu',
    region: 'South',
    altitude: '7,350 ft',
    coordinates: { lat: 11.4102, lng: 76.6950 },
    weather: { temp: '17°C', condition: 'Misty Blue Mountain Breeze', icon: 'CloudFog', humidity: '60%', rain: '5%', wind: '9 km/h' },
    bestSeason: 'Sep – Jun',
    description: 'Queen of Hill Stations, renowned for 8,650 ft Doddabetta peak, UNESCO Nilgiri Mountain Toy Train, and tea estates.',
    image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=1000&auto=format&fit=crop',
    tags: ['Toy Train', 'Doddabetta Peak', 'Tea Gardens', 'Botanical Gardens', 'Pykara Lake'],
    primaryHub: {
      bus: 'Ooty Central Bus Stand (Near Railway Station)',
      train: 'Udhagamandalam Toy Train Station (UAM) / Coimbatore (85 km)',
      flight: 'Coimbatore International Airport (CJB, 88 km)',
    }
  },
  {
    id: 'munnar',
    name: 'Kerala (Munnar & Backwaters)',
    state: 'Kerala',
    region: 'South',
    altitude: '5,200 ft',
    coordinates: { lat: 10.0889, lng: 77.0595 },
    weather: { temp: '19°C', condition: 'Crisp Green Mist', icon: 'CloudRain', humidity: '64%', rain: '10%', wind: '8 km/h' },
    bestSeason: 'Sep – May',
    description: 'Emerald carpeted tea hills, endangered Nilgiri Tahr at Eravikulam, and tranquil Alleppey houseboat cruises.',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1000&auto=format&fit=crop',
    tags: ['Tea Plantations', 'Houseboat Cruise', 'Eravikulam', 'Alleppey Backwaters', 'Spices'],
    primaryHub: {
      bus: 'Munnar KSRTC Bus Depot',
      train: 'Aluva Railway Station (110 km) / Ernakulam Junction (130 km)',
      flight: 'Cochin International Airport (COK, 110 km)',
    }
  },
  {
    id: 'tirupati',
    name: 'Tirupati',
    state: 'Andhra Pradesh',
    region: 'South',
    altitude: '597 ft',
    coordinates: { lat: 13.6288, lng: 79.4192 },
    weather: { temp: '28°C', condition: 'Sacred Hill Climate', icon: 'Sun', humidity: '52%', rain: '0%', wind: '10 km/h' },
    bestSeason: 'Sep – Mar',
    description: 'World’s most visited pilgrimage destination on the sacred Seven Hills of Tirumala, abode of Sri Venkateswara Swamy.',
    image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=1000&auto=format&fit=crop',
    tags: ['Tirumala Balaji', 'Srivari Laddu', 'Seven Hills', 'Kapila Theertham', 'Vedic Chants'],
    primaryHub: {
      bus: 'Tirupati Central Bus Station (APSRTC CBS)',
      train: 'Tirupati Main Junction (TPTY) / Renigunta (RU)',
      flight: 'Tirupati Airport (TIR, Renigunta, 14 km)',
    }
  },
  {
    id: 'rameshwaram',
    name: 'Rameshwaram & Madurai',
    state: 'Tamil Nadu',
    region: 'South',
    altitude: '33 ft',
    coordinates: { lat: 9.2876, lng: 79.3129 },
    weather: { temp: '29°C', condition: 'Breezy Island Sun', icon: 'Sun', humidity: '68%', rain: '2%', wind: '16 km/h' },
    bestSeason: 'Oct – Apr',
    description: 'Southern Chardham and Jyotirlinga on Pamban Island with 22 holy water theerthams, Dhanushkodi Land’s End, and Meenakshi Temple.',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1000&auto=format&fit=crop',
    tags: ['Ramanathaswamy', '22 Theerthams', 'Pamban Bridge', 'Dhanushkodi Ram Setu', 'Meenakshi Temple'],
    primaryHub: {
      bus: 'Rameshwaram Municipal Bus Stand',
      train: 'Rameshwaram Terminus (RMM) / Mandapam',
      flight: 'Madurai International Airport (IXM, 175 km)',
    }
  },
  {
    id: 'coorg',
    name: 'Coorg (Kodagu)',
    state: 'Karnataka',
    region: 'South',
    altitude: '3,840 ft',
    coordinates: { lat: 12.4244, lng: 75.7382 },
    weather: { temp: '21°C', condition: 'Pleasant Coffee Mist', icon: 'CloudRain', humidity: '58%', rain: '5%', wind: '7 km/h' },
    bestSeason: 'Oct – May',
    description: 'Scotland of India, known for aromatic coffee and spice plantations, Abbey Falls, Talakaveri river origin, and Raja’s Seat.',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1000&auto=format&fit=crop',
    tags: ['Coffee Estates', 'Abbey Falls', 'Rajas Seat', 'Talakaveri', 'Dubare Elephant Camp'],
    primaryHub: {
      bus: 'Madikeri KSRTC Bus Stand',
      train: 'Mysore Junction (118 km)',
      flight: 'Kannur International (CNN, 90 km) / Mangaluru (140 km)',
    }
  }
];

export const MASTER_PLACES = [
  // --- MANALI PLACES ---
  { id: 'plc-man-adv-1', destinationId: 'manali', vibe: 'adventure', name: 'Solang Valley Adventure Arena', type: 'Paragliding, Zorbing & Quad biking', duration: '3.5 hours', cost: 1800, rating: 4.8 },
  { id: 'plc-man-adv-2', destinationId: 'manali', vibe: 'adventure', name: 'Rohtang Pass High Altitude Point (13,058 ft)', type: 'Snow ridge glacier view point', duration: '5 hours', cost: 1200, rating: 4.9 },
  { id: 'plc-man-adv-3', destinationId: 'manali', vibe: 'adventure', name: 'Jogini Waterfall Alpine Trek', type: 'Pine forest trek to 150ft glacial falls', duration: '3 hours', cost: 0, rating: 4.7 },
  { id: 'plc-man-adv-4', destinationId: 'manali', vibe: 'adventure', name: 'Beas River White Water Rafting', type: 'Grade II & III rapids through apple valleys', duration: '2 hours', cost: 950, rating: 4.6 },
  { id: 'plc-man-spi-1', destinationId: 'manali', vibe: 'spiritual', name: 'Hadimba Devi Cedar Temple (1553 AD)', type: 'Pagoda-style wooden shrine in deodar grove', duration: '1.5 hours', cost: 0, rating: 4.8 },
  { id: 'plc-man-spi-2', destinationId: 'manali', vibe: 'spiritual', name: 'Vashisht Muni Temple & Hot Sulphur Springs', type: 'Ancient Vedic rishi shrine & mineral bath', duration: '2 hours', cost: 0, rating: 4.7 },
  { id: 'plc-man-spi-3', destinationId: 'manali', vibe: 'spiritual', name: 'Manu Maharishi Temple (Old Manali)', type: 'Only Indian shrine dedicated to Sage Manu', duration: '1 hour', cost: 0, rating: 4.6 },
  { id: 'plc-man-rom-1', destinationId: 'manali', vibe: 'romantic', name: 'Old Manali Riverside Apple Orchards', type: 'Rustic wooden bridges & candlelit cafes', duration: '2.5 hours', cost: 500, rating: 4.7 },
  { id: 'plc-man-rom-2', destinationId: 'manali', vibe: 'romantic', name: 'Van Vihar Deodar Sanctuary', type: 'Hand-in-hand cedar canopy walk & boating', duration: '1.5 hours', cost: 100, rating: 4.5 },
  { id: 'plc-man-rom-3', destinationId: 'manali', vibe: 'romantic', name: 'Naggar Castle Terrace View Point', type: 'Royal mountain view balcony with tea tasting', duration: '2 hours', cost: 300, rating: 4.8 },
  { id: 'plc-man-nat-1', destinationId: 'manali', vibe: 'nature', name: 'Hampta Valley Pine Forest Trail', type: 'Alpine nature walk along turquoise streams', duration: '3 hours', cost: 0, rating: 4.8 },
  { id: 'plc-man-her-1', destinationId: 'manali', vibe: 'heritage', name: 'Naggar Medieval Castle (1460 AD)', type: 'Kat-Kuni timber & stone fortress architecture', duration: '2 hours', cost: 150, rating: 4.6 },
  { id: 'plc-man-cul-1', destinationId: 'manali', vibe: 'culinary', name: 'Traditional Himachali Dham Center', type: 'Festive copper platter feast with Sidu & ghee', duration: '1.5 hours', cost: 450, rating: 4.9 },

  // --- KEDARNATH PLACES ---
  { id: 'plc-ked-spi-1', destinationId: 'kedarnath', vibe: 'spiritual', name: 'Kedarnath Jyotirlinga Sanctum', type: 'Supreme Himalayan Shiva shrine carved of grey granite', duration: '3 hours', cost: 0, rating: 5.0 },
  { id: 'plc-ked-spi-2', destinationId: 'kedarnath', vibe: 'spiritual', name: 'Bhairavnath Mountain Ridge Temple', type: 'Sacred guardian deity shrine above the sanctum', duration: '2 hours', cost: 0, rating: 4.9 },
  { id: 'plc-ked-spi-3', destinationId: 'kedarnath', vibe: 'spiritual', name: 'Mandakini River Ghat Morning Aarti', type: 'Glacial conch shells & Vedic chanting at dawn', duration: '1.5 hours', cost: 0, rating: 4.9 },
  { id: 'plc-ked-spi-4', destinationId: 'kedarnath', vibe: 'spiritual', name: 'Triyuginarayan Temple (Akhand Dhuni)', type: 'Perpetual flame where Shiva & Parvati wed', duration: '2 hours', cost: 0, rating: 4.8 },
  { id: 'plc-ked-adv-1', destinationId: 'kedarnath', vibe: 'adventure', name: '16km Gaurikund to Kedarnath Mountain Trail', type: 'High-altitude scenic stone pathway along gorges', duration: '6 hours', cost: 0, rating: 4.9 },
  { id: 'plc-ked-adv-2', destinationId: 'kedarnath', vibe: 'adventure', name: 'Vasuki Tal Glacial Tarn (14,200 ft)', type: 'High alpine glacial lake trail with Brahma Kamal', duration: '5 hours', cost: 500, rating: 4.8 },

  // --- VARANASI PLACES ---
  { id: 'plc-var-spi-1', destinationId: 'varanasi', vibe: 'spiritual', name: 'Kashi Vishwanath Jyotirlinga Golden Temple', type: 'Gold-plated spires & grand Ganga Corridor darshan', duration: '2.5 hours', cost: 0, rating: 5.0 },
  { id: 'plc-var-spi-2', destinationId: 'varanasi', vibe: 'spiritual', name: 'Dashashwamedh Ghat Maha Ganga Aarti', type: 'Grand multi-tiered brass lamp ritual by Vedic priests', duration: '2 hours', cost: 0, rating: 5.0 },
  { id: 'plc-var-spi-3', destinationId: 'varanasi', vibe: 'spiritual', name: 'Assi Ghat Subah-e-Banaras Dawn Pujan', type: 'Sunrise Vedic chanting, morning ragas & yoga', duration: '1.5 hours', cost: 0, rating: 4.8 },
  { id: 'plc-var-spi-4', destinationId: 'varanasi', vibe: 'spiritual', name: 'Kaal Bhairav Mandir (Kotwal of Kashi)', type: 'Ancient guardian shrine with holy black thread blessing', duration: '1 hour', cost: 0, rating: 4.7 },
  { id: 'plc-var-her-1', destinationId: 'varanasi', vibe: 'heritage', name: 'Sarnath Buddhist Dhamek Stupa & Deer Park', type: 'Site of Lord Buddha’s first sermon in 528 BCE', duration: '3 hours', cost: 250, rating: 4.9 },
  { id: 'plc-var-her-2', destinationId: 'varanasi', vibe: 'heritage', name: 'Ramnagar 18th Century Sandstone Fort', type: 'Fortress palace with vintage royal carriages & armory', duration: '2 hours', cost: 150, rating: 4.5 },
  { id: 'plc-var-cul-1', destinationId: 'varanasi', vibe: 'culinary', name: 'Kachori Gali & Blue Lassi Tasting Trail', type: 'Hot hing kachori, malaiyo & saffron lassi', duration: '2 hours', cost: 350, rating: 4.9 },

  // --- GOA PLACES ---
  { id: 'plc-goa-bea-1', destinationId: 'goa', vibe: 'beaches', name: 'Palolem Beach Crescent & Butterfly Cove', type: 'Gentle turquoise waters, dolphin trips & shacks', duration: '4 hours', cost: 400, rating: 4.8 },
  { id: 'plc-goa-bea-2', destinationId: 'goa', vibe: 'beaches', name: 'Morjim & Ashwem Olive Ridley Turtle Sands', type: 'Pristine quiet northern shores with breezy cabanas', duration: '3.5 hours', cost: 0, rating: 4.7 },
  { id: 'plc-goa-bea-3', destinationId: 'goa', vibe: 'beaches', name: 'Aguada Fort Coastal Bastion (1612 AD)', type: '17th-century Portuguese fortress & lighthouse', duration: '2 hours', cost: 50, rating: 4.6 },
  { id: 'plc-goa-pty-1', destinationId: 'goa', vibe: 'party', name: 'Thalassa Clifftop Sunset Lounge & DJ Deck', type: 'Greek open-air clifftop music & sunset cocktails', duration: '4 hours', cost: 2000, rating: 4.8 },
  { id: 'plc-goa-pty-2', destinationId: 'goa', vibe: 'party', name: 'Curlies & Shiva Valley Anjuna Beachfront', type: 'Legendary barefoot trance beats & fire dancers', duration: '4 hours', cost: 1500, rating: 4.6 },
  { id: 'plc-goa-her-1', destinationId: 'goa', vibe: 'heritage', name: 'Basilica of Bom Jesus & Se Cathedral (Old Goa)', type: 'UNESCO World Heritage baroque architecture (1605)', duration: '2.5 hours', cost: 0, rating: 4.8 },
  { id: 'plc-goa-cul-1', destinationId: 'goa', vibe: 'culinary', name: 'Fisherman’s Wharf Traditional Goan Kitchen', type: 'Authentic Goan prawn balchão & bebinca dessert', duration: '1.5 hours', cost: 850, rating: 4.8 },

  // --- JAIPUR PLACES ---
  { id: 'plc-jai-her-1', destinationId: 'jaipur', vibe: 'heritage', name: 'Amber Fort & Sheesh Mahal (Mirror Palace)', type: 'Hilltop Rajput citadel with ornate carved marble', duration: '3.5 hours', cost: 500, rating: 4.9 },
  { id: 'plc-jai-her-2', destinationId: 'jaipur', vibe: 'heritage', name: 'City Palace & Chandra Mahal Royal Museum', type: 'Living royal palace with vintage textiles & weaponry', duration: '2.5 hours', cost: 300, rating: 4.8 },
  { id: 'plc-jai-her-3', destinationId: 'jaipur', vibe: 'heritage', name: 'Nahargarh Fort Sunset Clifftop Bastion', type: 'Hilltop ramparts with panoramic 360-degree city glow', duration: '2 hours', cost: 150, rating: 4.9 },
  { id: 'plc-jai-her-4', destinationId: 'jaipur', vibe: 'heritage', name: 'Hawa Mahal (Palace of 953 Windows)', type: 'Pink honeycomb facade designed for royal ladies', duration: '1.5 hours', cost: 200, rating: 4.7 },
  { id: 'plc-jai-cul-1', destinationId: 'jaipur', vibe: 'culinary', name: 'Chokhi Dhani Royal Rajasthani Thali Village', type: 'Traditional thali with Dal Baati Churma & folk dance', duration: '3 hours', cost: 950, rating: 4.8 },

  // --- UDAIPUR PLACES ---
  { id: 'plc-uda-rom-1', destinationId: 'udaipur', vibe: 'romantic', name: 'Lake Pichola Sunset Wooden Boat Cruise', type: 'Golden hour cruise past Jag Mandir & Lake Palace', duration: '1.5 hours', cost: 800, rating: 4.9 },
  { id: 'plc-uda-rom-2', destinationId: 'udaipur', vibe: 'romantic', name: 'Sajjangarh Monsoon Palace Sunset Lookout', type: 'Hilltop fairytale palace overlooking scenic lakes', duration: '2.5 hours', cost: 250, rating: 4.8 },
  { id: 'plc-uda-rom-3', destinationId: 'udaipur', vibe: 'romantic', name: 'Ambrai Ghat Candlelight Waterfront Dining', type: 'Fine dining directly opposite illuminated City Palace', duration: '2 hours', cost: 1600, rating: 4.9 },
  { id: 'plc-uda-her-1', destinationId: 'udaipur', vibe: 'heritage', name: 'Udaipur Grand City Palace Complex', type: 'Rajasthan’s largest palace with peacocks in mosaic', duration: '3 hours', cost: 400, rating: 4.9 },

  // --- OOTY PLACES ---
  { id: 'plc-oot-nat-1', destinationId: 'ooty', vibe: 'nature', name: 'Doddabetta Peak View Point (8,650 ft)', type: 'Highest Nilgiri vantage point with telescope observatory', duration: '2 hours', cost: 50, rating: 4.7 },
  { id: 'plc-oot-nat-2', destinationId: 'ooty', vibe: 'nature', name: 'Government Botanical Gardens (1848 AD)', type: '55-acre terraced lawns with fossil trees & orchids', duration: '2.5 hours', cost: 40, rating: 4.6 },
  { id: 'plc-oot-her-1', destinationId: 'ooty', vibe: 'heritage', name: 'Nilgiri Mountain UNESCO Heritage Toy Train', type: 'Historic Swiss rack-and-pinion steam railway ride', duration: '3 hours', cost: 250, rating: 4.9 },
  { id: 'plc-oot-rom-1', destinationId: 'ooty', vibe: 'romantic', name: 'Pykara Lake & Glacial Waterfalls', type: 'Speedboat cruise through pine hills & quiet falls', duration: '2.5 hours', cost: 450, rating: 4.8 },

  // --- RISHIKESH PLACES ---
  { id: 'plc-rsh-spi-1', destinationId: 'rishikesh', vibe: 'spiritual', name: 'Triveni Ghat Evening Maha Aarti', type: 'Sacred Ganga confluence with Vedic flame lamps & bells', duration: '2 hours', cost: 0, rating: 5.0 },
  { id: 'plc-rsh-spi-2', destinationId: 'rishikesh', vibe: 'spiritual', name: 'Parmarth Niketan Ashram & Yoga Sessions', type: 'Riverside meditation gardens & universal prayer', duration: '2 hours', cost: 0, rating: 4.8 },
  { id: 'plc-rsh-adv-1', destinationId: 'rishikesh', vibe: 'adventure', name: 'Shivpuri to Rishikesh 16km White Water Rafting', type: 'Thrilling Grade III+ rapids including Roller Coaster', duration: '3.5 hours', cost: 1200, rating: 4.9 },
  { id: 'plc-rsh-adv-2', destinationId: 'rishikesh', vibe: 'adventure', name: 'Neer Garh Waterfall Jungle Trek', type: 'Limestone tiered natural pools & turquoise water', duration: '2.5 hours', cost: 50, rating: 4.7 },
  { id: 'plc-rsh-her-1', destinationId: 'rishikesh', vibe: 'heritage', name: 'The Beatles Ashram (Chaurasi Kutia)', type: 'Stone meditation caves with iconic psychedelic murals', duration: '2 hours', cost: 150, rating: 4.7 },

  // --- LEH LADAKH PLACES ---
  { id: 'plc-leh-adv-1', destinationId: 'leh_ladakh', vibe: 'adventure', name: 'Khardung La Pass (17,582 ft)', type: 'World’s highest motorable pass crossing snow ridges', duration: '4 hours', cost: 0, rating: 4.9 },
  { id: 'plc-leh-nat-1', destinationId: 'leh_ladakh', vibe: 'nature', name: 'Pangong Tso Turquoise High Lake', type: '134km alpine lake shifting seven shades of blue', duration: '6 hours', cost: 0, rating: 5.0 },
  { id: 'plc-leh-spi-1', destinationId: 'leh_ladakh', vibe: 'spiritual', name: 'Thiksey 12-Story Buddhist Monastery', type: 'Grand cliffside monastery with 49ft Maitreya Buddha', duration: '2.5 hours', cost: 50, rating: 4.9 },
  { id: 'plc-leh-adv-2', destinationId: 'leh_ladakh', vibe: 'adventure', name: 'Nubra Valley Hunder Cold Desert & Double Hump Camels', type: 'White sand dunes nestled between snow summits', duration: '5 hours', cost: 500, rating: 4.8 },

  // --- AMRITSAR PLACES ---
  { id: 'plc-asr-spi-1', destinationId: 'amritsar', vibe: 'spiritual', name: 'Golden Temple (Sri Harmandir Sahib)', type: 'Sacred gilded sanctum surrounded by holy Amrit Sarovar', duration: '3.5 hours', cost: 0, rating: 5.0 },
  { id: 'plc-asr-spi-2', destinationId: 'amritsar', vibe: 'spiritual', name: 'Guru Ka Langar 24/7 Community Kitchen', type: 'World’s largest free community kitchen serving 100,000 daily', duration: '1.5 hours', cost: 0, rating: 5.0 },
  { id: 'plc-asr-her-1', destinationId: 'amritsar', vibe: 'heritage', name: 'Wagah Border Beating Retreat Ceremony', type: 'Electrifying patriotic flag lowering with marching guards', duration: '3 hours', cost: 0, rating: 4.9 },
  { id: 'plc-asr-her-2', destinationId: 'amritsar', vibe: 'heritage', name: 'Jallianwala Bagh Historic Memorial', type: 'National historic memorial park with preserved bullet marks', duration: '1.5 hours', cost: 0, rating: 4.7 },
  { id: 'plc-asr-cul-1', destinationId: 'amritsar', vibe: 'culinary', name: 'Kesar Da Dhaba Heritage Tasting (Since 1916)', type: 'Slow-cooked Dal Makhani & crispy Amritsari Kulcha with butter', duration: '1.5 hours', cost: 400, rating: 4.9 },

  // --- SHIMLA PLACES ---
  { id: 'plc-shm-her-1', destinationId: 'shimla', vibe: 'heritage', name: 'The Ridge & Christ Church (1857 AD)', type: 'Neo-Gothic church with stained glass windows & open plaza', duration: '2 hours', cost: 0, rating: 4.8 },
  { id: 'plc-shm-spi-1', destinationId: 'shimla', vibe: 'spiritual', name: 'Jakhu Hill Hanuman Temple & Sky Gondola', type: '108ft colossal deity statue at 8,054 ft highest peak', duration: '2.5 hours', cost: 500, rating: 4.7 },
  { id: 'plc-shm-adv-1', destinationId: 'shimla', vibe: 'adventure', name: 'Kufri Snow Valley Adventure Park', type: 'High-altitude horse trails, go-karting & snow skiing', duration: '4 hours', cost: 800, rating: 4.6 },

  // --- GOKARNA PLACES ---
  { id: 'plc-gok-bea-1', destinationId: 'gokarna', vibe: 'beaches', name: 'Om Beach & Half Moon Beach Cliff Trail', type: 'Naturally shaped Om symbol sandy shores & cliff hiking', duration: '4 hours', cost: 0, rating: 4.9 },
  { id: 'plc-gok-spi-1', destinationId: 'gokarna', vibe: 'spiritual', name: 'Mahabaleshwar Temple (Pranalinga)', type: 'Ancient Dravidian granite shrine holding the sacred Atmalinga', duration: '2 hours', cost: 0, rating: 4.8 },
  { id: 'plc-gok-bea-2', destinationId: 'gokarna', vibe: 'beaches', name: 'Kudle Beach Bohemian Sunset Shacks', type: 'Golden sand cove with acoustic guitar music & cafes', duration: '3 hours', cost: 200, rating: 4.7 },

  // --- ANDAMAN PLACES ---
  { id: 'plc-and-bea-1', destinationId: 'andaman', vibe: 'beaches', name: 'Radhanagar Beach (Havelock Island)', type: 'Ranked Asia’s finest white coral sand beach with turquoise surf', duration: '4 hours', cost: 0, rating: 5.0 },
  { id: 'plc-and-adv-1', destinationId: 'andaman', vibe: 'adventure', name: 'Elephant Beach Coral Reef Scuba & Snorkel', type: 'Vibrant living coral gardens, sea turtles & clownfish diving', duration: '3.5 hours', cost: 2500, rating: 4.9 },
  { id: 'plc-and-her-1', destinationId: 'andaman', vibe: 'heritage', name: 'Cellular Jail National Memorial & Light Show', type: 'Historic Kala Pani freedom struggle prison monument', duration: '2.5 hours', cost: 100, rating: 4.9 },

  // --- MUNNAR & KERALA PLACES ---
  { id: 'plc-mun-nat-1', destinationId: 'munnar', vibe: 'nature', name: 'Eravikulam National Park (Rajamalai)', type: 'Home of endangered Nilgiri Tahr goats and Neelakurinji blooms', duration: '3 hours', cost: 200, rating: 4.8 },
  { id: 'plc-mun-nat-2', destinationId: 'munnar', vibe: 'nature', name: 'Kolukkumalai World’s Highest Tea Estate (7,900 ft)', type: 'Rugged 4x4 jeep safari through organic misty tea peaks', duration: '4 hours', cost: 1800, rating: 5.0 },
  { id: 'plc-mun-rom-1', destinationId: 'munnar', vibe: 'romantic', name: 'Alleppey Luxury Houseboat Day Cruise', type: 'Private wooden kettuvallam sailing through palm backwaters', duration: '5 hours', cost: 4500, rating: 4.9 },

  // --- HAMPI PLACES ---
  { id: 'plc-hmp-her-1', destinationId: 'hampi', vibe: 'heritage', name: 'Vijaya Vittala Stone Chariot & Musical Pillars', type: 'UNESCO World Heritage monolithic stone chariot icon', duration: '3 hours', cost: 50, rating: 5.0 },
  { id: 'plc-hmp-spi-1', destinationId: 'hampi', vibe: 'spiritual', name: 'Virupaksha Temple (Since 7th Century AD)', type: 'Continuously active temple sanctum on the Tungabhadra River', duration: '2 hours', cost: 0, rating: 4.9 },
  { id: 'plc-hmp-adv-1', destinationId: 'hampi', vibe: 'adventure', name: 'Matanga Hill Sunrise Boulder Scramble', type: 'Panoramic 360-degree sunrise view over Vijayanagara ruins', duration: '2.5 hours', cost: 0, rating: 4.8 },
  { id: 'plc-hmp-adv-2', destinationId: 'hampi', vibe: 'adventure', name: 'Sanapur Lake Coracle Ride & Cliff Jumps', type: 'Traditional round woven boat cruise among granite boulders', duration: '2 hours', cost: 300, rating: 4.7 },

  // --- PURI & KONARK PLACES ---
  { id: 'plc-pur-spi-1', destinationId: 'puri', vibe: 'spiritual', name: 'Shree Jagannath Temple & Ananda Bazar', type: 'Ancient Chardham sanctum with Mahaprasad cooked in earthen pots', duration: '3 hours', cost: 0, rating: 5.0 },
  { id: 'plc-pur-her-1', destinationId: 'puri', vibe: 'heritage', name: 'Konark Sun Temple 24-Wheel Stone Chariot', type: '13th-century UNESCO architectural marvel aligned to sun rays', duration: '2.5 hours', cost: 40, rating: 4.9 },
  { id: 'plc-pur-bea-1', destinationId: 'puri', vibe: 'beaches', name: 'Puri Golden Beach (Blue Flag Certified)', type: 'Cleanest oceanfront beach promenade with golden sands', duration: '3 hours', cost: 0, rating: 4.7 },

  // --- TIRUPATI PLACES ---
  { id: 'plc-tpt-spi-1', destinationId: 'tirupati', vibe: 'spiritual', name: 'Tirumala Lord Venkateswara Temple Darshan', type: 'Sacred Ananda Nilayam vimanam covered in pure gold', duration: '4 hours', cost: 300, rating: 5.0 },
  { id: 'plc-tpt-spi-2', destinationId: 'tirupati', vibe: 'spiritual', name: 'Kapila Theertham Mountain Waterfall & Temple', type: 'Sacred Shaivite cave shrine where Saint Kapila meditated', duration: '1.5 hours', cost: 0, rating: 4.7 },
  { id: 'plc-tpt-nat-1', destinationId: 'tirupati', vibe: 'nature', name: 'Silathoranam Geological Natural Stone Arch', type: 'Rare pre-Cambrian rock formation dating back 2.5 billion years', duration: '1.5 hours', cost: 0, rating: 4.6 },

  // --- RAMESHWARAM PLACES ---
  { id: 'plc-rmm-spi-1', destinationId: 'rameshwaram', vibe: 'spiritual', name: 'Ramanathaswamy Temple (1212-Pillar Grand Corridor)', type: 'Longest temple corridor in Asia with 22 sacred wells bath', duration: '3 hours', cost: 25, rating: 5.0 },
  { id: 'plc-rmm-her-1', destinationId: 'rameshwaram', vibe: 'heritage', name: 'Dhanushkodi Ghost Town & Ram Setu Shore', type: 'Land’s End meeting point of Bay of Bengal and Indian Ocean', duration: '3.5 hours', cost: 200, rating: 4.9 },
  { id: 'plc-rmm-adv-1', destinationId: 'rameshwaram', vibe: 'adventure', name: 'Pamban Sea Bridge Overwater Train Journey', type: 'Spectacular 2km rail crossing over the azure Indian Ocean', duration: '1.5 hours', cost: 50, rating: 4.8 },

  // --- COORG PLACES ---
  { id: 'plc-crg-nat-1', destinationId: 'coorg', vibe: 'nature', name: 'Abbey Falls & Coffee Plantation Walk', type: 'Cascading white water stream amidst spice & pepper vines', duration: '2 hours', cost: 50, rating: 4.7 },
  { id: 'plc-crg-adv-1', destinationId: 'coorg', vibe: 'adventure', name: 'Dubare Elephant Camp River Crossing & Bathing', type: 'Interact, scrub & feed gentle giants along the Cauvery River', duration: '3 hours', cost: 400, rating: 4.8 },
  { id: 'plc-crg-rom-1', destinationId: 'coorg', vibe: 'romantic', name: 'Raja’s Seat Panoramic Sunset Terrace', type: 'Historic hilltop garden where Kodagu kings watched sunset mist', duration: '1.5 hours', cost: 20, rating: 4.7 }
];

export const MASTER_HOTELS = [
  { id: 'htl-1', name: 'The Himalayan Retreat & Spa', destinationId: 'manali', tier: 'Luxury VIP', pricePerNight: '₹9,500', rating: 4.9, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800', amenities: ['Heated Pool', 'Cedar Spa', 'Mountain Balcony', 'Bonfire'] },
  { id: 'htl-2', name: 'Apple Orchard Heritage Cottage', destinationId: 'manali', tier: 'Comfort', pricePerNight: '₹3,200', rating: 4.7, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800', amenities: ['Orchard Views', 'Wooden Architecture', 'Free Breakfast'] },
  { id: 'htl-3', name: 'GMVN Kedarnath Alpine Haven', destinationId: 'kedarnath', tier: 'Comfort', pricePerNight: '₹2,800', rating: 4.6, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800', amenities: ['Temple Proximity', 'Geyser Heating', 'Vegetarian Meals'] },
  { id: 'htl-4', name: 'BrijRama Palace Heritage Ghat Hotel', destinationId: 'varanasi', tier: 'Luxury VIP', pricePerNight: '₹14,500', rating: 5.0, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800', amenities: ['Private Ghat', 'Classical Sitar Evenings', 'Ayurvedic Spa'] },
  { id: 'htl-5', name: 'Taj Fort Aguada Coastal Resort', destinationId: 'goa', tier: 'Luxury VIP', pricePerNight: '₹12,000', rating: 4.9, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800', amenities: ['Sea Facing Villa', 'Infinity Pool', 'Water Sports Desk'] },
  { id: 'htl-6', name: 'Rambagh Palace (The Jewel of Jaipur)', destinationId: 'jaipur', tier: 'Luxury VIP', pricePerNight: '₹28,000', rating: 5.0, image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=800', amenities: ['Royal Suite', 'Peacock Gardens', 'Butler Service'] },
  { id: 'htl-7', name: 'Taj Lake Palace (Island of Dreams)', destinationId: 'udaipur', tier: 'Luxury VIP', pricePerNight: '₹34,000', rating: 5.0, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800', amenities: ['Island Location', 'Lake Pichola Boat Transfer', 'Jharokha Dining'] },
  { id: 'htl-8', name: 'Ananda in the Himalayas', destinationId: 'rishikesh', tier: 'Luxury VIP', pricePerNight: '₹32,000', rating: 5.0, image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=800', amenities: ['Palace Grounds', 'Vedic Wellness', 'Yoga Pavilion'] },
  { id: 'htl-9', name: 'Taj Swarna Luxury Hotel', destinationId: 'amritsar', tier: 'Luxury VIP', pricePerNight: '₹8,500', rating: 4.9, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800', amenities: ['Temple Shuttle', 'Fine Dining Punjabi Cuisine', 'Pool'] },
  { id: 'htl-10', name: 'Barefoot at Havelock Coral Eco Resort', destinationId: 'andaman', tier: 'Luxury VIP', pricePerNight: '₹16,000', rating: 4.9, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800', amenities: ['Private Beach Access', 'Thatch Villas', 'Diving Instructor Desk'] }
];

export const MASTER_TRANSPORTS = {
  busOperators: [
    { name: 'IntrCity SmartBus', fleet: 'AC BharatBenz Multi-Axle Sleeper', rating: 4.8, wifi: true, charging: true },
    { name: 'Zingbus AC Volvo', fleet: 'Scania Metrolink Multi-Axle', rating: 4.7, wifi: true, charging: true },
    { name: 'Himachal Roadways (HRTC Himsuta)', fleet: 'Volvo 9400 B11R AC Super Deluxe', rating: 4.9, emergencyAssistance: true },
    { name: 'KSRTC Airavat Club Class', fleet: 'Volvo B11R Multi-Axle', rating: 4.8, punctual: '98%' }
  ],
  trains: [
    { number: '20835', name: 'Vande Bharat Express', type: 'High Speed Semi-Bullet', pantry: true, speed: '130 km/h' },
    { number: '12001', name: 'Shatabdi Express', type: 'Executive Chair Car', pantry: true, speed: '120 km/h' },
    { number: '12301', name: 'Rajdhani Superfast Express', type: 'AC 1st / 2nd / 3rd Tier Sleeper', pantry: true, speed: '130 km/h' }
  ],
  airlines: [
    { code: '6E', name: 'IndiGo Airlines', fleet: 'Airbus A321neo', punctuality: '91%' },
    { code: 'AI', name: 'Air India', fleet: 'Boeing 787 Dreamliner & A320neo', fullService: true },
    { code: 'SG', name: 'SpiceJet', fleet: 'Boeing 737 MAX', budget: true }
  ]
};
