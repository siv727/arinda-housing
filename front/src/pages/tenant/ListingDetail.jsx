import { useParams, Link } from 'react-router-dom'
import Navbar from '../../components/tenant/Navbar'
import PhotoGallery from '../../components/tenant/PhotoGallery'
import BookingInfoCard from '../../components/tenant/BookingInfoCard'
import ReviewsSection from '../../components/tenant/ReviewsSection'
import LocationMap from '../../components/tenant/LocationMap'
import { mockListings } from '../../data/mockListings'

const ListingDetail = () => {
  const { id } = useParams()
  const listing = mockListings.find((l) => l.id === parseInt(id))

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Listing not found</h1>
          <Link to="/tenant/listings" className="text-orange-600 hover:underline">
            Back to Listings
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
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
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{listing.title}</h1>
                {listing.verified && (
                  <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-[#DD4912] to-[#FFA500] text-white text-sm font-semibold rounded-full">
                    <i className="fa-solid fa-check-circle mr-2"></i>
                    Verified
                  </span>
                )}
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
                  {listing.rating} ({listing.reviews?.length || listing.reviewCount || 0} reviews)
                </span>
              </div>

              <div className="flex items-center gap-4 text-gray-600">
                <span className="flex items-center">
                  <i className="fa-solid fa-bed mr-2 text-gray-400"></i>
                  {listing.bedrooms} Bedroom{listing.bedrooms > 1 ? 's' : ''}
                </span>
                <span className="flex items-center">
                  <i className="fa-solid fa-bath mr-2 text-gray-400"></i>
                  {listing.bathrooms} Bathroom{listing.bathrooms > 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {/* Divider */}
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
                  <p className="text-sm text-gray-600 mb-3">
                    {listing.host.yearsHosting} year{listing.host.yearsHosting > 1 ? 's' : ''} hosting
                  </p>
                  <div className="flex gap-4 text-sm">
                    <a href={`tel:${listing.host.phone}`} className="text-orange-600 hover:underline flex items-center">
                      <i className="fa-solid fa-phone mr-2"></i>
                      {listing.host.phone}
                    </a>
                    <a href={`mailto:${listing.host.email}`} className="text-orange-600 hover:underline flex items-center">
                      <i className="fa-solid fa-envelope mr-2"></i>
                      {listing.host.email}
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Divider */}
            <hr className="border-gray-200" />

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this place</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {listing.description}
              </p>
            </div>

            {/* Divider */}
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

                {/* Divider */}
                <hr className="border-gray-200" />
              </>
            )}

            {/* Amenities */}
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

            {/* Divider */}
            <hr className="border-gray-200" />

            {/* Reviews Section */}
            <ReviewsSection listing={listing} />

            {/* Divider */}
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
