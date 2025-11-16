const FiltersSidebar = ({ filters, onFilterChange, onClearAll }) => {
  const handlePriceChange = (priceRange) => {
    onFilterChange('priceRange', priceRange)
  }

  const handlePropertyTypeChange = (propertyType) => {
    const currentPropertyTypes = filters.propertyTypes || []
    const updatedPropertyTypes = currentPropertyTypes.includes(propertyType)
      ? currentPropertyTypes.filter(type => type !== propertyType)
      : [...currentPropertyTypes, propertyType]
    onFilterChange('propertyTypes', updatedPropertyTypes)
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

  const handleInclusionChange = (inclusion) => {
    const currentInclusions = filters.inclusions || []
    const updatedInclusions = currentInclusions.includes(inclusion)
      ? currentInclusions.filter(i => i !== inclusion)
      : [...currentInclusions, inclusion]
    onFilterChange('inclusions', updatedInclusions)
  }

  const handleNeighborhoodChange = (neighborhood) => {
    const currentNeighborhood = filters.neighborhood || []
    const updatedNeighborhood = currentNeighborhood.includes(neighborhood)
      ? currentNeighborhood.filter(n => n !== neighborhood)
      : [...currentNeighborhood, neighborhood]
    onFilterChange('neighborhood', updatedNeighborhood)
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

      {/* Property Type */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-3">Property Type</h3>
        <div className="space-y-2">
          {['Apartment', 'Boarding House', 'Condominium', 'Dormitory'].map((propertyType) => (
            <label key={propertyType} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.propertyTypes?.includes(propertyType)}
                onChange={() => handlePropertyTypeChange(propertyType)}
                className="w-4 h-4 text-[#DD4912] border-gray-300 rounded focus:ring-[#DD4912]"
              />
              <span className="text-sm text-gray-600">{propertyType}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Room Type */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-3">Room Type</h3>
        <div className="space-y-2">
          {['Studio / Studio Apartment', 'Private Room', 'Shared Room', 'Shared Dorm', '1-Bedroom', '2-Bedroom'].map((roomType) => (
            <label key={roomType} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.roomTypes?.includes(roomType)}
                onChange={() => handleRoomTypeChange(roomType)}
                className="w-4 h-4 text-[#DD4912] border-gray-300 rounded focus:ring-[#DD4912]"
              />
              <span className="text-sm text-gray-600">{roomType}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-3">Amenities</h3>
        <div className="space-y-2">
          {[
            'Air Conditioning',
            'Fully Furnished',
            'Gym',
            'Kitchen',
            'Laundry / Laundry Area',
            'Parking / Parking Space',
            'Pet Friendly',
            'Security',
            'Study Area',
            'Swimming Pool'
          ].map((amenity) => (
            <label key={amenity} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.amenities?.includes(amenity)}
                onChange={() => handleAmenityChange(amenity)}
                className="w-4 h-4 text-[#DD4912] border-gray-300 rounded focus:ring-[#DD4912]"
              />
              <span className="text-sm text-gray-600">{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Inclusions */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-3">What's Included</h3>
        <div className="space-y-2">
          {[
            'Cable TV',
            'Electricity',
            'Gas',
            'Trash Collection',
            'Water',
            'Wi-Fi / Internet'
          ].map((inclusion) => (
            <label key={inclusion} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.inclusions?.includes(inclusion)}
                onChange={() => handleInclusionChange(inclusion)}
                className="w-4 h-4 text-[#DD4912] border-gray-300 rounded focus:ring-[#DD4912]"
              />
              <span className="text-sm text-gray-600">{inclusion}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Neighborhood */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-3">Neighborhood</h3>
        <div className="space-y-2">
          {[
            'Carenderia',
            'Convenience Store',
            'Pharmacy',
            'Hospital',
            'Terminal',
            'Bus Stop',
            'Market',
            'Mall',
            'School',
            'Church',
            'Bank',
            'ATM',
            'Gas Station',
            'Park',
            'Gym'
          ].map((neighborhood) => (
            <label key={neighborhood} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.neighborhood?.includes(neighborhood)}
                onChange={() => handleNeighborhoodChange(neighborhood)}
                className="w-4 h-4 text-[#DD4912] border-gray-300 rounded focus:ring-[#DD4912]"
              />
              <span className="text-sm text-gray-600">{neighborhood}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FiltersSidebar
