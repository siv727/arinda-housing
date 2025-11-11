import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PropertyGrid from '@/components/properties/PropertyGrid'
import PropertyTable from '@/components/properties/PropertyTable'

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
    <div className="p-6 space-y-6">
      {/* Header section */}
      <div className="flex items-center justify-between">
        <div className="space-y-4">
          <h1 className="text-[32px] font-bold">Properties Management</h1>
          <p className="text-gray-600">
            Manage all your rental properties in one place.
          </p>
        </div>

        {/* Add Property + View Toggle */}
        <div className="flex flex-row items-center justify-center gap-2">
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
          <button className="bg-[#FFF8F2] text-[#F35E27] w-10 h-10 p-3 flex items-center justify-center rounded-full font-semibold hover:bg-orange-100 active:scale-90 transition-transform duration-150 ease-in-out">
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>

      {/* <form method="POST">
        <div className="flex space-x-2 ">
          <div className="relative flex-grow ">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              name="search"
              placeholder="Search rental properties..."
              className="w-full border rounded-full border-[#EAD1C7] bg-white pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 "
            />
          </div>

          <button
            type="submit"
            className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition"
          >
            Search
          </button>
        </div>
      </form> */}

      {/* Tabs + Sort Section */}
      <div className="flex justify-end items-center gap-4">
        {/* Sort by dropdown */}
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
          <PropertyGrid properties={properties} />
        ) : (
          <div className="mt-2">
            <PropertyTable properties={properties} />
          </div>
        )}
      </div>
    </div>
  );
}
