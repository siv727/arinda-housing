import { useState } from 'react'

const ListingCard = ({ listing, onFavoriteToggle }) => {
  const [isFavorite, setIsFavorite] = useState(false)

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite)
    if (onFavoriteToggle) {
      onFavoriteToggle(listing.id, !isFavorite)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
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
        
        {/* Heart Icon */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 bg-white w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <i className={`fa-${isFavorite ? 'solid' : 'regular'} fa-heart text-${isFavorite ? '[#DD4912]' : 'gray-600'}`}></i>
        </button>

        {/* Property Type Label */}
        <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded">
          {listing.type}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title and Rating */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-gray-800 flex-1 pr-2">
            {listing.title}
          </h3>
          <div className="flex items-center gap-1 text-sm whitespace-nowrap">
            <i className="fa-solid fa-star text-[#FFA500]"></i>
            <span className="font-semibold">{listing.rating}</span>
            <span className="text-gray-500">({listing.reviewCount})</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <i className="fa-solid fa-location-dot"></i>
          <span>{listing.location}</span>
          <span className="text-[#DD4912]">• {listing.distance}</span>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {listing.amenities.slice(0, 3).map((amenity, index) => (
            <span
              key={index}
              className="text-xs bg-orange-50 text-[#DD4912] px-2 py-1 rounded"
            >
              {amenity}
            </span>
          ))}
          {listing.amenities.length > 3 && (
            <span className="text-xs text-gray-500">+{listing.amenities.length - 3} more</span>
          )}
        </div>

        {/* Price and Button */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
          <div>
            <span className="text-2xl font-bold text-gray-800">${listing.price}</span>
            <span className="text-sm text-gray-500">/month</span>
            <div className="text-xs text-gray-500 mt-1">Available {listing.availableDate}</div>
          </div>
          <a
            href={`/tenant/listings/${listing.id}`}
            className="bg-gradient-to-r from-[#DD4912] to-[#FFA500] text-white px-4 py-2 rounded text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
          >
            View Details
          </a>
        </div>
      </div>
    </div>
  )
}

export default ListingCard
