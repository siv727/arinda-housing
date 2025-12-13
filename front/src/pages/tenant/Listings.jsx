import { useState, useEffect } from 'react'
import Navbar from '../../components/tenant/Navbar'
import FiltersSidebar from '../../components/tenant/FiltersSidebar'
import ListingCard from '../../components/tenant/ListingCard'
import { getAllListings } from '../../api/listingApi' // Import API

const Listings = () => {
  // State for data
  const [listings, setListings] = useState([]) // Raw data from API
  const [filteredListings, setFilteredListings] = useState([]) // Data shown to user
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Filter States
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('recent')
  const [filters, setFilters] = useState({
    priceRange: 'all',
    propertyTypes: [],
    roomTypes: [],
    amenities: [],
    inclusions: [],
    neighborhood: []
  })

  // --- 1. Fetch Data on Mount ---
  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true)
        const response = await getAllListings()
        const data = response.data

        // MAP BACKEND DATA TO FRONTEND STRUCTURE
        const mappedData = data.map(item => {
          // Parse price string "₱8000/month" -> 8000 (Number)
          const numericPrice = parseInt(item.monthlyrent.replace(/[^0-9]/g, ''), 10) || 0;

          return {
            id: item.id,
            title: item.title,
            location: item.location,
            // Use the first image or a placeholder
            image: item.mainphotourl || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",

            // Convert Price for Sorting/Filtering
            price: numericPrice,
            displayPrice: item.monthlyrent,

            // Ratings
            rating: item.averagerating || 0,
            reviewCount: item.reviewcount || 0,

            // Arrays
            amenities: item.amenities || [],
            leaseterms: item.leaseterms || [],

            // MISSING FIELDS NOTE: 
            // Your API JSON doesn't currently return propertyType or roomType.
            // You should update your Java DTO to include them. 
            // For now, we default them so filters don't crash.
            propertyType: item.propertytype || "Apartment",
            roomType: item.roomtype || "Private Room",
            inclusions: item.inclusions || [],
            neighborhood: [] // Backend doesn't seem to have this yet
          }
        })

        setListings(mappedData)
        setFilteredListings(mappedData)
      } catch (err) {
        console.error("Failed to fetch listings:", err)
        setError("Unable to load listings. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchListings()
  }, [])

  // --- 2. Filter Logic (Triggered when filters/search/sort change) ---
  useEffect(() => {
    if (listings.length > 0) {
      applyFilters(searchQuery, sortBy, filters)
    }
  }, [filters, searchQuery, sortBy, listings])

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }))
  }

  const handleClearFilters = () => {
    setFilters({
      priceRange: 'all',
      propertyTypes: [],
      roomTypes: [],
      amenities: [],
      inclusions: [],
      neighborhood: []
    })
    setSearchQuery('')
    setSortBy('recent')
  }

  const applyFilters = (search, sort, currentFilters) => {
    let results = [...listings]

    // Search filter
    if (search.trim()) {
      const query = search.toLowerCase()
      results = results.filter(listing =>
        listing.title.toLowerCase().includes(query) ||
        listing.location.toLowerCase().includes(query)
      )
    }

    // Price range filter
    if (currentFilters.priceRange !== 'all') {
      results = results.filter(listing => {
        if (currentFilters.priceRange === 'under500') return listing.price < 5000 // Adjusted for Peso context?
        if (currentFilters.priceRange === '500-800') return listing.price >= 5000 && listing.price <= 8000
        if (currentFilters.priceRange === 'over800') return listing.price > 8000
        return true
      })
    }

    // Property type filter
    if (currentFilters.propertyTypes.length > 0) {
      results = results.filter(listing =>
        currentFilters.propertyTypes.includes(listing.propertyType)
      )
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
              placeholder="Search by location or property name..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F35E27]"
            />
            <button
              onClick={() => applyFilters(searchQuery, sortBy, filters)}
              className="bg-gradient-to-r from-[#DD4912] to-[#FFA500] text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
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
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Student Housing</h1>
                <p className="text-gray-600 text-sm mt-1">
                  {loading ? 'Loading properties...' : `${filteredListings.length} properties available`}
                </p>
              </div>

              {!loading && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent cursor-pointer appearance-none shadow-sm hover:border-gray-300 transition-colors"
                    >
                      <option value="recent">Recent</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                      <i className="fa-solid fa-chevron-down text-xs"></i>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Loading / Error / Grid */}
            {loading ? (
              <div className="text-center py-12">
                <div className="text-orange-600 text-xl font-semibold">Loading listings...</div>
              </div>
            ) : error ? (
              <div className="text-center py-12 text-red-500 font-semibold">{error}</div>
            ) : filteredListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                {filteredListings.map(listing => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
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