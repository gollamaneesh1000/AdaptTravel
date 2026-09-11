/**
 * Vibe & Travel Mode Aware Itinerary Generator
 * Generates highly relevant places, activities, transit, and atmosphere
 * matching the user's typed destination, chosen travel mode (bus/train/flight/etc.),
 * and requested travel vibe/style.
 */

import { mockDestinations } from '../data/mockDestinations.js';

// Comprehensive database of destinations with vibe-specific places & attractions
export const DESTINATION_PLACES_DB = {
  manali: {
    name: 'Manali',
    state: 'Himachal Pradesh',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1000&auto=format&fit=crop',
    altitude: '6,726 ft',
    weather: { temp: '14°C', condition: 'Crisp Pine Breeze', icon: 'CloudSnow', humidity: '52%', rain: '5%', wind: '10 km/h' },
    vibes: {
      adventure: [
        { name: 'Solang Valley Adventure Arena', type: 'Paragliding, Zorbing & ATV Quad rides with snow peaks' },
        { name: 'Rohtang Pass High Altitude Point', type: '13,058 ft Snow ridge excursion with panoramic glacier views' },
        { name: 'Jogini Waterfall Alpine Trek', type: 'Pine forest trek to majestic 150ft cascading glacial falls' },
        { name: 'Beas River White Water Rafting', type: 'Grade II & III thrilling river rapids through apple valleys' },
      ],
      spiritual: [
        { name: 'Hadimba Devi Ancient Cedar Temple', type: '1553 AD pagoda-style wooden shrine nestled in giant deodar forest' },
        { name: 'Vashisht Muni Temple & Natural Sulphur Springs', type: 'Sacred hot mineral bath & ancient Vedic rishi sanctum' },
        { name: 'Manu Maharishi Temple (Old Manali)', type: 'Only Indian temple dedicated to Sage Manu, the progenitor of humanity' },
        { name: 'Himalayan Nyingmapa Buddhist Gompa', type: 'Serene monastery with 2-storey golden Shakyamuni Buddha & prayer wheels' },
      ],
      romantic: [
        { name: 'Old Manali Riverside Apple Orchards', type: 'Charming wooden bridge walks, river murmurs & bohemian candlelit bistros' },
        { name: 'Van Vihar Deodar Sanctuary', type: 'Hand-in-hand nature strolls beneath towering 100-yr cedar canopies' },
        { name: 'Gulaba Wildflower Meadow Lookout', type: 'Scenic picnic meadow framed by panoramic Pir Panjal Himalayan peaks' },
        { name: 'Naggar Castle Terrace Panorama', type: 'Historic wooden royal balcony with private mountain view tea tasting' },
      ],
      nature: [
        { name: 'Hampta Valley Pine Eco-Walk', type: 'Gentle nature walking trail surrounded by silver birch & glacial streams' },
        { name: 'Nehru Kund Natural Mountain Spring', type: 'Cold spring emerging from Bhrigu Lake surrounded by alpine flora' },
        { name: 'Jana Waterfall Heritage Nature Hamlet', type: 'Hidden waterfall with traditional Himachali cedar wood cottages' },
        { name: 'Kullu Apple & Plum Valley View Point', type: 'Vast terraced fruit orchards overlooking turquoise Beas river' },
      ],
      heritage: [
        { name: 'Naggar Castle (1460 AD)', type: 'Medieval Himalayan fortress combining wood and stone earthquake-resistant architecture' },
        { name: 'Nicholas Roerich Himalayan Art Gallery', type: 'Preserved estate of the famed Russian philosopher & painter' },
        { name: 'Old Manali Traditional Mud & Slate Houses', type: 'Century-old Kat-Kuni architectural heritage walking trail' },
      ],
      culinary: [
        { name: 'Old Manali Wood-Fired Cafes', type: 'Wood-fired sourdough pizzas, fresh apple cider & artisan trout' },
        { name: 'Traditional Himachali Dham Center', type: 'Festive copper platter feast of Madra, Khatta, Babru and Sidu with ghee' },
        { name: 'Mall Road Tibetan Steamed Delicacies', type: 'Handcrafted Thukpa, butter tea, and piping hot Tingmo buns' },
      ],
    },
  },

  kedarnath: {
    name: 'Kedarnath Dham',
    state: 'Uttarakhand',
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?q=80&w=1000&auto=format&fit=crop',
    altitude: '11,755 ft',
    weather: { temp: '6°C', condition: 'Sacred Himalayan Chill', icon: 'CloudSnow', humidity: '55%', rain: '10%', wind: '14 km/h' },
    vibes: {
      spiritual: [
        { name: 'Kedarnath Jyotirlinga Sanctum', type: 'Supreme Shiva shrine carved of giant grey stone slabs beneath Kedarnath Peak' },
        { name: 'Bhairavnath Temple Mountain Ridge', type: 'Sacred guardian shrine perched on high ridge overlooking the sanctum' },
        { name: 'Mandakini River Ghat Morning Aarti', type: 'Rhythmic conch shells and sacred chants by glacial river waters' },
        { name: 'Gaurikund Holy Thermal Springs', type: 'Sacred bathing kund dedicated to Goddess Gauri with purifying waters' },
        { name: 'Triyuginarayan Temple', type: 'Akhand Dhuni perpetual flame where Lord Shiva and Parvati wed' },
      ],
      adventure: [
        { name: '16km Gaurikund to Kedarnath Trail', type: 'Challenging high-altitude stone pathway along roaring Mandakini gorges' },
        { name: 'Vasuki Tal Glacial Lake Alpine Trek', type: '14,200 ft high altitude alpine tarn surrounded by Brahma Kamal flowers' },
        { name: 'Chorabari Glacial Tarn (Gandhi Sarovar)', type: 'Rugged moraine trail leading to crystal glacial mirror reflecting peaks' },
      ],
      nature: [
        { name: 'Mandakini Valley Glacial Lookout', type: 'Sweeping vistas of snow-blanketed 22,000 ft Kedarnath dome' },
        { name: 'Rudraprayag Sangam Confluence Point', type: 'Turbulent sacred confluence of Mandakini and Alaknanda rivers' },
      ],
    },
  },

  varanasi: {
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=1000&auto=format&fit=crop',
    altitude: '260 ft',
    weather: { temp: '26°C', condition: 'Pleasant & Spiritual', icon: 'Sun', humidity: '45%', rain: '0%', wind: '8 km/h' },
    vibes: {
      spiritual: [
        { name: 'Kashi Vishwanath Jyotirlinga Golden Temple', type: 'Primary Shiva Jyotirlinga with gold spires & grand corridor to Ganga' },
        { name: 'Dashashwamedh Ghat Maha Ganga Aarti', type: 'Mesmerizing multi-tiered brass lamp ritual performed by Vedic priests' },
        { name: 'Assi Ghat Subah-e-Banaras Dawn Pujan', type: 'Spiritual sunrise Vedic chanting, classical ragas & morning yoga' },
        { name: 'Kaal Bhairav Mandir (Kotwal of Kashi)', type: 'Ancient fierce guardian shrine with sacred black thread blessings' },
        { name: 'Sankat Mochan Hanuman Temple', type: 'Historic spiritual sanctuary founded by Saint Tulsidas' },
      ],
      heritage: [
        { name: 'Ramnagar 18th Century Fort & Palace', type: 'Cream sandstone royal fortress on eastern Ganga bank with vintage armory' },
        { name: 'Sarnath Buddhist Stupa & Deer Park', type: 'Dhamek Stupa where Lord Buddha delivered his first sermon in 528 BCE' },
        { name: 'Ancient Banarasi Silk Weaving Quarters', type: 'Generations-old handloom workshops creating gold zari bridal sarees' },
      ],
      romantic: [
        { name: 'Private Wooden Bajra Sunrise Boat Cruise', type: 'Glide past 84 ancient stone ghats reflecting golden morning light' },
        { name: 'Rooftop Candlelight Dinner on Ghats', type: 'Overlooking illuminated evening river floats & brass temple bells' },
      ],
      culinary: [
        { name: 'Kachori Gali Morning Tasting', type: 'Piping hot heeng kachoris with spicy potato curry & jalebis' },
        { name: 'Blue Lassi Heritage Corner', type: 'Hand-churned clay-pot lassi topped with saffron malai & pomegranate' },
        { name: 'Banarasi Paan & Thandai Walk', type: 'Maghai paan and chilled saffron-pistachio kesar thandai' },
      ],
    },
  },

  goa: {
    name: 'Goa',
    state: 'Goa',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000&auto=format&fit=crop',
    altitude: 'Sea Level',
    weather: { temp: '30°C', condition: 'Sunny Coastal Breeze', icon: 'Sun', humidity: '65%', rain: '0%', wind: '14 km/h' },
    vibes: {
      beaches: [
        { name: 'Palolem Beach Crescent & Butterfly Cove', type: 'Gentle turquoise waters, colorful beach coco-huts & kayaking' },
        { name: 'Vagator & Chapora Red Sea Cliffs', type: 'Dramatic laterite cliff vistas overlooking sweeping golden sands' },
        { name: 'Morjim & Ashwem Serene Sands', type: 'Uncrowded peaceful coastline frequented by Olive Ridley sea turtles' },
        { name: 'Calangute & Baga Beachfront Watersports', type: 'Vibrant parasailing, jet-skiing, and lively coastal shacks' },
      ],
      adventure: [
        { name: 'Grande Island Scuba Diving & Snorkeling', type: 'Coral reef diving with tropical fish, shipwrecks & dolphins' },
        { name: 'Dudhsagar Four-Tiered Mountain Waterfall Trek', type: '1000-ft milky cascades through dense Bhagwan Mahavir sanctuary' },
        { name: 'Mandovi River Mangrove Kayaking', type: 'Paddle through serene backwater channels with otters & kingfishers' },
      ],
      party: [
        { name: 'Thalassa Sunset Lounge & Hilltop', type: 'Open-air clifftop music, sunset cocktails & Greek coastal ambiance' },
        { name: 'Tito’s & Mambo’s Nightlife Strip', type: 'Iconic world-class sound systems, live DJs & electrifying dancefloors' },
        { name: 'Sunset Luxury Catamaran Party Cruise', type: 'Sailing with live acoustic artists, tropical cocktails & dancing' },
      ],
      heritage: [
        { name: 'Basilica of Bom Jesus (UNESCO)', type: '1605 AD baroque masterpiece holding relics of St. Francis Xavier' },
        { name: 'Fort Aguada & 1864 Portuguese Lighthouse', type: '17th-century coastal fortress safeguarding Arabian sea mouth' },
        { name: 'Fontainhas Heritage Latin Quarter Walk', type: 'Vibrant yellow, blue, and terracotta Portuguese colonial villas' },
      ],
      romantic: [
        { name: 'Candlelight Sea-Facing Shack Dinner', type: 'Private lantern-lit table on sand with ocean sound & grilled catch' },
        { name: 'Secluded Butterfly Beach Sunset Cruise', type: 'Hidden cove reachable only by wooden boat for golden hour toasts' },
      ],
      culinary: [
        { name: 'Fisherman’s Wharf Traditional Goan Seafood', type: 'Prawn balchão, Kingfish rava fry, and coconut fish curry' },
        { name: 'Ponda Organic Spice Plantation Lunch', type: 'Farm tour followed by traditional banana-leaf buffet & cashew feni' },
      ],
    },
  },

  jaipur: {
    name: 'Jaipur',
    state: 'Rajasthan',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1000&auto=format&fit=crop',
    altitude: '1,417 ft',
    weather: { temp: '28°C', condition: 'Warm & Royal Sun', icon: 'Sun', humidity: '35%', rain: '0%', wind: '10 km/h' },
    vibes: {
      heritage: [
        { name: 'Amber Fort & Sheesh Mahal (Mirror Palace)', type: 'Majestic hilltop sandstone citadel with thousands of Belgian convex mirrors' },
        { name: 'Hawa Mahal (Palace of Winds)', type: 'Pink honeycomb facade with 953 jharokhas built for royal ladies' },
        { name: 'City Palace & Chandra Mahal Museum', type: 'Living royal residence with ceremonial peacock courtyards & royal textiles' },
        { name: 'Jantar Mantar UNESCO Astronomical Observatory', type: 'Largest stone sundial in the world accurate to within two seconds' },
        { name: 'Nahargarh Fort Clifftop Bastion', type: 'Defensive ridge fortress with panoramic sunset lookout over Pink City' },
      ],
      romantic: [
        { name: 'Nahargarh Padao Sunset Terrace', type: 'Cocktails and fine dining overlooking sea of sparkling city lights' },
        { name: 'Jal Mahal Water Palace Promenade', type: 'Illuminated floating palace reflecting across Man Sagar Lake' },
        { name: 'Royal Heritage Haveli Private High Tea', type: 'Sip saffron tea amidst marble fountains and peacocks' },
      ],
      culinary: [
        { name: 'Chokhi Dhani Ethnic Rajasthani Village', type: 'Immersion with folk dancers, camel rides, and 30-dish royal thali' },
        { name: 'LMB (Laxmi Mishthan Bhandar) Johari Bazaar', type: 'Century-old sweetshop famous for Paneer Ghewar & Rajasthani dal baati' },
        { name: 'Rawat Mishthan Pyaaz Kachori', type: 'Legendary crispy onion kachoris served with tangy tamarind chutney' },
      ],
      adventure: [
        { name: 'Amber Sunrise Hot Air Balloon Flight', type: 'Drift gently over Aravalli hills, forts, and rustic villages' },
        { name: 'Nahargarh Aravalli Mountain Cycling Trail', type: 'Morning pedal through winding fortress ramparts and scrub forests' },
      ],
      spiritual: [
        { name: 'Govind Dev Ji Temple', type: 'Historic Radha-Krishna temple located inside City Palace with 7 daily aartis' },
        { name: 'Galtaji (Monkey Temple) Kunds', type: 'Natural mountain springs and pink pavilion shrines nestled in rocky cleft' },
      ],
    },
  },

  udaipur: {
    name: 'Udaipur',
    state: 'Rajasthan',
    image: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?q=80&w=1000&auto=format&fit=crop',
    altitude: '1,962 ft',
    weather: { temp: '27°C', condition: 'Gentle Lake Breeze', icon: 'Sun', humidity: '42%', rain: '0%', wind: '9 km/h' },
    vibes: {
      romantic: [
        { name: 'Lake Pichola Sunset Boat Cruise', type: 'Private wooden royal boat gliding past Taj Lake Palace & Jag Mandir' },
        { name: 'Ambrai Ghat Candlelight Dining', type: 'Waterfront fine dining with unobstructed views of glowing City Palace' },
        { name: 'Sajjangarh Monsoon Palace Sunset Lookout', type: 'High fortress top offering 360-degree sunset over Aravalli lakes' },
      ],
      heritage: [
        { name: 'City Palace Complex & Crystal Gallery', type: 'Rajasthan’s largest palace complex spanning 400 years of Mewar rule' },
        { name: 'Bagore Ki Haveli Evening Folk Performance', type: 'Dharohar dance show with fire-balancing & puppet storytelling on the lake' },
        { name: 'Saheliyon-ki-Bari (Courtyard of Maidens)', type: 'Lush gardens with marble elephants, lotus pools, and gravity fountains' },
      ],
      nature: [
        { name: 'Fateh Sagar Lake & Nehru Park', type: 'Island park set inside pristine lake accessed via scenic motorboat' },
        { name: 'Badi Lake (Bahubali Peak) Sunrise Hike', type: 'Panoramic viewpoint overlooking tranquil emerald green reservoir' },
      ],
      culinary: [
        { name: 'Traditional Mewari Dal Baati Dining', type: 'Authentic stone-ground wheat baatis with ghee, gatte ki sabzi & churma' },
      ],
    },
  },

  rishikesh: {
    name: 'Rishikesh',
    state: 'Uttarakhand',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1000&auto=format&fit=crop',
    altitude: '1,220 ft',
    weather: { temp: '22°C', condition: 'Pleasant Himalayan Air', icon: 'Sun', humidity: '50%', rain: '0%', wind: '8 km/h' },
    vibes: {
      adventure: [
        { name: 'Shivpuri to Rishikesh Ganges White Water Rafting', type: '16km Grade III/IV roller-coaster rapids on roaring emerald river' },
        { name: 'Jumpin Heights Mohan Chatti Bungee Jump', type: 'India’s highest 83-meter fixed platform bungee & giant canyon swing' },
        { name: 'Neer Garh Natural Waterfall Trek', type: 'Tiered turquoise spring pools hidden deep in Himalayan jungle canopy' },
        { name: 'Flying Fox Zipline across the Ganges', type: 'Soar 140 meters above river rapids at 140 km/h with panoramic views' },
      ],
      spiritual: [
        { name: 'Parmarth Niketan Evening Ganga Aarti', type: 'Divine chanting and prayer with hundreds of floating floral lamps' },
        { name: 'Triveni Ghat Maha Aarti & Holy Dip', type: 'Sacred tri-river confluence with grand bells and Vedic fire priests' },
        { name: 'The Beatles Ashram (Chaurasi Kutia)', type: 'Meditation caves where the Fab Four composed the White Album in 1968' },
        { name: 'Vashishta Guha Riverbank Cave', type: 'Deep rock cave used by Sage Vashishta for intense silent tapasya' },
      ],
      romantic: [
        { name: 'Riverside Luxury Glamping in Shivpuri', type: 'Swiss tents right on white sand beaches with bonfire & starry skies' },
        { name: 'Kunjapuri Temple Himalayan Sunrise View', type: 'Witness snow-clad Chaukhamba and Swargarohini peaks blush pink at dawn' },
      ],
      nature: [
        { name: 'Rajaji National Park Foothills Trail', type: 'Wild elephant tracking and birdwatching along pristine sub-Himalayan belt' },
      ],
    },
  },

  ooty: {
    name: 'Ooty',
    state: 'Tamil Nadu',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1000&auto=format&fit=crop',
    altitude: '7,350 ft',
    weather: { temp: '16°C', condition: 'Cool Misty Hills', icon: 'CloudSun', humidity: '60%', rain: '10%', wind: '12 km/h' },
    vibes: {
      nature: [
        { name: 'Doddabetta Peak View Point (8,650 ft)', type: 'Highest viewpoint in the Nilgiris with telescopic view over Western Ghats' },
        { name: 'Pykara Waterfalls & Emerald Lake Boating', type: 'Pristine mountain reservoir surrounded by Toda tribal lands & pines' },
        { name: 'Government Botanical Gardens (1848)', type: '55 acres of terraced lawns with fossil trees and 1,000 exotic plant species' },
        { name: 'Avalanche Lake Unspoiled Forest Reserve', type: 'Trout fishing and cloud-kissed grasslands deep in Nilgiri sanctuary' },
      ],
      heritage: [
        { name: 'Nilgiri Mountain UNESCO Toy Train', type: 'Historic steam rack-and-pinion train chugging through 208 curves & tunnels' },
        { name: 'Stone House (1822)', type: 'First colonial bungalow built by John Sullivan marking birth of hill station' },
      ],
      romantic: [
        { name: 'Pine Forest Stroll & Valley Lookout', type: 'Cinematic pine groves filtering misty afternoon sun rays' },
        { name: 'Tea Factory & Chocolate Tasting Lounge', type: 'Fresh Nilgiri Earl Grey and handmade dark rum chocolates' },
      ],
    },
  },

  amritsar: {
    name: 'Amritsar',
    state: 'Punjab',
    image: 'https://images.unsplash.com/photo-1588096344356-9b497c234a9f?q=80&w=1000&auto=format&fit=crop',
    altitude: '755 ft',
    weather: { temp: '25°C', condition: 'Warm & Auspicious', icon: 'Sun', humidity: '48%', rain: '0%', wind: '8 km/h' },
    vibes: {
      spiritual: [
        { name: 'Golden Temple (Sri Harmandir Sahib)', type: 'Gilded sanctum floating on the Amrit Sarovar with 24/7 Gurbani kirtan' },
        { name: 'Guru Ka Langar Seva Experience', type: 'World’s largest community kitchen serving free hot meals to 100,000+ daily' },
        { name: 'Akal Takht & Night Palki Sahib Ceremony', type: 'Sacred procession carrying the Guru Granth Sahib to its night rest' },
      ],
      heritage: [
        { name: 'Wagah Border Beating Retreat Ceremony', type: 'Electrifying martial precision drills and flag-lowering at international border' },
        { name: 'Jallianwala Bagh Historic Memorial', type: 'National monument with preserved bullet marks and the historic Martyrs’ Well' },
        { name: 'Gobindgarh 18th Century Sikh Citadel', type: 'Fortress built by Maharaja Ranjit Singh with 7D Maharaja history show' },
      ],
      culinary: [
        { name: 'Kesar Da Dhaba (Since 1916)', type: 'Legendary 24-hour slow-cooked Dal Makhani with flaky Laccha Parathas' },
        { name: 'Kulcha Land & Pehalwan Jalebis', type: 'Crispy tandoori Amritsari kulchas stuffed with spiced potatoes & chole' },
        { name: 'Ahuja Milk Center Famous Lassi', type: 'Thick, creamy malai-topped sweet lassi served in traditional kulhads' },
      ],
    },
  },

  ladakh: {
    name: 'Leh Ladakh',
    state: 'Ladakh',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=1000&auto=format&fit=crop',
    altitude: '11,500 ft',
    weather: { temp: '8°C', condition: 'High Desert Sunlight', icon: 'Sun', humidity: '20%', rain: '0%', wind: '18 km/h' },
    vibes: {
      adventure: [
        { name: 'Khardung La Mountain Pass (17,982 ft)', type: 'One of the highest motorable roads on planet earth with glacier vistas' },
        { name: 'Pangong Tso High-Altitude Salt Lake', type: '134km turquoise lake changing shades from azure to indigo against mountains' },
        { name: 'Nubra Valley & Hunder Cold Sand Dunes', type: 'Ride double-humped Bactrian camels amidst snowy mountain deserts' },
        { name: 'Magnetic Hill Anti-Gravity Phenomenon', type: 'Vehicle appears to roll uphill against gravity on Leh-Kargil highway' },
      ],
      spiritual: [
        { name: 'Thiksey 12-Storey Monastery', type: 'Mini-Potala palace housing 49-foot statue of Maitreya Future Buddha' },
        { name: 'Hemis Monastery & Naropa Museum', type: 'Largest and wealthiest Buddhist gompa hidden in picturesque gorge' },
        { name: 'Shanti Stupa White Dome Lookout', type: 'Peace pagoda consecrated by 14th Dalai Lama overlooking Leh valley' },
      ],
    },
  },
};

