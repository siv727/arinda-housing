import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../../components/tenant/Navbar'
import PhotoGallery from '../../components/tenant/PhotoGallery'
import BookingInfoCard from '../../components/tenant/BookingInfoCard'
import ReviewsSection from '../../components/tenant/ReviewsSection'
import LocationMap from '../../components/tenant/LocationMap'
import { getListingById } from '../../api/listingApi' // Import the new API function

const ListingDetail = () => {
  const { id } = useParams()

  // State for data, loading, and error
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true)
        const response = await getListingById(id)
        const data = response.data

        // --- DATA MAPPING: Backend DTO -> Frontend Props ---
        const mappedListing = {
          id: data.id,
          title: data.title,
          description: data.description,

          // Map 'photodetails' array to simple string array for gallery
          images: data.photodetails?.map(p => p.url) || [],

          // Map Property Info
          roomType: data.roomtype,
          propertyType: data.propertytype,
          location: data.location,
          rating: data.reviewsummary?.averagerating || 0,
          reviewCount: data.reviewsummary?.totalreviews || 0,

          // Map Host (Construct host object since backend sends flat fields)
          host: {
            name: data.hostname,
            email: data.hostemail,
            phone: data.hostphonenumber,
            // Generate a placeholder avatar using their name
            avatar: `https://ui-avatars.com/api/?name=${data.hostname}&background=random`,
            yearsHosting: 1 // Default (Backend doesn't provide this yet)
          },

          // Map Arrays
          inclusions: data.inclusions || [],
          amenities: data.amenities || [],

          // Map Reviews (Transform keys to match frontend expectation)
          reviews: data.reviewdetails?.map(r => ({
            id: r.id,
            reviewerName: r.reviewername,
            reviewerAvatar: `https://ui-avatars.com/api/?name=${r.reviewername}&background=random`,
            rating: r.rating,
            date: new Date(r.createdat).toLocaleDateString(), // Format date
            text: r.comment
          })) || [],

          // Map Price Data (For BookingCard)
          price: data.pricingdetails?.monthlyrent, // Raw number for calculations
          displayPrice: data.monthlyrent, // Formatted string "₱8000/month"
          securityDeposit: data.pricingdetails?.securitydeposit,
          applicationFee: data.pricingdetails?.appfee,

          // Map Location Details
          // Note: Backend JSON provided shows address/city but missing lat/lng. 
          // Defaulting to Manila coordinates if missing.
          mapLocation: {
            address: `${data.locationdetails?.address}, ${data.locationdetails?.barangay}`,
            lat: data.locationdetails?.latitude || 14.5995,
            lng: data.locationdetails?.longitude || 120.9842
          }
        }

        setListing(mappedListing)
      } catch (err) {
        console.error("Failed to fetch listing:", err)
        setError("Failed to load listing details.")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchListing()
    }
  }, [id])

  // --- Render Loading State ---
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-500">Loading...</div>
      </div>
    )
  }

  // --- Render Error/Not Found State ---
  if (error || !listing) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{error || "Listing not found"}</h1>
          <Link to="/tenant/listings" className="text-orange-600 hover:underline">
            Back to Listings
          </Link>
        </div>
      </div>
    )
  }

  // --- Render Main Content ---
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-8">
        {/* Back Button */}
        <Link
          to="/tenant/listings"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 cursor-pointer"
        >
          <i className="fa-solid fa-arrow-left mr-2"></i>
          Back to Listings
        </Link>

        {/* Photo Gallery */}
        <PhotoGallery images={listing.images} title={listing.title} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Info */}
            <div>
              <div className="mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{listing.title}</h1>
              </div>

              <div className="flex items-center gap-4 text-gray-600 mb-4">
                <span className="flex items-center">
                  <i className="fa-solid fa-home mr-2 text-gray-400"></i>
                  {listing.roomType}
                </span>
                <span className="flex items-center">
                  <i className="fa-solid fa-location-dot mr-2 text-gray-400"></i>
                  {listing.location}
                </span>
                <span className="flex items-center">
                  <i className="fa-solid fa-star text-yellow-500 mr-1"></i>
                  {listing.rating ? listing.rating : "New"}
                  {listing.reviewCount > 0 && ` (${listing.reviewCount} reviews)`}
                </span>
              </div>

              {/* Note: Bedrooms/Bathrooms data is missing from current API response. Hidden for now. */}
            </div>

            <hr className="border-gray-200" />

            {/* Host Info */}
            {listing.host && (
              <div className="flex items-start gap-4">
                <img
                  src={listing.host.avatar}
                  alt={listing.host.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">Hosted by {listing.host.name}</h3>
                  {/* Years hosting missing from API */}
                  <p className="text-sm text-gray-600 mb-3">Verified Landlord</p>

                  <div className="flex gap-4 text-sm">
                    {listing.host.phone && (
                      <a href={`tel:${listing.host.phone}`} className="text-orange-600 hover:underline flex items-center">
                        <i className="fa-solid fa-phone mr-2"></i>
                        {listing.host.phone}
                      </a>
                    )}
                    {listing.host.email && (
                      <a href={`mailto:${listing.host.email}`} className="text-orange-600 hover:underline flex items-center">
                        <i className="fa-solid fa-envelope mr-2"></i>
                        {listing.host.email}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}

            <hr className="border-gray-200" />

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this place</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {listing.description}
              </p>
            </div>

            <hr className="border-gray-200" />

            {/* What's Included */}
            {listing.inclusions && listing.inclusions.length > 0 && (
              <>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">What's Included</h2>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                    <ul className="space-y-3">
                      {listing.inclusions.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-700">
                          <i className="fa-solid fa-circle-check text-orange-500 mt-1"></i>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <hr className="border-gray-200" />
              </>
            )}

            {/* Amenities */}
            {listing.amenities && listing.amenities.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {listing.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3 text-gray-700">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#DD4912] to-[#FFA500] flex items-center justify-center flex-shrink-0">
                        <i className="fa-solid fa-check text-white text-xs"></i>
                      </div>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <hr className="border-gray-200" />

            {/* Reviews Section - Passing mapped listing object */}
            <ReviewsSection listing={listing} />

            <hr className="border-gray-200" />

            {/* Location Map */}
            <LocationMap mapLocation={listing.mapLocation} title={listing.title} />
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <BookingInfoCard listing={listing} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingDetail