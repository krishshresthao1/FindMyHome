const properties = [
  {
    id: 1,
    title: "Modern Family Flat",
    propertyType: "Flat",
    location: "New Baneshwor",
    price: 25000,
    verified: true,

    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200",

    gallery: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200",
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=1200",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
    ],

    rooms: {
      bedrooms: 2,
      bathrooms: 2,
      bathroomType: "Attached",
      toiletStyle: "Western",
      floor: "2nd",
    },

    amenities: {
      wifi: true,
      solar: true,
      governmentWater: true,
      boring: true,
      bikeParking: true,
      carParking: false,
      furnished: false,
      separateKitchen: true,
    },

    accessibility: {
      roadDistance: "2 min walk",
      busStop: "150 m",
    },

    rental: {
      tenantPreference: "Family",
      availableFrom: "Immediately",
      minimumStay: "6 Months",
    },

    owner: {
      name: "Ram Sharma",
      phone: "98XXXXXXXX",
      whatsapp: "98XXXXXXXX",
      verified: true,
      memberSince: "2022",
    },

    nearby: {
      grocery: "90 m",
      school: "450 m",
      hospital: "700 m",
      atm: "120 m",
      petrolPump: "350 m",
    },
  },

  {
    id: 2,
    title: "Student Room",
    propertyType: "Room",
    location: "Kirtipur",
    price: 8500,
    verified: true,

    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200",

    gallery: [],

    rooms: {
      bedrooms: 1,
      bathrooms: 1,
      bathroomType: "Common",
      toiletStyle: "Indian",
      floor: "Ground",
    },

    amenities: {
      wifi: true,
      solar: false,
      governmentWater: true,
      boring: false,
      bikeParking: true,
      carParking: false,
      furnished: true,
      separateKitchen: true,
    },

    accessibility: {
      roadDistance: "4 min walk",
      busStop: "80 m",
    },

    rental: {
      tenantPreference: "Students",
      availableFrom: "Immediately",
      minimumStay: "3 Months",
    },

    owner: {
      name: "Sita Shrestha",
      phone: "98XXXXXXXX",
      whatsapp: "98XXXXXXXX",
      verified: true,
      memberSince: "2021",
    },

    nearby: {
      grocery: "50 m",
      school: "150 m",
      hospital: "500 m",
      atm: "80 m",
      petrolPump: "600 m",
    },
  },

  {
    id: 3,
    title: "Luxury Duplex House",
    propertyType: "House",
    location: "Lalitpur",
    price: 65000,
    verified: false,

    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200",

    gallery: [],

    rooms: {
      bedrooms: 5,
      bathrooms: 4,
      bathroomType: "Attached",
      toiletStyle: "Western",
      floor: "3rd",
    },

    amenities: {
      wifi: true,
      solar: true,
      governmentWater: true,
      boring: true,
      bikeParking: true,
      carParking: true,
      furnished: true,
      separateKitchen: true,
    },

    accessibility: {
      roadDistance: "Vehicle reaches gate",
      busStop: "250 m",
    },

    rental: {
      tenantPreference: "No Preference",
      availableFrom: "Next Month",
      minimumStay: "1 Year",
    },

    owner: {
      name: "Hari KC",
      phone: "98XXXXXXXX",
      whatsapp: "98XXXXXXXX",
      verified: false,
      memberSince: "2020",
    },

    nearby: {
      grocery: "150 m",
      school: "500 m",
      hospital: "900 m",
      atm: "300 m",
      petrolPump: "500 m",
    },
  },

  {
    id: 4,
    title: "Office Space",
    propertyType: "Commercial",
    location: "Thamel",
    price: 40000,
    verified: true,

    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200",

    gallery: [],

    rooms: {
      bedrooms: 0,
      bathrooms: 2,
      bathroomType: "Common",
      toiletStyle: "Western",
      floor: "1st",
    },

    amenities: {
      wifi: true,
      solar: false,
      governmentWater: true,
      boring: false,
      bikeParking: true,
      carParking: true,
      furnished: true,
      separateKitchen: false,
    },

    accessibility: {
      roadDistance: "Main Road",
      busStop: "50 m",
    },

    rental: {
      tenantPreference: "Business",
      availableFrom: "Immediately",
      minimumStay: "1 Year",
    },

    owner: {
      name: "Business Holdings",
      phone: "98XXXXXXXX",
      whatsapp: "98XXXXXXXX",
      verified: true,
      memberSince: "2019",
    },

    nearby: {
      grocery: "20 m",
      school: "300 m",
      hospital: "500 m",
      atm: "30 m",
      petrolPump: "250 m",
    },
  },

  {
    id: 5,
    title: "Semi Furnished Flat",
    propertyType: "Flat",
    location: "Koteshwor",
    price: 18000,
    verified: true,

    image:
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=1200",

    gallery: [],

    rooms: {
      bedrooms: 2,
      bathrooms: 1,
      bathroomType: "Attached",
      toiletStyle: "Western",
      floor: "1st",
    },

    amenities: {
      wifi: false,
      solar: true,
      governmentWater: true,
      boring: true,
      bikeParking: true,
      carParking: false,
      furnished: true,
      separateKitchen: true,
    },

    accessibility: {
      roadDistance: "3 min walk",
      busStop: "100 m",
    },

    rental: {
      tenantPreference: "Working Professionals",
      availableFrom: "Immediately",
      minimumStay: "6 Months",
    },

    owner: {
      name: "Milan Shrestha",
      phone: "98XXXXXXXX",
      whatsapp: "98XXXXXXXX",
      verified: true,
      memberSince: "2023",
    },

    nearby: {
      grocery: "60 m",
      school: "350 m",
      hospital: "650 m",
      atm: "150 m",
      petrolPump: "400 m",
    },
  },
];

export default properties;