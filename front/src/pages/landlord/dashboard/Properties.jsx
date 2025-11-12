import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PropertyGrid from '@/components/properties/PropertyGrid'
import PropertyTable from '@/components/properties/PropertyTable'
import PropertyDialog from '@/components/properties/PropertyDialog'
import { useNavigate } from 'react-router-dom'

export default function Properties() {
  const properties = [
    {
      title: "Loy's Apartment ",
      location: "New York, NY",
      price: "₱2,500/month",
      status: "Occupied",
      type: "Apartment",
      image:
        "https://images.unsplash.com/photo-1560448075-bb485b067938?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Cozy Studio Near University",
      location: "Manila, PH",
      price: "₱8,000/month",
      status: "Available",
      type: "Studio",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Luxury Condo with Balcony",
      location: "Cebu City, PH",
      price: "₱15,000/month",
      status: "Occupied",
      type: "Condo",
      image:
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Affordable Dorm Room",
      location: "Davao City, PH",
      price: "₱5,000/month",
      status: "Available",
      type: "Dormitory",
      image:
        "https://images.unsplash.com/photo-1586105251261-72a756497a12?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Two-Bedroom Apartment",
      location: "Quezon City, PH",
      price: "₱12,000/month",
      status: "Occupied",
      type: "Apartment",
      image:
        "https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=800&q=80",
    },
  ];

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
            {/* Single view toggle button (shows the other view's icon) */}
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
        
        {/* Property details dialog */}
        <PropertyDialog open={dialogOpen} onOpenChange={setDialogOpen} property={selectedProperty} onEdit={(p) => navigate('/landlord/dashboard/properties/edit')} onRemove={(p) => { console.log('remove', p); setDialogOpen(false); }} />
      </div>
    </div>
  );
}
