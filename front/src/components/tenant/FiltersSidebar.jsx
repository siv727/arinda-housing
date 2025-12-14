import { useState } from 'react'

const FiltersSidebar = ({ filters, onFilterChange, onClearAll }) => {
  // Collapsible sections state
  const [expandedSections, setExpandedSections] = useState({
    priceRange: true,
    propertyType: true,
    roomType: true,
    amenities: false
  })

  // Show more state for sections with many items
  const [showMore, setShowMore] = useState({
    roomType: false,
    amenities: false
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
            <span className="text-sm text-gray-600">Under ₱5,000</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.priceRange === '500-800'}
              onChange={() => handlePriceChange('500-800')}
              className="w-4 h-4 text-[#DD4912] border-gray-300 rounded focus:ring-[#DD4912]"
            />
            <span className="text-sm text-gray-600">₱5,000 - ₱8,000</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.priceRange === 'over800'}
              onChange={() => handlePriceChange('over800')}
              className="w-4 h-4 text-[#DD4912] border-gray-300 rounded focus:ring-[#DD4912]"
            />
            <span className="text-sm text-gray-600">Over ₱8,000</span>
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
              {[
                { key: 'Studio', label: 'Studio / Studio Apartment' },
                { key: 'Private Room', label: 'Private Room' },
                { key: 'Shared Room', label: 'Shared Room' },
                { key: 'Shared Dormitory', label: 'Shared Dormitory' }
              ]
                .concat(showMore.roomType ? [
                  { key: '1-Bedroom', label: '1-Bedroom' },
                  { key: '2-Bedroom', label: '2-Bedroom' }
                ] : [])
                .map((roomType) => (
                  <label key={roomType.key} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.roomTypes?.includes(roomType.key)}
                      onChange={() => handleRoomTypeChange(roomType.key)}
                      className="w-4 h-4 text-[#DD4912] border-gray-300 rounded focus:ring-[#DD4912]"
                    />
                    <span className="text-sm text-gray-600">{roomType.label}</span>
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
              {[
                { key: 'Air Conditioning', label: 'Air Conditioning' },
                { key: 'Furniture', label: 'Fully Furnished' },
                { key: 'Gym', label: 'Gym' },
                { key: 'Kitchen', label: 'Kitchen' },
                { key: 'Laundry Area', label: 'Laundry Area' }
              ]
                .concat(showMore.amenities ? [
                  { key: 'Parking Space', label: 'Parking Space' },
                  { key: 'Pet Friendly', label: 'Pet Friendly' },
                  { key: 'Security', label: 'Security' },
                  { key: 'Study Area', label: 'Study Area' },
                  { key: 'Swimming Pool', label: 'Swimming Pool' }
                ] : [])
                .map((amenity) => (
                  <label key={amenity.key} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.amenities?.includes(amenity.key)}
                      onChange={() => handleAmenityChange(amenity.key)}
                      className="w-4 h-4 text-[#DD4912] border-gray-300 rounded focus:ring-[#DD4912]"
                    />
                    <span className="text-sm text-gray-600">{amenity.label}</span>
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
    </div>
  )
}

export default FiltersSidebar
