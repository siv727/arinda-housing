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
      isSuperhost: true,
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
      isSuperhost: false,
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
    availableDate: "Aug 2024",
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["WiFi", "Shared Kitchen", "Parking"],
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80"
    ],
    description: "Private room with shared common areas. Great community atmosphere with fellow students."
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
    availableDate: "Aug 2024",
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["WiFi", "Gym", "Pool"],
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800&q=80"
    ],
    description: "High-end studio apartment with premium amenities and modern finishes."
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
    availableDate: "Jul 2024",
    bedrooms: 2,
    bathrooms: 1,
    amenities: ["WiFi", "Laundry", "Kitchen", "Parking"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80"
    ],
    description: "Perfect for sharing with a roommate. Walking distance to campus."
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
    availableDate: "Aug 2024",
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["WiFi", "Shared Kitchen"],
    images: [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80",
      "https://images.unsplash.com/photo-1578898886Territory-f4b3db58e4e7?w=800&q=80"
    ],
    description: "Most affordable option for students on a tight budget."
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
    availableDate: "Sep 2024",
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["WiFi", "Laundry", "Kitchen", "Study Area"],
    images: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=80"
    ],
    description: "Fully furnished 1-bedroom apartment close to campus library. Ideal for serious students."
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
    availableDate: "Aug 2024",
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["WiFi", "Laundry", "Kitchen", "Balcony"],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800&q=80"
    ],
    description: "Studio apartment with private balcony. Perfect for enjoying your morning coffee."
  }
];
