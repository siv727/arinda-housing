const ListingSummaryCard = ({ listing }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mt-4">
      {/* Property Image */}
      <div className="relative h-48">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="w-full h-full object-cover"
        />
        
        {/* Verified Badge */}
        {listing.verified && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-[#DD4912] to-[#FFA500] text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
            <i className="fa-solid fa-check-circle"></i>
            <span>Verified</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Type Badge */}
        <span className="inline-block bg-orange-100 text-orange-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
          {listing.roomType}
        </span>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">{listing.title}</h3>

        {/* Rating and Location */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <span className="flex items-center">
            <i className="fa-solid fa-star text-yellow-500 mr-1"></i>
            {listing.rating} ({listing.reviewCount})
          </span>
          <span className="flex items-center">
            <i className="fa-solid fa-location-dot text-orange-500 mr-1"></i>
            {listing.distance}
          </span>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {listing.amenities.slice(0, 3).map((amenity, index) => (
            <span key={index} className="bg-orange-50 text-orange-700 text-xs px-2 py-1 rounded">
              {amenity}
            </span>
          ))}
          {listing.amenities.length > 3 && (
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
              +{listing.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* Divider */}
        <hr className="border-gray-200 my-4" />

        {/* Price */}
        <div className="mb-4">
          <span className="text-3xl font-bold text-gray-900">₱{listing.price.toLocaleString()}</span>
          <span className="text-gray-600"> /month</span>
        </div>

        {/* Availability */}
        {listing.availableDate && (
          <p className="text-sm text-gray-600 mb-4">
            Available {listing.availableDate}
          </p>
        )}

        {/* What's Included */}
        {listing.inclusions && listing.inclusions.length > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
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