/**
 * Normalizes user input and matches with DB or creates custom tailored places
 */
export function getTailoredPlacesForDestination(destInput, vibeInput) {
  const cleanDest = (destInput || 'Goa').toLowerCase().trim();
  const cleanVibe = (vibeInput || 'nature').toLowerCase();

  // Find destination key
  let matchedKey = Object.keys(DESTINATION_PLACES_DB).find((key) => cleanDest.includes(key));

  // If no exact key, check mockDestinations
  let baseInfo = null;
  if (matchedKey) {
    baseInfo = DESTINATION_PLACES_DB[matchedKey];
  } else {
    const meta = mockDestinations.find((d) => d.name.toLowerCase().includes(cleanDest));
    if (meta) {
      baseInfo = {
        name: meta.name,
        state: meta.state,
        image: meta.image,
        altitude: 'Scenic Elevation',
        weather: meta.weather,
        vibes: {},
      };
    } else {
      // Dynamic fallback for any typed Indian place
      const titleCaseDest = destInput
        ? destInput.charAt(0).toUpperCase() + destInput.slice(1).trim()
        : 'Incredible India';
      baseInfo = {
        name: titleCaseDest,
        state: 'India',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop',
        altitude: 'Vibrant Elevation',
        weather: { temp: '24°C', condition: 'Sunny & Pleasant', icon: 'Sun', humidity: '45%', rain: '0%', wind: '9 km/h' },
        vibes: {},
      };
    }
  }

  // Determine normalized vibe category
  let vibeCat = 'nature';
  if (cleanVibe.includes('spirit') || cleanVibe.includes('temple') || cleanVibe.includes('darshan') || cleanVibe.includes('chardham') || cleanVibe.includes('jyotirlinga')) {
    vibeCat = 'spiritual';
  } else if (cleanVibe.includes('advent') || cleanVibe.includes('trek') || cleanVibe.includes('rafting') || cleanVibe.includes('mountain pass')) {
    vibeCat = 'adventure';
  } else if (cleanVibe.includes('romant') || cleanVibe.includes('honeymoon') || cleanVibe.includes('couple')) {
    vibeCat = 'romantic';
  } else if (cleanVibe.includes('herit') || cleanVibe.includes('fort') || cleanVibe.includes('palace') || cleanVibe.includes('unesco') || cleanVibe.includes('history')) {
    vibeCat = 'heritage';
  } else if (cleanVibe.includes('beach') || cleanVibe.includes('coast') || cleanVibe.includes('island')) {
    vibeCat = 'beaches';
  } else if (cleanVibe.includes('party') || cleanVibe.includes('nightlife') || cleanVibe.includes('club')) {
    vibeCat = 'party';
  } else if (cleanVibe.includes('food') || cleanVibe.includes('culinary') || cleanVibe.includes('thali') || cleanVibe.includes('cuisine')) {
    vibeCat = 'culinary';
  }

  // Get places for this vibe or synthesize tailored places
  let places = [];
  if (baseInfo.vibes && baseInfo.vibes[vibeCat] && baseInfo.vibes[vibeCat].length > 0) {
    places = baseInfo.vibes[vibeCat];
  } else {
    // Check other vibes or synthesize dynamically
    const allAvailable = Object.values(baseInfo.vibes || {}).flat();
    if (allAvailable.length > 0) {
      places = allAvailable;
    } else {
      // Synthesize based on vibe and destination name
      if (vibeCat === 'spiritual') {
        places = [
          { name: `${baseInfo.name} Sacred Sanctum & Main Temple`, type: 'Ancient sanctum with morning puja, holy bells & divine darshan' },
          { name: `${baseInfo.name} Riverside / Kund Ghat Aarti`, type: 'Evening conch and brass oil lamp prayer ceremony by holy waters' },
          { name: `${baseInfo.name} Spiritual Parikrama Heritage Trail`, type: 'Sacred circumambulation path passing time-honored ashrams' },
          { name: `${baseInfo.name} Meditation Hilltop Ashram`, type: 'Quiet spiritual sanctuary offering Vedic chants & prasad distribution' },
        ];
      } else if (vibeCat === 'adventure') {
        places = [
          { name: `${baseInfo.name} Ridge Summit Trail`, type: 'Challenging high-altitude guided ridge trek with panoramic views' },
          { name: `${baseInfo.name} Valley Rapids & Outdoor Camp`, type: 'Adventure base with river sports, rock bouldering & zipline' },
          { name: `${baseInfo.name} Sunrise Peak Expedition`, type: 'Early dawn hike to highest local cliff edge over the clouds' },
          { name: `${baseInfo.name} Wilderness Camp & Stargazing`, type: 'Eco-camp under night stars with mountain bonfire & debrief' },
        ];
      } else if (vibeCat === 'romantic') {
        places = [
          { name: `${baseInfo.name} Panorama Sunset Point`, type: 'Secluded hilltop lookout with golden hour views & couple photo walk' },
          { name: `${baseInfo.name} Private Lakeside / Valley Promenade`, type: 'Quiet scenic trail along tranquil waters with private wooden boat ride' },
          { name: `${baseInfo.name} Heritage Candlelight Courtyard`, type: 'Romantic open-air terrace dining beneath starlit sky with acoustic music' },
          { name: `${baseInfo.name} Boutique Spa & Herbal Retreat`, type: 'Rejuvenating couple Ayurvedic massage with local floral oils' },
        ];
      } else if (vibeCat === 'heritage') {
        places = [
          { name: `${baseInfo.name} Royal Fort & Citadel Complex`, type: 'Monumental stone fortress walls with guided architectural history walk' },
          { name: `${baseInfo.name} Historic Palace & Royal Museum`, type: 'Royal armory, antique royal textiles, and gilded ceremonial chambers' },
          { name: `${baseInfo.name} Artisan Old City Bazaars`, type: 'Heritage lanes with traditional metalcraft, handloom & spice merchants' },
          { name: `${baseInfo.name} Evening Light & Sound Spectacle`, type: 'Historic son-et-lumière show illuminating medieval bastion walls' },
        ];
      } else if (vibeCat === 'beaches') {
        places = [
          { name: `${baseInfo.name} Golden Sand Main Bay`, type: 'Gentle ocean waves, parasailing, and vibrant beachfront cafes' },
          { name: `${baseInfo.name} Secluded Cove & Sea Cliffs`, type: 'Hidden red rock cliff path leading to pristine quiet waters' },
          { name: `${baseInfo.name} Sunset Coastal Fort Lookout`, type: 'Historic sea bastion overlooking panoramic 180-degree ocean horizon' },
          { name: `${baseInfo.name} Fisherman’s Wharf & Shacks`, type: 'Fresh local coastal curry, grilled catch & fresh tender coconut' },
        ];
      } else if (vibeCat === 'party') {
        places = [
          { name: `${baseInfo.name} Sunset Beach Club & Lounge`, type: 'Open-air clifftop music, sunset signature cocktails & live percussion' },
          { name: `${baseInfo.name} Night Market & Live Music Hub`, type: 'Festive stalls, indie acoustic bands & international street food' },
          { name: `${baseInfo.name} Waterfront Cruise & DJ Party`, type: 'Night cruise with illuminated decks, DJ beats & dancing' },
        ];
      } else if (vibeCat === 'culinary') {
        places = [
          { name: `${baseInfo.name} Historic Street Food Lane`, type: 'Century-old morning tasting trail for regional breakfast delicacies' },
          { name: `${baseInfo.name} Organic Spice & Tea Garden`, type: 'Guided sensory plantation walk followed by masterchef curry demo' },
          { name: `${baseInfo.name} Grand Royal Dining Hall`, type: 'Authentic 24-dish regional thali served on traditional brass platters' },
          { name: `${baseInfo.name} Famous Old Sweetshop & Chai Stall`, type: 'Heritage dessert makers crafting artisanal sweets & saffron chai' },
        ];
      } else {
        places = [
          { name: `${baseInfo.name} Valley Vista Lookout`, type: 'Panoramic viewpoint taking in green hills and fresh mountain breeze' },
          { name: `${baseInfo.name} Pine & Flora Nature Trail`, type: 'Guided walking path through indigenous botanical flora & streams' },
          { name: `${baseInfo.name} Tranquil Lake Boating Point`, type: 'Peaceful pedal and wooden boat rides amidst calm waters' },
          { name: `${baseInfo.name} Sunset Ridge Cafe`, type: 'Terrace garden with hot coffee and sweeping dusk vistas' },
        ];
      }
    }
  }

  return {
    destinationName: baseInfo.name,
    state: baseInfo.state,
    image: baseInfo.image,
    weather: baseInfo.weather,
    vibeCategory: vibeCat,
    places,
  };
}

