import { useState } from 'react'

const FiltersSidebar = ({ filters, onFilterChange, onClearAll }) => {
  // Collapsible sections state
  const [expandedSections, setExpandedSections] = useState({
    priceRange: true,
    propertyType: true,
    roomType: true,
    amenities: false,
    inclusions: false,
    neighborhood: false
  })

  // Show more state for sections with many items
  const [showMore, setShowMore] = useState({
    roomType: false,
    amenities: false,
    inclusions: false,
    neighborhood: false
  })

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const toggleShowMore = (section) => {
    setShowMore(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

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
        <button
          onClick={() => toggleSection('priceRange')}
          className="w-full flex justify-between items-center mb-3 cursor-pointer hover:text-[#DD4912] transition-colors"
        >
          <h3 className="font-semibold text-gray-700">Price Range</h3>
          <i className={`fa-solid fa-chevron-${expandedSections.priceRange ? 'up' : 'down'} text-sm text-gray-500`}></i>
        </button>
        {expandedSections.priceRange && (
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
        )}
      </div>

      {/* Property Type */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('propertyType')}
          className="w-full flex justify-between items-center mb-3 cursor-pointer hover:text-[#DD4912] transition-colors"
        >
          <h3 className="font-semibold text-gray-700">Property Type</h3>
          <i className={`fa-solid fa-chevron-${expandedSections.propertyType ? 'up' : 'down'} text-sm text-gray-500`}></i>
        </button>
        {expandedSections.propertyType && (
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
        )}
      </div>

      {/* Room Type */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('roomType')}
          className="w-full flex justify-between items-center mb-3 cursor-pointer hover:text-[#DD4912] transition-colors"
        >
          <h3 className="font-semibold text-gray-700">Room Type</h3>
          <i className={`fa-solid fa-chevron-${expandedSections.roomType ? 'up' : 'down'} text-sm text-gray-500`}></i>
        </button>
        {expandedSections.roomType && (
          <>
            <div className="space-y-2">
              {['Studio / Studio Apartment', 'Private Room', 'Shared Room', 'Shared Dorm']
                .concat(showMore.roomType ? ['1-Bedroom', '2-Bedroom'] : [])
                .map((roomType) => (
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
            <button
              onClick={() => toggleShowMore('roomType')}
              className="text-sm text-[#DD4912] hover:underline mt-2 cursor-pointer"
            >
              {showMore.roomType ? 'Show Less' : 'Show More (2)'}
            </button>
          </>
        )}
      </div>

      {/* Amenities */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('amenities')}
          className="w-full flex justify-between items-center mb-3 cursor-pointer hover:text-[#DD4912] transition-colors"
        >
          <h3 className="font-semibold text-gray-700">Amenities</h3>
          <i className={`fa-solid fa-chevron-${expandedSections.amenities ? 'up' : 'down'} text-sm text-gray-500`}></i>
        </button>
        {expandedSections.amenities && (
          <>
            <div className="space-y-2">
              {['Air Conditioning', 'Fully Furnished', 'Gym', 'Kitchen', 'Laundry / Laundry Area']
                .concat(showMore.amenities ? ['Parking / Parking Space', 'Pet Friendly', 'Security', 'Study Area', 'Swimming Pool'] : [])
                .map((amenity) => (
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
            <button
              onClick={() => toggleShowMore('amenities')}
              className="text-sm text-[#DD4912] hover:underline mt-2 cursor-pointer"
            >
              {showMore.amenities ? 'Show Less' : 'Show More (5)'}
            </button>
          </>
        )}
      </div>

      {/* Inclusions */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('inclusions')}
          className="w-full flex justify-between items-center mb-3 cursor-pointer hover:text-[#DD4912] transition-colors"
        >
          <h3 className="font-semibold text-gray-700">What's Included</h3>
          <i className={`fa-solid fa-chevron-${expandedSections.inclusions ? 'up' : 'down'} text-sm text-gray-500`}></i>
        </button>
        {expandedSections.inclusions && (
          <>
            <div className="space-y-2">
              {['Wi-Fi / Internet', 'Electricity', 'Water', 'Gas']
                .concat(showMore.inclusions ? ['Cable TV', 'Trash Collection'] : [])
                .map((inclusion) => (
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
            <button
              onClick={() => toggleShowMore('inclusions')}
              className="text-sm text-[#DD4912] hover:underline mt-2 cursor-pointer"
            >
              {showMore.inclusions ? 'Show Less' : 'Show More (2)'}
            </button>
          </>
        )}
      </div>

      {/* Neighborhood */}
      <div>
        <button
          onClick={() => toggleSection('neighborhood')}
          className="w-full flex justify-between items-center mb-3 cursor-pointer hover:text-[#DD4912] transition-colors"
        >
          <h3 className="font-semibold text-gray-700">Neighborhood</h3>
          <i className={`fa-solid fa-chevron-${expandedSections.neighborhood ? 'up' : 'down'} text-sm text-gray-500`}></i>
        </button>
        {expandedSections.neighborhood && (
          <>
            <div className="space-y-2">
              {['School', 'Convenience Store', 'Carenderia', 'Market', 'Mall', 'Church']
                .concat(showMore.neighborhood ? ['Pharmacy', 'Hospital', 'Terminal', 'Bus Stop', 'Bank', 'ATM', 'Gas Station', 'Park', 'Gym'] : [])
                .map((neighborhood) => (
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
            <button
              onClick={() => toggleShowMore('neighborhood')}
              className="text-sm text-[#DD4912] hover:underline mt-2 cursor-pointer"
            >
              {showMore.neighborhood ? 'Show Less' : 'Show More (9)'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default FiltersSidebar
