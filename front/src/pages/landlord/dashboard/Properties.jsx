import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PropertyGrid from '@/components/properties/PropertyGrid'
import PropertyTable from '@/components/properties/PropertyTable'
import PropertyDialog from '@/components/properties/PropertySheet'
import PropertyFilters from '@/components/properties/PropertyFilters'
import { useNavigate } from 'react-router-dom'
import { getMyListings, getListingDetails } from '../../../api/landlordListingApi'

export default function Properties() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState("Latest");
  const [isGridView, setIsGridView] = useState(true)
  const [isFading, setIsFading] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const [statusFilter, setStatusFilter] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  // 1. Fetch Listings on Mount
  const fetchProperties = async () => {
    try {
      setLoading(true)
      const response = await getMyListings()
      const data = response.data

      // Map backend data to frontend model
      const mappedData = data.map(item => ({
        id: item.id,
        image: item.mainphotourl || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800", // Fallback image
        title: item.title,
        location: item.location,
        type: item.propertytype,
        price: item.monthlyrent, // "₱8000/month"
        status: item.status || "Available", // Default to Available if missing in list view
        // Fields for sorting/filtering locally if needed
        rawPrice: parseInt(item.monthlyrent.replace(/[^0-9]/g, ''), 10) || 0
      }))

      setProperties(mappedData)
    } catch (error) {
      console.error("Failed to fetch properties:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  const handleToggleView = (targetIsGrid) => {
    if (targetIsGrid === isGridView) return
    setIsFading(true)
    window.setTimeout(() => {
      setIsGridView(targetIsGrid)
      setIsFading(false)
    }, 200)
  }

  // 2. Fetch Details on Click
  const handlePropertyClick = async (propertySummary) => {
    try {
      // Optimistically set what we have
      setSelectedProperty(propertySummary)
      setDialogOpen(true)

      // Fetch full details (reviews, etc.)
      const response = await getListingDetails(propertySummary.id)
      const detailData = response.data

      // Merge details with summary
      setSelectedProperty(prev => ({
        ...prev,
        // Map extra fields from detail endpoint
        reviews: detailData.reviewdetails?.map(r => ({
          id: r.id,
          name: r.reviewername,
          avatar: "https://i.pravatar.cc/150?u=" + r.reviewername,
          rating: r.rating,
          comment: r.comment,
          date: new Date(r.createdat).toLocaleDateString()
        })) || [],
        status: detailData.status // Ensure status is up to date
      }))

    } catch (error) {
      console.error("Failed to fetch property details:", error)
    }
  }

  // 3. Handle Delete
  const handleListingDeleted = (deletedId) => {
    // API call was already handled by PropertySheet, we just update UI
    setProperties(prev => prev.filter(p => p.id !== deletedId))
    setDialogOpen(false)
    console.log('Property removed from view:', deletedId)
  }

  return (
    <div className="py-6 2xl:p-6 space-y-6">
      {/* Header section */}
      <div className="flex items-center justify-between">
        <div className="space-y-4">
          <h1 className="text-[32px] font-bold">Properties Management</h1>
          <p className="text-gray-600">
            Manage all your rental properties in one place.
          </p>
        </div>

        {/* Add Property + View Toggle */}
        <div className="flex flex-row items-center justify-center gap-2 ">
          <button
            onClick={() => handleToggleView(!isGridView)}
            aria-pressed={isGridView}
            className="bg-[#FFF8F2] text-[#F35E27] w-10 h-10 p-3 flex items-center justify-center rounded-full font-semibold hover:bg-orange-100 active:scale-90 transition-transform duration-150 ease-in-out"
            title={isGridView ? 'Switch to table view' : 'Switch to grid view'}
          >
            <i className={`${isGridView ? 'fa-solid fa-table' : 'fa-regular fa-grid-2'} text-lg transition-all duration-200`}></i>
          </button>

          {/* Add property button */}
          <button onClick={() => navigate('/landlord/dashboard/properties/add')} className="bg-[#FFF8F2] text-[#F35E27] w-10 h-10 p-3 flex items-center justify-center rounded-full font-semibold hover:bg-orange-100 active:scale-90 transition-transform duration-150 ease-in-out">
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
      {/* Search and Filters */}
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex space-x-2">
          <div className="relative flex-grow">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              name="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search rental properties"
              className="w-full border rounded-lg border-[#EAD1C7] bg-white pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowFilters((s) => !s)}
            className="bg-orange-500 cursor-pointer font-medium text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition flex items-center"
          >
            <i className="fa-regular fa-filter pr-2"></i>Filters
          </button>
        </div>
      </form>

      {showFilters && (
        <PropertyFilters status={statusFilter} setStatus={setStatusFilter} onClose={() => setShowFilters(false)} />
      )}

      {/* Properties Section (with fade animation on toggle) */}
      <div className={`transition-all duration-200 ${isFading ? 'opacity-0 ' : 'opacity-100'}`}>
        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading properties...</div>
        ) : (
          (() => {
            const q = searchTerm.trim().toLowerCase()
            const filtered = properties.filter((p) => {
              const matchesSearch = q === '' || `${p.title} ${p.location} ${p.type}`.toLowerCase().includes(q)
              // Note: Backend 'status' might be uppercase 'AVAILABLE', map if needed
              const matchesStatus = statusFilter === 'All' || p.status.toUpperCase() === statusFilter.toUpperCase()
              return matchesSearch && matchesStatus
            })
            return isGridView ? (
              <PropertyGrid properties={filtered} onCardClick={handlePropertyClick} />
            ) : (
              <div className="mt-2">
                <PropertyTable properties={filtered} onRowClick={handlePropertyClick} />
              </div>
            )
          })()
        )}

        <PropertyDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          property={selectedProperty}
          onEdit={(p) => navigate('/landlord/dashboard/properties/edit')}
          onRemoveSuccess={handleListingDeleted}
        />
      </div>
    </div>
  );
}