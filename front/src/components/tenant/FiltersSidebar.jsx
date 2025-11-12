const FiltersSidebar = ({ filters, onFilterChange, onClearAll }) => {
  const handlePriceChange = (priceRange) => {
    onFilterChange('priceRange', priceRange)
  }

  const handleRoomTypeChange = (roomType) => {
    const currentRoomTypes = filters.roomTypes || []
    const updatedRoomTypes = currentRoomTypes.includes(roomType)
      ? currentRoomTypes.filter(type => type !== roomType)
      : [...currentRoomTypes, roomType]
    onFilterChange('roomTypes', updatedRoomTypes)
  }

  const handleAmenityChange = (amenity) => {
    const currentAmenities = filters.amenities || []
    const updatedAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter(a => a !== amenity)
      : [...currentAmenities, amenity]
    onFilterChange('amenities', updatedAmenities)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">Filters</h2>
        <button
          onClick={onClearAll}
          className="text-sm text-[#DD4912] hover:underline cursor-pointer"
        >
          Clear All
        </button>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-3">Price Range</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.priceRange === 'all'}
              onChange={() => handlePriceChange('all')}
              className="w-4 h-4 text-[#DD4912] border-gray-300 rounded focus:ring-[#DD4912]"
            />
            <span className="text-sm text-gray-600">All Prices</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.priceRange === 'under500'}
              onChange={() => handlePriceChange('under500')}
              className="w-4 h-4 text-[#DD4912] border-gray-300 rounded focus:ring-[#DD4912]"
            />
            <span className="text-sm text-gray-600">Under $500</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.priceRange === '500-800'}
              onChange={() => handlePriceChange('500-800')}
              className="w-4 h-4 text-[#DD4912] border-gray-300 rounded focus:ring-[#DD4912]"
            />
            <span className="text-sm text-gray-600">$500 - $800</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.priceRange === 'over800'}
              onChange={() => handlePriceChange('over800')}
              className="w-4 h-4 text-[#DD4912] border-gray-300 rounded focus:ring-[#DD4912]"
            />
            <span className="text-sm text-gray-600">Over $800</span>
          </label>
        </div>
      </div>

      {/* Room Type */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-3">Room Type</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.roomTypes?.includes('Studio Apartment')}
              onChange={() => handleRoomTypeChange('Studio Apartment')}
              className="w-4 h-4 text-[#DD4912] border-gray-300 rounded focus:ring-[#DD4912]"
            />
            <span className="text-sm text-gray-600">Studio Apartment</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.roomTypes?.includes('Private Room')}
              onChange={() => handleRoomTypeChange('Private Room')}
              className="w-4 h-4 text-[#DD4912] border-gray-300 rounded focus:ring-[#DD4912]"
            />
            <span className="text-sm text-gray-600">Private Room</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.roomTypes?.includes('Shared Room')}
              onChange={() => handleRoomTypeChange('Shared Room')}
              className="w-4 h-4 text-[#DD4912] border-gray-300 rounded focus:ring-[#DD4912]"
            />
            <span className="text-sm text-gray-600">Shared Room</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.roomTypes?.includes('Shared Dorm')}
              onChange={() => handleRoomTypeChange('Shared Dorm')}
              className="w-4 h-4 text-[#DD4912] border-gray-300 rounded focus:ring-[#DD4912]"
            />
            <span className="text-sm text-gray-600">Shared Dorm</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.roomTypes?.includes('1-Bedroom')}
              onChange={() => handleRoomTypeChange('1-Bedroom')}
              className="w-4 h-4 text-[#DD4912] border-gray-300 rounded focus:ring-[#DD4912]"
            />
            <span className="text-sm text-gray-600">1-Bedroom</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.roomTypes?.includes('2-Bedroom')}
              onChange={() => handleRoomTypeChange('2-Bedroom')}
              className="w-4 h-4 text-[#DD4912] border-gray-300 rounded focus:ring-[#DD4912]"
            />
            <span className="text-sm text-gray-600">2-Bedroom</span>
          </label>
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-3">Amenities</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.amenities?.includes('WiFi')}
              onChange={() => handleAmenityChange('WiFi')}
              className="w-4 h-4 text-[#DD4912] border-gray-300 rounded focus:ring-[#DD4912]"
            />
            <span className="text-sm text-gray-600">WiFi</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.amenities?.includes('Kitchen')}
              onChange={() => handleAmenityChange('Kitchen')}
              className="w-4 h-4 text-[#DD4912] border-gray-300 rounded focus:ring-[#DD4912]"
            />
            <span className="text-sm text-gray-600">Kitchen</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.amenities?.includes('Laundry')}
              onChange={() => handleAmenityChange('Laundry')}
              className="w-4 h-4 text-[#DD4912] border-gray-300 rounded focus:ring-[#DD4912]"
            />
            <span className="text-sm text-gray-600">Laundry</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.amenities?.includes('Study Area')}
              onChange={() => handleAmenityChange('Study Area')}
              className="w-4 h-4 text-[#DD4912] border-gray-300 rounded focus:ring-[#DD4912]"
            />
            <span className="text-sm text-gray-600">Study Area</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.amenities?.includes('Parking')}
              onChange={() => handleAmenityChange('Parking')}
              className="w-4 h-4 text-[#DD4912] border-gray-300 rounded focus:ring-[#DD4912]"
            />
            <span className="text-sm text-gray-600">Parking</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.amenities?.includes('Gym')}
              onChange={() => handleAmenityChange('Gym')}
              className="w-4 h-4 text-[#DD4912] border-gray-300 rounded focus:ring-[#DD4912]"
            />
            <span className="text-sm text-gray-600">Gym</span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default FiltersSidebar
