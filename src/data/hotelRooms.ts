
export type Room = {
  id: string;
  name: string;
  description: string;
  images: string[];
  pricePerNight: number;
  occupancy: {
    adults: number;
    children: number;
  };
  size: string;
  beds: string;
  amenities: string[];
  extras: string;
  cancellationPolicy: string;
  isPopular?: boolean;
};

export type Hotel = {
  id: string;
  name: string;
  location: string;
  description: string;
  starRating: number;
  images: string[];
  features: string[];
  smithExtra: string;
  rooms: Room[];
  facilities: string[];
  highlights: string[];
};

export const hotelData: Hotel = {
  id: "bingham-riverhouse",
  name: "Bingham Riverhouse",
  location: "Richmond, London",
  description: "A transformed Georgian townhouse on the banks of the River Thames, the Bingham Riverhouse is a peaceful retreat with a London postcode. Each stylish room comes with views of either the river or the garden, alongside modern amenities and elegant furnishings. The riverside restaurant serves seasonal British cuisine from morning to night.",
  starRating: 4,
  images: [
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?q=80&w=1574&auto=format&fit=crop"
  ],
  features: ["Riverside location", "Boutique hotel", "Garden", "Restaurant", "Bar"],
  smithExtra: "A signature welcome cocktail each and a 10% discount on food in the restaurant during your stay",
  facilities: [
    "15 rooms",
    "Restaurant",
    "Bar",
    "Free WiFi",
    "Garden",
    "Concierge",
    "Parking nearby (£)",
    "Pet-friendly",
    "Room service",
    "Air conditioning",
    "Laundry service"
  ],
  highlights: [
    "Tranquil riverside location",
    "Award-winning restaurant",
    "Elegant, literary-inspired decor",
    "Just 20 minutes from central London",
    "Beautiful private garden",
    "Personalized service"
  ],
  rooms: [
    {
      id: "cosy-double",
      name: "Cosy Double Room",
      description: "These intimate rooms are perfect for solo travelers or couples on a short stay. Each room features a comfortable double bed, ensuite bathroom with rainfall shower, and views of the garden.",
      images: [
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1374&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?q=80&w=1470&auto=format&fit=crop"
      ],
      pricePerNight: 245,
      occupancy: {
        adults: 2,
        children: 0
      },
      size: "15m²",
      beds: "Double bed",
      amenities: [
        "Ensuite bathroom with rainfall shower",
        "Organic toiletries",
        "Smart TV",
        "Free WiFi",
        "Air conditioning",
        "Minibar",
        "Safe"
      ],
      extras: "Complimentary tea and coffee",
      cancellationPolicy: "Free cancellation up to 14 days before arrival",
      isPopular: false
    },
    {
      id: "river-room",
      name: "River Room",
      description: "Our signature rooms offer stunning views of the Thames. These larger rooms feature a king-sized bed, ensuite bathroom with both bathtub and shower, and a small sitting area perfect for enjoying the riverside panorama.",
      images: [
        "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?q=80&w=1470&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1470&auto=format&fit=crop"
      ],
      pricePerNight: 385,
      occupancy: {
        adults: 2,
        children: 1
      },
      size: "25m²",
      beds: "King bed",
      amenities: [
        "Ensuite bathroom with bathtub and rainfall shower",
        "Luxury organic toiletries",
        "55-inch Smart TV",
        "High-speed WiFi",
        "Air conditioning",
        "Fully stocked minibar",
        "Safe",
        "Nespresso machine"
      ],
      extras: "Complimentary bottle of wine on arrival",
      cancellationPolicy: "Free cancellation up to 14 days before arrival",
      isPopular: true
    },
    {
      id: "garden-suite",
      name: "Garden Suite",
      description: "Our most spacious accommodation, these luxurious suites overlook the hotel's private garden. Each features a king-sized bed, separate living area, and an indulgent bathroom with freestanding bathtub and separate rainfall shower.",
      images: [
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1470&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1564078516393-cf04bd966897?q=80&w=1374&auto=format&fit=crop"
      ],
      pricePerNight: 495,
      occupancy: {
        adults: 2,
        children: 2
      },
      size: "40m²",
      beds: "King bed + sofa bed",
      amenities: [
        "Ensuite bathroom with freestanding bathtub and separate rainfall shower",
        "Premium organic toiletries",
        "Two 55-inch Smart TVs",
        "High-speed WiFi",
        "Climate control",
        "Fully stocked premium minibar",
        "Safe",
        "Nespresso machine",
        "Bluetooth speaker"
      ],
      extras: "Complimentary bottle of champagne and fruit platter on arrival",
      cancellationPolicy: "Free cancellation up to 21 days before arrival",
      isPopular: false
    }
  ]
};
