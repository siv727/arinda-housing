import { Link } from 'react-router-dom' // Changed from 'a' tag to Link for faster navigation

const ListingCard = ({ listing }) => {
  // 1. SAFE IMAGE HANDLING
  // Check for 'image' (API) first, then fallback to 'images' array (Mock data), then placeholder
  const imageUrl = listing.image ||
    (listing.images && listing.images.length > 0 ? listing.images[0] : "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267");

  // 2. SAFE PRICE HANDLING
  // If API gives "₱8000/month", we use that. Otherwise fallback to old "$" format
  const priceDisplay = listing.displayPrice
    ? listing.displayPrice.split('/')[0] // Extracts "₱8000" from "₱8000/month"
    : `$${listing.price}`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={listing.title}
          className="w-full h-full object-cover hover:scale-115 transition-scale duration-500"
        />

        {/* Property Type Label */}
        <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded">
          {listing.roomType || listing.propertyType || "Property"}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col justify-between">
        <div>
          {/* Title and Rating */}
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg text-gray-800 flex-1 pr-2 truncate">
              {listing.title}
            </h3>
            {/* Only show rating if there are reviews */}
            {listing.reviewCount > 0 && (
              <div className="flex items-center gap-1 text-sm whitespace-nowrap">
                <i className="fa-solid fa-star text-[#FFA500]"></i>
                <span className="font-semibold">{listing.rating?.toFixed(1) || listing.rating}</span>
                <span className="text-gray-500">({listing.reviewCount})</span>
              </div>
            )}
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <i className="fa-solid fa-location-dot"></i>
            <span className="truncate">{listing.location}</span>
            {/* Only show distance if it exists in data */}
            {listing.distance && (
              <span className="text-[#DD4912]">• {listing.distance}</span>
            )}
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2 mb-4 items-center">
            {listing.amenities && listing.amenities.slice(0, 3).map((amenity, index) => (
              <span
                key={index}
                className="text-xs bg-orange-50 text-[#DD4912] px-2 py-1 rounded"
              >
                {amenity}
              </span>
            ))}
            {listing.amenities && listing.amenities.length > 3 && (
              <span className="text-xs text-gray-500">+{listing.amenities.length - 3} more</span>
            )}
          </div>
        </div>

        <div>
          {/* Price and Button */}
          <div className="flex justify-between items-center pt-3 border-t border-gray-200">
            <div>
              <span className="text-2xl font-bold text-gray-800">{priceDisplay}</span>
              <span className="text-sm text-gray-500">/month</span>

              {/* Only show date if available */}
              {listing.availableDate && (
                <div className="text-xs text-gray-500 mt-1">Available {listing.availableDate}</div>
              )}
            </div>

            {/* Use Link instead of 'a' tag to prevent page reload */}
            <Link
              to={`/tenant/listings/${listing.id}`}
              className="bg-gradient-to-r from-[#DD4912] to-[#FFA500] text-white px-4 py-2 rounded text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingCard