import { useState } from 'react'
import Navbar from '../../components/tenant/Navbar'
import FiltersSidebar from '../../components/tenant/FiltersSidebar'
import ListingCard from '../../components/tenant/ListingCard'
import { mockListings } from '../../data/mockListings'

const Listings = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('recommended')
  const [filters, setFilters] = useState({
    priceRange: 'all',
    roomTypes: [],
    amenities: []
  })
  const [filteredListings, setFilteredListings] = useState(mockListings)

  const handleFilterChange = (filterType, value) => {
    const updatedFilters = { ...filters, [filterType]: value }
    setFilters(updatedFilters)
    applyFilters(searchQuery, sortBy, updatedFilters)
  }

  const handleClearFilters = () => {
    const clearedFilters = {
      priceRange: 'all',
      roomTypes: [],
      amenities: []
    }
    setFilters(clearedFilters)
    applyFilters(searchQuery, sortBy, clearedFilters)
  }

  const handleSearch = () => {
    applyFilters(searchQuery, sortBy, filters)
  }

  const handleSortChange = (e) => {
    const newSortBy = e.target.value
    setSortBy(newSortBy)
    applyFilters(searchQuery, newSortBy, filters)
  }

  const applyFilters = (search, sort, currentFilters) => {
    let results = [...mockListings]

    // Search filter
    if (search.trim()) {
      results = results.filter(listing =>
        listing.title.toLowerCase().includes(search.toLowerCase()) ||
        listing.location.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Price range filter
    if (currentFilters.priceRange !== 'all') {
      results = results.filter(listing => {
        if (currentFilters.priceRange === 'under500') return listing.price < 500
        if (currentFilters.priceRange === '500-800') return listing.price >= 500 && listing.price <= 800
        if (currentFilters.priceRange === 'over800') return listing.price > 800
        return true
      })
    }

    // Room type filter
    if (currentFilters.roomTypes.length > 0) {
      results = results.filter(listing =>
        currentFilters.roomTypes.includes(listing.roomType)
      )
    }

    // Amenities filter
    if (currentFilters.amenities.length > 0) {
      results = results.filter(listing =>
        currentFilters.amenities.every(amenity =>
          listing.amenities.includes(amenity)
        )
      )
    }

    // Sorting
    if (sort === 'price-low') {
      results.sort((a, b) => a.price - b.price)
    } else if (sort === 'price-high') {
      results.sort((a, b) => b.price - a.price)
    } else if (sort === 'rating') {
      results.sort((a, b) => b.rating - a.rating)
    }

    setFilteredListings(results)
  }

  const handleFavoriteToggle = (listingId, isFavorite) => {
    console.log(`Listing ${listingId} favorite status: ${isFavorite}`)
    // TODO: Implement favorite persistence when backend is ready
  }

  return (
    <div className="min-h-screen bg-gradient-to-bl from-[#FFF1EB] to-[#FFFDFA]">
      <Navbar />
      
      {/* Main Container */}
      <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-[1900px] mx-auto">
        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Search Location</h3>
          <div className="flex gap-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search by location or property name..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F35E27] focus:border-transparent"
            />
            <button
              onClick={handleSearch}
              className="bg-gradient-to-r from-[#DD4912] to-[#FFA500] text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity cursor-pointer"
            >
              Search
            </button>
          </div>
        </div>

        {/* Content Layout */}
        <div className="flex gap-6">
          {/* Left Sidebar - Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <FiltersSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearAll={handleClearFilters}
            />
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Header with title and sort */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Student Housing</h1>
                <p className="text-gray-600 text-sm mt-1">
                  {filteredListings.length} {filteredListings.length === 1 ? 'property' : 'properties'} available
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={handleSortChange}
                    className="pl-4 pr-8 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F35E27] cursor-pointer appearance-none ..."
                  >
                    <option value="recommended">Recommended</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                  <i className="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-800 text-xs"></i>
                </div>
              </div>
            </div>

            {/* Listings Grid */}
            {filteredListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                {filteredListings.map(listing => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    onFavoriteToggle={handleFavoriteToggle}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <i className="fa-regular fa-house-circle-xmark text-6xl text-gray-300 mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No listings found</h3>
                <p className="text-gray-500">Try adjusting your filters or search query</p>
                <button
                  onClick={handleClearFilters}
                  className="mt-4 text-[#DD4912] hover:underline cursor-pointer"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Listings