/**
 * Builds a dynamic, comprehensive trip itinerary tailored to:
 * - Typed Destination
 * - Travel Mode (Bus, Train, Flight, Car, Bike)
 * - Travel Vibe / Style
 * - Date Range / Duration
 */
export function generateVibeSpecificTrip(params) {
  const destInput = params.destination || 'Kedarnath Dham';
  const fromLocation = params.from || params.fromLocation || 'Delhi (DEL)';
  const travelMode = params.travelMode || params.transportation || 'Bus (AC Volvo Sleeper)';
  const travelStyle = params.travelStyle || 'Spiritual & Temple Pilgrimage (Chardham / Jyotirlingas)';
  const budgetTier = params.budget || params.budgetTier || 'Comfort (₹35,000 / $420)';
  const travelers = params.travelers || { adults: 2, children: 0, infants: 0 };

  // Calculate duration
  let duration = 4;
  if (params.duration) {
    duration = Number(params.duration) || 4;
  } else if (params.departureDate && params.returnDate) {
    const diffTime = Math.abs(new Date(params.returnDate) - new Date(params.departureDate));
    duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (isNaN(duration) || duration < 2) duration = 4;
  }
  duration = Math.min(Math.max(duration, 3), 7);

  const { destinationName, state, image, weather, vibeCategory, places } =
    getTailoredPlacesForDestination(destInput, travelStyle);

  // Normalize travel mode details
  const modeLower = (travelMode || '').toLowerCase();
  let modeName = 'Bus';
  let transitType = 'AC Volvo Multi-Axle Sleeper Bus';
  let arrivalHub = `${destinationName} Central ISBT / Bus Terminal`;
  let transportSummary = `Overnight AC Volvo Sleeper Bus (${fromLocation} ➔ ${destinationName}) + Local Fleet`;
  let transportCost = 3200;

  if (modeLower.includes('train') || modeLower.includes('rail') || modeLower.includes('vande')) {
    modeName = 'Train';
    transitType = 'Vande Bharat Express (Train 20835)';
    arrivalHub = `${destinationName} Railway Junction (PF 1/2)`;
    transportSummary = `Vande Bharat Express Train (${fromLocation} ➔ ${destinationName}) + Station AC Transfers`;
    transportCost = 4500;
  } else if (modeLower.includes('flight') || modeLower.includes('plane') || modeLower.includes('air')) {
    modeName = 'Flight';
    transitType = 'Scheduled Domestic Flight';
    arrivalHub = `${destinationName} Airport Terminal (Domestic Arrival)`;
    transportSummary = `Direct Flight (${fromLocation} ➔ ${destinationName}) + Pre-arranged Airport Cab`;
    transportCost = 9200;
  } else if (modeLower.includes('car') || modeLower.includes('cab') || modeLower.includes('taxi') || modeLower.includes('drive')) {
    modeName = 'Car / Cab';
    transitType = 'Private AC Sedan / SUV';
    arrivalHub = `Expressway Arrival at ${destinationName}`;
    transportSummary = `Door-to-door Private AC Cab Highway Road Trip (${fromLocation} ➔ ${destinationName})`;
    transportCost = 7600;
  } else if (modeLower.includes('bike') || modeLower.includes('motorcycle')) {
    modeName = 'Bike';
    transitType = 'Royal Enfield Cruiser Motorcycle';
    arrivalHub = `Scenic Mountain Highway Ride into ${destinationName}`;
    transportSummary = `Motorcycle Adventure Ride (${fromLocation} ➔ ${destinationName}) with Support Van`;
    transportCost = 5200;
  }

  // Cost estimates based on budget tier
  let accommodationCost = 16000;
  let activityCost = 5000;
  let foodCost = 6000;
  const budgetLower = (budgetTier || '').toLowerCase();
  if (budgetLower.includes('budget') || budgetLower.includes('15,000')) {
    accommodationCost = 8000;
    activityCost = 2500;
    foodCost = 3500;
    transportCost = Math.round(transportCost * 0.75);
  } else if (budgetLower.includes('premium') || budgetLower.includes('60,000')) {
    accommodationCost = 28000;
    activityCost = 8500;
    foodCost = 10000;
    transportCost = Math.round(transportCost * 1.3);
  } else if (budgetLower.includes('luxury') || budgetLower.includes('1,00,000')) {
    accommodationCost = 52000;
    activityCost = 15000;
    foodCost = 18000;
    transportCost = Math.round(transportCost * 1.8);
  }
  const totalCost = accommodationCost + transportCost + activityCost + foodCost;

  // Build each day's plan
  const days = [];
  for (let d = 1; d <= duration; d++) {
    const p1 = places[(d * 2 - 2) % places.length];
    const p2 = places[(d * 2 - 1) % places.length];
    const p3 = places[(d * 2) % places.length];

    if (d === 1) {
      // Day 1: Travel Mode Arrival & Vibe Welcome
      days.push({
        dayNumber: 1,
        date: `Day 1 (${params.departureDate || 'Arrival'})`,
        theme: `Arrival via ${modeName} & Evening ${vibeCategory === 'spiritual' ? 'Sacred Aarti' : 'Sunset Welcome'}`,
        activities: [
          {
            id: `act-1-1`,
            time: modeName === 'Bus' ? '07:30 AM' : modeName === 'Train' ? '10:00 AM' : '11:30 AM',
            title: `Arrival at ${arrivalHub}`,
            location: arrivalHub,
            duration: '45 mins',
            cost: 0,
            travelTime: '—',
            transport: transitType,
            type: 'transit',
            bookingRef: `${modeName.toUpperCase().slice(0, 3)}-${Date.now().toString().slice(-5)}`,
            notes: `Comfortable ${modeName} arrival with luggage assistance and direct greeting.`,
          },
          {
            id: `act-1-2`,
            time: '12:30 PM',
            title: `Check-in & Traditional Regional Welcome`,
            location: `${destinationName} Heritage Stay`,
            duration: '1 hour',
            cost: 0,
            travelTime: '25 min transfer',
            transport: 'Pre-arranged Local Cab',
            type: 'hotel',
            notes: 'Smooth room allocation, refreshing welcome drink, and acclimatization briefing.',
          },
          {
            id: `act-1-3`,
            time: '04:30 PM',
            title: `First Experience: ${p1.name}`,
            location: p1.name,
            duration: '2 hours',
            cost: vibeCategory === 'spiritual' ? 0 : 350,
            travelTime: '15 mins',
            transport: 'Local Cab / Walk',
            type: 'sightseeing',
            notes: p1.type,
          },
          {
            id: `act-1-4`,
            time: '07:30 PM',
            title: vibeCategory === 'spiritual'
              ? 'Sacred Evening Aarti & Holy Prasadam Dinner'
              : vibeCategory === 'romantic'
              ? 'Candlelight Terrace Welcome Dinner with Mountain/Lake View'
              : vibeCategory === 'adventure'
              ? 'Trekker Campfire & Route Strategy Dinner'
              : 'Authentic Regional Welcome Dinner & Folk Melodies',
            location: `${destinationName} Culinary Court`,
            duration: '1.5 hours',
            cost: 650,
            travelTime: '10 mins',
            transport: 'Walking',
            type: 'meal',
            notes: 'Locally sourced fresh ingredients prepared in traditional regional style.',
          },
        ],
      });
    } else if (d === duration) {
      // Final Day: Morning Farewell, Artisan Souvenirs & Return Travel
      days.push({
        dayNumber: d,
        date: `Day ${d} (${params.returnDate || 'Departure'})`,
        theme: `Farewell ${destinationName} & Return Journey via ${modeName}`,
        activities: [
          {
            id: `act-${d}-1`,
            time: '07:30 AM',
            title: vibeCategory === 'spiritual'
              ? `Final Morning Darshan & Blessing at ${p1.name}`
              : `Sunrise Farewell Walk & Photography at ${p1.name}`,
            location: p1.name,
            duration: '1.5 hours',
            cost: 0,
            travelTime: '15 mins',
            transport: 'Walking / Cab',
            type: 'sightseeing',
            notes: 'Quiet dawn atmosphere ideal for peaceful contemplation and final photos.',
          },
          {
            id: `act-${d}-2`,
            time: '09:30 AM',
            title: 'Leisurely Breakfast & Hotel Checkout',
            location: `${destinationName} Dining Hall`,
            duration: '1 hour',
            cost: 0,
            travelTime: '—',
            transport: '—',
            type: 'hotel',
            notes: 'Settling incidentals, baggage luggage tag assistance, and packed travel snacks.',
          },
          {
            id: `act-${d}-3`,
            time: '11:00 AM',
            title: `Artisan Handicraft & Souvenir Trail`,
            location: `${destinationName} Local Craft Bazaars`,
            duration: '2 hours',
            cost: 800,
            travelTime: '15 mins',
            transport: 'Local Cab',
            type: 'sightseeing',
            notes: 'Support local artisans; authentic spices, herbal teas, handlooms, and holy mementos.',
          },
          {
            id: `act-${d}-4`,
            time: modeName === 'Bus' ? '06:00 PM' : modeName === 'Train' ? '04:30 PM' : '03:00 PM',
            title: `Boarding ${modeName} for Return Transit to ${fromLocation}`,
            location: arrivalHub,
            duration: '1 hour',
            cost: 0,
            travelTime: '30 mins cab',
            transport: transitType,
            type: 'transit',
            bookingRef: `RET-${modeName.toUpperCase().slice(0, 3)}-${Date.now().toString().slice(-4)}`,
            notes: `Guaranteed confirmed boarding on ${transitType} for safe and comfortable journey back to ${fromLocation}.`,
          },
        ],
      });
    } else {
      // Middle Days: Immersive, vibe-centric explorations
      days.push({
        dayNumber: d,
        date: `Day ${d}`,
        theme: vibeCategory === 'spiritual'
          ? `Maha Darshan & Sacred Shrines of ${destinationName}`
          : vibeCategory === 'adventure'
          ? `Adrenaline Expeditions & Scenic Trails in ${destinationName}`
          : vibeCategory === 'romantic'
          ? `Enchanting Vistas & Couple Retrospective in ${destinationName}`
          : vibeCategory === 'heritage'
          ? `Royal Citadels & Architectural Wonders of ${destinationName}`
          : `Iconic Highlights & Natural Splendors of ${destinationName}`,
        activities: [
          {
            id: `act-${d}-1`,
            time: '06:30 AM',
            title: `Morning Highlight: ${p1.name}`,
            location: p1.name,
            duration: '2.5 hours',
            cost: vibeCategory === 'spiritual' ? 250 : 500,
            travelTime: '20 mins',
            transport: 'Pre-arranged Local Cab',
            type: 'sightseeing',
            notes: p1.type,
          },
          {
            id: `act-${d}-2`,
            time: '10:00 AM',
            title: 'Authentic Local Brunch & Refreshing Herbal Tea',
            location: `Heritage Kitchen, ${destinationName}`,
            duration: '1 hour',
            cost: 400,
            travelTime: '15 mins',
            transport: 'Walking',
            type: 'meal',
            notes: 'Freshly prepared specialty dishes reflecting regional seasonal harvest.',
          },
          {
            id: `act-${d}-3`,
            time: '12:00 PM',
            title: `Deep Exploration: ${p2.name}`,
            location: p2.name,
            duration: '3 hours',
            cost: 450,
            travelTime: '25 mins',
            transport: 'Private Cab',
            type: 'sightseeing',
            notes: p2.type,
          },
          {
            id: `act-${d}-4`,
            time: '04:30 PM',
            title: `Sunset Experience: ${p3.name}`,
            location: p3.name,
            duration: '2 hours',
            cost: 200,
            travelTime: '20 mins',
            transport: 'Private Cab',
            type: 'sightseeing',
            notes: p3.type,
          },
        ],
      });
    }
  }

  // Packing list relevant to vibe
  let packingList = ['Valid Government ID (Aadhaar/Passport)', 'Portable Power Bank', 'Light Jacket'];
  if (vibeCategory === 'spiritual') {
    packingList.push('Traditional attire (Kurta/Dhoti/Saree)', 'Slip-on footwear for temple parikrama', 'Pooja cloth bag', 'Rudraksha / Mala');
  } else if (vibeCategory === 'adventure') {
    packingList.push('High-grip trekking shoes', 'Waterproof rucksack & poncho', 'First aid & blister kit', 'UV sunglasses & energy bars');
  } else if (vibeCategory === 'romantic') {
    packingList.push('Evening smart casuals', 'Camera with portrait lens', 'Sunscreen & floral fragrance', 'Light stole');
  } else if (vibeCategory === 'beaches') {
    packingList.push('Quick-dry swimwear', 'Waterproof phone pouch', 'Polarized shades', 'Reef-safe sunscreen & beach towel');
  }

  return {
    id: `trip-${Date.now()}`,
    title: `${duration} Days in ${destinationName} — ${travelStyle.split('(')[0].trim()}`,
    destination: destinationName,
    destinationImage: image,
    startDate: params.departureDate || '2026-10-15',
    endDate: params.returnDate || '2026-10-21',
    durationDays: duration,
    travelers: travelers,
    travelStyle: travelStyle,
    travelMode: modeName,
    transportMode: modeName,
    transportSummary: transportSummary,
    budgetTier: budgetTier,
    status: 'Upcoming',
    weather: {
      ...weather,
      precipitation: weather.rain || '0%',
      windSpeed: weather.wind || '12 km/h',
      uvIndex: 'Moderate (6/10)',
      bestOutdoorHours: '06:30 AM – 10:30 AM & 04:30 PM – 07:00 PM',
    },
    costBreakdown: {
      accommodation: accommodationCost,
      transportation: transportCost,
      activities: activityCost,
      food: foodCost,
      taxesAndFees: Math.round(totalCost * 0.05),
      total: Math.round(totalCost * 1.05),
    },
    days: days,
    packingList: packingList,
  };
}
