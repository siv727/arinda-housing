// Mock data for property listings
export const mockListings = [
  {
    id: 1,
    title: "Modern Studio Near Campus",
    type: "Studio Apartment",
    price: 850,
    location: "University District",
    distance: "0.2 miles from campus",
    rating: 4.8,
    reviewCount: 127,
    verified: true,
    availableDate: "August 15, 2024",
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["WiFi", "Laundry", "Kitchen", "Study Area", "Parking", "Gym"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80"
    ],
    description: "This modern studio apartment is perfect for students looking for a comfortable and convenient living space near campus. Located in the heart of University District, you'll be just a 2-minute walk from classes, libraries, and campus amenities. The space features contemporary furnishings, a fully equipped kitchen, and a dedicated study area to help you succeed academically. The building offers excellent amenities including a fitness center, study lounges, and 24/7 security for peace of mind.",
    securityDeposit: 850,
    applicationFee: 50,
    host: {
      name: "Sarah Dilucca",
      avatar: "https://i.pravatar.cc/150?img=5",
      yearsHosting: 3,
      phone: "+63 912 542 1287",
      email: "landlord@gmail.com"
    },
    reviews: [
      {
        id: 1,
        reviewerName: "Emma Wilson",
        reviewerAvatar: "https://i.pravatar.cc/150?img=10",
        rating: 5,
        date: "October 2024",
        text: "Amazing place! So close to campus and Sarah was a fantastic landlord. The apartment is exactly as described and the study area really helped during finals week."
      },
      {
        id: 2,
        reviewerName: "James Chen",
        reviewerAvatar: "https://i.pravatar.cc/150?img=12",
        rating: 5,
        date: "September 2024",
        text: "Perfect for students! The location can't be beat and the amenities are great. WiFi is super fast which was essential for my online classes."
      },
      {
        id: 3,
        reviewerName: "Maria Rodriguez",
        reviewerAvatar: "https://i.pravatar.cc/150?img=9",
        rating: 4,
        date: "August 2024",
        text: "Great apartment with everything you need. Only minor issue was the AC could be better during summer, but overall highly recommended!"
      }
    ],
    mapLocation: {
      lat: 40.7128,
      lng: -74.0060,
      address: "123 University Ave, University District"
    }
  },
  {
    id: 2,
    title: "Shared Dorm Room - Female Only",
    type: "Shared Dorm",
    price: 450,
    location: "Campus Housing",
    distance: "0.1 miles from campus",
    rating: 4.6,
    reviewCount: 89,
    verified: true,
    availableDate: "September 1, 2024",
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["WiFi", "Shared Kitchen", "Study Lounge"],
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80"
    ],
    description: "Affordable shared dorm room in campus housing with access to all campus amenities. Female-only floor with secure access. Great community atmosphere and study support.",
    securityDeposit: 450,
    applicationFee: 30,
    host: {
      name: "Campus Housing Services",
      avatar: "https://i.pravatar.cc/150?img=20",
      yearsHosting: 5,
      phone: "+63 917 654 3210",
      email: "housing@campus.edu"
    },
    reviews: [],
    mapLocation: {
      lat: 40.7130,
      lng: -74.0058,
      address: "45 Campus Drive, Campus Housing"
    }
  },
  {
    id: 3,
    title: "Private Room in Student House",
    type: "Private Room",
    price: 650,
    location: "Student Village",
    distance: "0.5 miles from campus",
    rating: 4.7,
    reviewCount: 203,
    verified: false,
    availableDate: "August 1, 2024",
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["WiFi", "Shared Kitchen", "Parking", "Laundry", "Study Area"],
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80"
    ],
    description: "Enjoy your own private room in a shared student house with friendly housemates. This cozy space offers privacy when you need it and social opportunities when you want them. The house features a shared kitchen, living room, and backyard area perfect for BBQs and study breaks. Located in the popular Student Village neighborhood, you'll find plenty of cafes, restaurants, and grocery stores within walking distance. Parking space included!",
    securityDeposit: 650,
    applicationFee: 40,
    host: {
      name: "Michael Torres",
      avatar: "https://i.pravatar.cc/150?img=15",
      yearsHosting: 2,
      phone: "+63 920 123 4567",
      email: "mtorres@housing.com"
    },
    reviews: [
      {
        id: 1,
        reviewerName: "Alex Kim",
        reviewerAvatar: "https://i.pravatar.cc/150?img=33",
        rating: 5,
        date: "November 2024",
        text: "Great place to live with awesome housemates! Michael is very responsive and the location is perfect for getting to campus."
      },
      {
        id: 2,
        reviewerName: "Sophie Turner",
        reviewerAvatar: "https://i.pravatar.cc/150?img=28",
        rating: 4,
        date: "October 2024",
        text: "Nice room and good value for money. The shared kitchen can get busy during dinner time but overall a solid choice."
      }
    ],
    mapLocation: {
      lat: 40.7135,
      lng: -74.0065,
      address: "789 Student Village Blvd, Student Village"
    }
  },
  {
    id: 4,
    title: "Luxury Student Apartment",
    type: "Studio Apartment",
    price: 1200,
    location: "Downtown",
    distance: "1.2 miles from campus",
    rating: 4.9,
    reviewCount: 156,
    verified: true,
    availableDate: "August 15, 2024",
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["WiFi", "Gym", "Pool", "Concierge", "Parking", "Rooftop Deck"],
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800&q=80",
      "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800&q=80",
      "https://images.unsplash.com/photo-1574643156929-51fa098b0394?w=800&q=80",
      "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80"
    ],
    description: "Experience luxury student living in this stunning downtown studio apartment. Features floor-to-ceiling windows with city views, premium appliances, quartz countertops, and designer finishes throughout. The building offers resort-style amenities including a state-of-the-art fitness center, rooftop pool with lounge areas, 24/7 concierge service, and secure underground parking. Perfect for students who want the best of both worlds - close to city attractions while maintaining easy access to campus.",
    securityDeposit: 1200,
    applicationFee: 75,
    host: {
      name: "Premium Properties LLC",
      avatar: "https://i.pravatar.cc/150?img=25",
      yearsHosting: 7,
      phone: "+63 915 789 0123",
      email: "info@premiumprop.com"
    },
    reviews: [
      {
        id: 1,
        reviewerName: "David Park",
        reviewerAvatar: "https://i.pravatar.cc/150?img=14",
        rating: 5,
        date: "November 2024",
        text: "Absolutely worth the price! The amenities are top-notch and the location is unbeatable. Management is very professional."
      },
      {
        id: 2,
        reviewerName: "Lisa Anderson",
        reviewerAvatar: "https://i.pravatar.cc/150?img=22",
        rating: 5,
        date: "October 2024",
        text: "Best decision I made for my final year! The rooftop pool is amazing and I love being able to walk to restaurants and shops."
      },
      {
        id: 3,
        reviewerName: "Ryan Martinez",
        reviewerAvatar: "https://i.pravatar.cc/150?img=18",
        rating: 4,
        date: "September 2024",
        text: "Great place but a bit pricey. The gym and pool make up for it though. Highly recommend if budget allows!"
      }
    ],
    mapLocation: {
      lat: 40.7145,
      lng: -74.0080,
      address: "500 Downtown Plaza, Downtown District"
    }
  },
  {
    id: 5,
    title: "Cozy 2-Bedroom Apartment",
    type: "2-Bedroom",
    price: 1100,
    location: "University District",
    distance: "0.3 miles from campus",
    rating: 4.5,
    reviewCount: 98,
    verified: true,
    availableDate: "July 15, 2024",
    bedrooms: 2,
    bathrooms: 1,
    amenities: ["WiFi", "Laundry", "Kitchen", "Parking", "Balcony", "Storage"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
      "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80"
    ],
    description: "Perfect for sharing with a roommate! This spacious 2-bedroom apartment offers comfortable living just a short walk from campus. Each bedroom is generously sized with ample closet space. The apartment features a full kitchen, in-unit laundry, and a private balcony perfect for relaxing after classes. Located on a quiet street in University District, you'll enjoy the peaceful atmosphere while still being close to campus life. One designated parking space included!",
    securityDeposit: 1100,
    applicationFee: 60,
    host: {
      name: "Jennifer Lee",
      avatar: "https://i.pravatar.cc/150?img=31",
      yearsHosting: 4,
      phone: "+63 918 234 5678",
      email: "jlee.rentals@gmail.com"
    },
    reviews: [
      {
        id: 1,
        reviewerName: "Tom Stevens",
        reviewerAvatar: "https://i.pravatar.cc/150?img=13",
        rating: 5,
        date: "October 2024",
        text: "Great apartment for roommates! Both bedrooms are good size and Jennifer is an excellent landlord who responds quickly to any issues."
      },
      {
        id: 2,
        reviewerName: "Hannah Brown",
        reviewerAvatar: "https://i.pravatar.cc/150?img=26",
        rating: 4,
        date: "September 2024",
        text: "Nice place with all the essentials. The balcony is a nice bonus. Only downside is the bathroom can feel small with two people."
      }
    ],
    mapLocation: {
      lat: 40.7132,
      lng: -74.0062,
      address: "234 University Heights, University District"
    }
  },
  {
    id: 6,
    title: "Budget-Friendly Shared Room",
    type: "Shared Room",
    price: 380,
    location: "Campus Housing",
    distance: "0.2 miles from campus",
    rating: 4.3,
    reviewCount: 64,
    verified: false,
    availableDate: "August 20, 2024",
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["WiFi", "Shared Kitchen", "Study Lounge", "Laundry"],
    images: [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80"
    ],
    description: "The most affordable housing option for students on a budget! Share a room with one other student in this clean and comfortable campus housing. While you'll share your sleeping space, you'll have access to shared kitchen facilities, study lounges, and laundry room. This is a great way to save money while making friends and staying close to campus. Perfect for freshmen or students prioritizing affordability over privacy.",
    securityDeposit: 380,
    applicationFee: 25,
    host: {
      name: "Student Housing Co-op",
      avatar: "https://i.pravatar.cc/150?img=40",
      yearsHosting: 8,
      phone: "+63 922 456 7890",
      email: "coop@studenthousing.org"
    },
    reviews: [
      {
        id: 1,
        reviewerName: "Chris Johnson",
        reviewerAvatar: "https://i.pravatar.cc/150?img=17",
        rating: 4,
        date: "October 2024",
        text: "Great value for money! My roommate is cool and the location is unbeatable. Helped me save a lot this semester."
      },
      {
        id: 2,
        reviewerName: "Maya Patel",
        reviewerAvatar: "https://i.pravatar.cc/150?img=24",
        rating: 4,
        date: "September 2024",
        text: "Perfect starter option for students. Not much privacy but you really can't beat the price and location!"
      }
    ],
    mapLocation: {
      lat: 40.7129,
      lng: -74.0059,
      address: "67 Campus Circle, Campus Housing"
    }
  },
  {
    id: 7,
    title: "Furnished 1-Bedroom Near Library",
    type: "1-Bedroom",
    price: 950,
    location: "University District",
    distance: "0.4 miles from campus",
    rating: 4.7,
    reviewCount: 142,
    verified: true,
    availableDate: "September 1, 2024",
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["WiFi", "Laundry", "Kitchen", "Study Area", "Air Conditioning", "Heating"],
    images: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
      "https://images.unsplash.com/photo-1494203484021-3c454daf695d?w=800&q=80",
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&q=80"
    ],
    description: "Fully furnished 1-bedroom apartment perfect for serious students who value proximity to academic resources. Located just steps from the university library, you'll never have an excuse for late assignments! The apartment comes completely furnished with a comfortable bed, study desk, dining table, and living room furniture. Features a dedicated study area with excellent lighting, high-speed WiFi, and a quiet atmosphere conducive to academic success. The building is well-maintained with in-unit laundry for convenience.",
    securityDeposit: 950,
    applicationFee: 55,
    host: {
      name: "Robert Chen",
      avatar: "https://i.pravatar.cc/150?img=11",
      yearsHosting: 6,
      phone: "+63 917 890 1234",
      email: "rchen.properties@yahoo.com"
    },
    reviews: [
      {
        id: 1,
        reviewerName: "Olivia White",
        reviewerAvatar: "https://i.pravatar.cc/150?img=27",
        rating: 5,
        date: "November 2024",
        text: "Perfect for grad students! Being so close to the library was amazing during thesis writing. Robert is a great landlord."
      },
      {
        id: 2,
        reviewerName: "Marcus Lee",
        reviewerAvatar: "https://i.pravatar.cc/150?img=16",
        rating: 5,
        date: "October 2024",
        text: "Everything you need is already here. Just bring your clothes and books! The study area setup is excellent."
      },
      {
        id: 3,
        reviewerName: "Elena Vasquez",
        reviewerAvatar: "https://i.pravatar.cc/150?img=21",
        rating: 4,
        date: "September 2024",
        text: "Great location and well-maintained. Furniture is comfortable. Would recommend to anyone looking for convenience!"
      }
    ],
    mapLocation: {
      lat: 40.7133,
      lng: -74.0063,
      address: "456 Scholar Way, University District"
    }
  },
  {
    id: 8,
    title: "Spacious Studio with Balcony",
    type: "Studio Apartment",
    price: 780,
    location: "Student Village",
    distance: "0.6 miles from campus",
    rating: 4.6,
    reviewCount: 115,
    verified: true,
    availableDate: "August 10, 2024",
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["WiFi", "Laundry", "Kitchen", "Balcony", "Parking", "Pet-Friendly"],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800&q=80",
      "https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&q=80"
    ],
    description: "Enjoy studio living with extra breathing room! This spacious studio apartment features a private balcony perfect for morning coffee, study breaks, or evening relaxation. The open floor plan maximizes space efficiency while maintaining distinct living and sleeping areas. Large windows provide abundant natural light throughout the day. Located in the vibrant Student Village area, you'll have easy access to cafes, restaurants, and shops. Pet-friendly for small animals (additional deposit required). One parking space included!",
    securityDeposit: 780,
    applicationFee: 45,
    host: {
      name: "Amanda Foster",
      avatar: "https://i.pravatar.cc/150?img=32",
      yearsHosting: 3,
      phone: "+63 919 345 6789",
      email: "afoster.rentals@gmail.com"
    },
    reviews: [
      {
        id: 1,
        reviewerName: "Jake Morrison",
        reviewerAvatar: "https://i.pravatar.cc/150?img=19",
        rating: 5,
        date: "November 2024",
        text: "Love this place! The balcony is perfect for my morning routine and Amanda allows pets which is awesome. Great value!"
      },
      {
        id: 2,
        reviewerName: "Nicole Garcia",
        reviewerAvatar: "https://i.pravatar.cc/150?img=29",
        rating: 4,
        date: "October 2024",
        text: "Really spacious for a studio. The Student Village location is fun and lively. Highly recommend!"
      },
      {
        id: 3,
        reviewerName: "Daniel Kim",
        reviewerAvatar: "https://i.pravatar.cc/150?img=23",
        rating: 5,
        date: "September 2024",
        text: "Perfect student apartment. The balcony makes such a difference compared to other studios I looked at."
      }
    ],
    mapLocation: {
      lat: 40.7138,
      lng: -74.0068,
      address: "890 Village Green, Student Village"
    }
  }
];
