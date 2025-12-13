import { useState } from 'react'

const ListingSummaryCard = ({ 
  listing, 
  moveInDate,
  leaseTerm,
  onMoveInDateChange,
  onLeaseTermChange 
}) => {
  const [showAllAmenities, setShowAllAmenities] = useState(false)
  
  // Handle different image formats (array or single)
  const imageUrl = listing?.images?.[0] || listing?.image || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'
  
  // Amenities to display
  const amenities = listing?.amenities || []
  const displayedAmenities = showAllAmenities ? amenities : amenities.slice(0, 4)
  const hasMoreAmenities = amenities.length > 4

  // Parse lease terms from listing or use defaults
  const leaseTermOptions = listing?.leaseterms && listing.leaseterms.length > 0
    ? listing.leaseterms.map(term => {
        const months = parseInt(term) || term
        return { value: String(months).replace(' months', ''), label: term }
      })
    : [
        { value: '6', label: '6 months' },
        { value: '12', label: '12 months' }
      ]

  // Inclusions
  const inclusions = listing?.inclusions || []
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mt-4 sticky top-24">
      {/* Property Image - Full Width */}
      <div className="relative h-50">
        <img
          src={imageUrl}
          alt={listing.title}
          className="w-full h-full object-cover"
        />
        {/* Type Badge overlaid on image */}
        {listing.roomType && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-orange-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
            {listing.roomType}
          </span>
        )}
      </div>

      {/* Card Content - 2 Column Layout */}
      <div className="p-5">
        {/* Row 1: Property Info + What's Included */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Column 1: Property Details */}
          <div>
            {/* Title */}
            <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">{listing.title}</h3>

            {/* Rating and Location */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-3">
              {listing.reviewCount > 0 && (
                <span className="flex items-center">
                  <i className="fa-solid fa-star text-yellow-500 mr-1"></i>
                  {listing.rating?.toFixed(1)} ({listing.reviewCount})
                </span>
              )}
              {listing.location && (
                <span className="flex items-center">
                  <i className="fa-solid fa-location-dot text-orange-500 mr-1"></i>
                  <span className="line-clamp-1">{listing.location}</span>
                </span>
              )}
            </div>

            {/* Amenities */}
            {amenities.length > 0 && (
              <div>
                <div className="flex flex-wrap gap-1.5">
                  {displayedAmenities.map((amenity, index) => (
                    <span key={index} className="bg-orange-50 text-orange-700 text-xs px-2 py-0.5 rounded">
                      {amenity}
                    </span>
                  ))}
                </div>
                {hasMoreAmenities && (
                  <button
                    onClick={() => setShowAllAmenities(!showAllAmenities)}
                    className="text-orange-600 text-xs font-medium mt-1 hover:underline cursor-pointer"
                  >
                    {showAllAmenities ? 'Show less' : `+${amenities.length - 4} more`}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Column 2: What's Included */}
          {inclusions.length > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
              <h4 className="font-semibold text-gray-900 text-sm mb-2 flex items-center gap-1">
                <i className="fa-solid fa-check-circle text-orange-500"></i>
                What's Included
              </h4>
              <ul className="space-y-1">
                {inclusions.slice(0, 4).map((item, index) => (
                  <li key={index} className="text-xs text-gray-700 flex items-start gap-1.5">
                    <i className="fa-solid fa-circle-check text-orange-500 mt-0.5 text-[10px]"></i>
                    <span className="line-clamp-1">{item}</span>
                  </li>
                ))}
                {inclusions.length > 4 && (
                  <li className="text-xs text-orange-600 font-medium">
                    +{inclusions.length - 4} more included
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Divider */}
        <hr className="border-gray-200 my-6" />

        {/* Row 2: Price/Cost + Booking Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Column 1: Price and Cost Breakdown */}
          <div>
            {/* Price */}
            <div className="mb-3">
              <span className="text-2xl font-bold text-gray-900">₱{listing.price?.toLocaleString()}</span>
              <span className="text-gray-600 text-sm"> /month</span>
            </div>

            {/* Cost Breakdown */}
            <div className="bg-gray-50 rounded-lg p-3 space-y-1.5">
              <h4 className="font-semibold text-gray-900 text-sm mb-2">Cost Summary</h4>
              
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Monthly Rent</span>
                <span className="font-medium text-gray-900">₱{listing.price?.toLocaleString()}</span>
              </div>
              
              {listing.securityDeposit > 0 && (
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Security Deposit</span>
                  <span className="font-medium text-gray-900">₱{listing.securityDeposit?.toLocaleString()}</span>
                </div>
              )}
              
              {listing.applicationFee > 0 && (
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Application Fee</span>
                  <span className="font-medium text-gray-900">₱{listing.applicationFee?.toLocaleString()}</span>
                </div>
              )}
              
              <hr className="border-gray-200 my-1.5" />
              
              <div className="flex justify-between">
                <span className="font-bold text-gray-900 text-sm">Total Move-in</span>
                <span className="font-bold text-orange-600 text-sm">
                  ₱{((listing.price || 0) + (listing.securityDeposit || 0) + (listing.applicationFee || 0)).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Booking Details - EDITABLE */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <h4 className="font-semibold text-gray-900 text-sm mb-3 flex items-center gap-1">
              <i className="fa-solid fa-calendar-check text-orange-500"></i>
              Booking Details
            </h4>
            
            {/* Move-in Date */}
            <div className="mb-3">
              <label htmlFor="summaryMoveInDate" className="block text-xs font-medium text-gray-700 mb-1">
                Move-in Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="summaryMoveInDate"
                value={moveInDate || ''}
                onChange={(e) => onMoveInDateChange?.(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-sm"
              />
            </div>

            {/* Lease Term */}
            <div>
              <label htmlFor="summaryLeaseTerm" className="block text-xs font-medium text-gray-700 mb-1">
                Lease Term <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="summaryLeaseTerm"
                  value={leaseTerm || leaseTermOptions[0]?.value || '12'}
                  onChange={(e) => onLeaseTermChange?.(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent cursor-pointer appearance-none bg-white text-sm"
                >
                  {leaseTermOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-2.5 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                  <i className="fa-solid fa-chevron-down text-xs"></i>
                </div>
              </div>
            </div>

            {/* Refund Note */}
            <p className="text-[10px] text-gray-500 mt-2 flex items-center gap-1">
              <i className="fa-solid fa-info-circle"></i>
              Security deposit is refundable
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingSummaryCard