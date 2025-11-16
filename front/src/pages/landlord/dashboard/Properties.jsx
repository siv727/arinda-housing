import { useState } from "react";
import { properties as mockProperties } from '@/data/mockProperties'
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

export default function Properties() {
  const [properties, setProperties] = useState(mockProperties)
  const [sortBy, setSortBy] = useState("Latest");
  const [isGridView, setIsGridView] = useState(true)
  const [isFading, setIsFading] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const [statusFilter, setStatusFilter] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const handleToggleView = (targetIsGrid) => {
    if (targetIsGrid === isGridView) return
    // start fade-out
    setIsFading(true)
    // after fade-out, switch view and fade-in
    window.setTimeout(() => {
      setIsGridView(targetIsGrid)
      setIsFading(false)
    }, 200)
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
        {(() => {
          const q = searchTerm.trim().toLowerCase()
          const filtered = properties.filter((p) => {
            const matchesSearch = q === '' || `${p.title} ${p.location} ${p.type}`.toLowerCase().includes(q)
            const matchesStatus = statusFilter === 'All' || p.status === statusFilter
            return matchesSearch && matchesStatus
          })
          return isGridView ? (
            <PropertyGrid properties={filtered} onCardClick={(p) => { setSelectedProperty(p); setDialogOpen(true); }} />
          ) : (
            <div className="mt-2">
              <PropertyTable properties={filtered} onRowClick={(p) => { setSelectedProperty(p); setDialogOpen(true); }} />
            </div>
          )
        })()}
        
        <PropertyDialog open={dialogOpen} onOpenChange={setDialogOpen} property={selectedProperty} onEdit={(p) => navigate('/landlord/dashboard/properties/edit')} onRemove={(p) => { console.log('remove', p); setDialogOpen(false); }} />
      </div>
    </div>
  );
}
