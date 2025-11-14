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
import { useNavigate } from 'react-router-dom'

export default function Properties() {
  const [properties, setProperties] = useState(mockProperties)

  const [sortBy, setSortBy] = useState("Latest");
  const [isGridView, setIsGridView] = useState(true)
  const [isFading, setIsFading] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)
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

      {/* Tabs + Sort Section */}
      <div className="flex justify-end items-center gap-4">

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="border border-gray-300 bg-white rounded-full px-4 py-1  hover:bg-gray-50 transition">
              Sort by: {sortBy}
              <i className="fa-solid fa-chevron-down ml-2 text-gray-500 text-sm"></i>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-lg shadow-md">
            <DropdownMenuItem onClick={() => setSortBy("Latest")}>
              Latest
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("Oldest")}>
              Oldest
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("Price: Low to High")}>
              Price: Low to High
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("Price: High to Low")}>
              Price: High to Low
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Properties Section (with fade animation on toggle) */}
      <div className={`transition-all duration-200 ${isFading ? 'opacity-0 ' : 'opacity-100'}`}>
        {isGridView ? (
          <PropertyGrid properties={properties} onCardClick={(p) => { setSelectedProperty(p); setDialogOpen(true); }} />
        ) : (
          <div className="mt-2">
            <PropertyTable properties={properties} onRowClick={(p) => { setSelectedProperty(p); setDialogOpen(true); }} />
          </div>
        )}
        
        <PropertyDialog open={dialogOpen} onOpenChange={setDialogOpen} property={selectedProperty} onEdit={(p) => navigate('/landlord/dashboard/properties/edit')} onRemove={(p) => { console.log('remove', p); setDialogOpen(false); }} />
      </div>
    </div>
  );
}
