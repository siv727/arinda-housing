import { useState } from 'react'

const ListingSummaryCard = ({ listing, leaseTerm }) => {
  const [showAllAmenities, setShowAllAmenities] = useState(false)
  
  // Handle different image formats (array or single)
  const imageUrl = listing?.images?.[0] || listing?.image || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'
  
  // Amenities to display
  const amenities = listing?.amenities || []
  const displayedAmenities = showAllAmenities ? amenities : amenities.slice(0, 4)
  const hasMoreAmenities = amenities.length > 4
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden sticky top-24">
      {/* Property Image */}
      <div className="relative h-48">
        <img
          src={imageUrl}
          alt={listing.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Type Badge */}
        {listing.roomType && (
          <span className="inline-block bg-orange-100 text-orange-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            {listing.roomType}
          </span>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">{listing.title}</h3>

        {/* Rating and Location */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          {listing.reviewCount > 0 && (
            <span className="flex items-center">
              <i className="fa-solid fa-star text-yellow-500 mr-1"></i>
              {listing.rating?.toFixed(1) || listing.rating} ({listing.reviewCount})
            </span>
          )}
          {listing.location && (
            <span className="flex items-center">
              <i className="fa-solid fa-location-dot text-orange-500 mr-1"></i>
              <span className="truncate max-w-[150px]">{listing.location}</span>
            </span>
          )}
        </div>

        {/* Amenities - Show all with toggle */}
        {amenities.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {displayedAmenities.map((amenity, index) => (
                <span key={index} className="bg-orange-50 text-orange-700 text-xs px-2 py-1 rounded">
                  {amenity}
                </span>
              ))}
            </div>
            {hasMoreAmenities && (
              <button
                onClick={() => setShowAllAmenities(!showAllAmenities)}
                className="text-orange-600 text-xs font-medium mt-2 hover:underline cursor-pointer"
              >
                {showAllAmenities ? (
                  <>
                    <i className="fa-solid fa-chevron-up mr-1"></i>
                    Show less
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-chevron-down mr-1"></i>
                    Show {amenities.length - 4} more
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {/* Divider */}
        <hr className="border-gray-200 my-4" />

        {/* Price */}
        <div className="mb-4">
          <span className="text-3xl font-bold text-gray-900">₱{listing.price?.toLocaleString()}</span>
          <span className="text-gray-600"> /month</span>
        </div>

        {/* Lease Term - if passed */}
        {leaseTerm && (
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <i className="fa-solid fa-calendar-days text-orange-500"></i>
            <span>Lease Term: <span className="font-semibold text-gray-900">{leaseTerm} months</span></span>
          </div>
        )}

        {/* Cost Breakdown */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <h4 className="font-semibold text-gray-900 mb-3">Cost Summary</h4>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Monthly Rent</span>
            <span className="font-medium text-gray-900">₱{listing.price?.toLocaleString()}</span>
          </div>
          
          {listing.securityDeposit > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Security Deposit</span>
              <span className="font-medium text-gray-900">₱{listing.securityDeposit?.toLocaleString()}</span>
            </div>
          )}
          
          {listing.applicationFee > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Application Fee</span>
              <span className="font-medium text-gray-900">₱{listing.applicationFee?.toLocaleString()}</span>
            </div>
          )}
          
          <hr className="border-gray-200 my-2" />
          
          <div className="flex justify-between">
            <span className="font-bold text-gray-900">Total Move-in</span>
            <span className="font-bold text-orange-600">
              ₱{((listing.price || 0) + (listing.securityDeposit || 0) + (listing.applicationFee || 0)).toLocaleString()}
            </span>
          </div>
        </div>

        {/* What's Included */}
        {listing.inclusions && listing.inclusions.length > 0 && (
          <div className="mt-4 bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
            <ul className="space-y-2">
              {listing.inclusions.map((item, index) => (
                <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                  <i className="fa-solid fa-circle-check text-orange-500 mt-0.5 text-xs"></i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default ListingSummaryCard