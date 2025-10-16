import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Properties() {
  const [sortBy, setSortBy] = useState("Latest");

  return (
    <div className="p-6 space-y-6">
      {/* Header section */}
      <div className="flex items-center justify-between">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Properties Management</h1>
          <p className="text-gray-600">
            Manage all your rental properties in one place.
          </p>
        </div>

        {/* Add Property */}
        <button className="bg-gradient-to-r from-[#F35E27] to-[#ff792b] text-white px-5 py-2 rounded-lg font-semibold hover:bg-orange-600 transition">
          <i className="fa-solid fa-plus pr-2"></i> Add Property
        </button>
      </div>

      <form method="POST">
        <div className="flex space-x-2">
          <div className="relative flex-grow">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              name="search"
              placeholder="Search rental properties..."
              className="w-full border rounded-full border-gray-300 bg-white pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            type="submit"
            className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition"
          >
            Search
          </button>
        </div>
      </form>

      {/* Tabs + Sort Section */}
      <div className="flex items-center justify-between">
        {/* Tabs */}
        <div className="flex space-x-6 text-gray-600 font-medium">
          <button className="text-gray-500 hover:text-[#F35E27] transition">
            All <span className="text-gray-400 ml-1">6</span>
          </button>
          <button className="text-gray-500 font-medium hover:text-[#F35E27] transition">
            Vacant <span className="text-gray-400 ml-1">5</span>
          </button>
          <button className="text-gray-500 hover:text-[#F35E27] transition">
            Occupied <span className="text-gray-400 ml-1">1</span>
          </button>
        </div>

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

      {/* Recent Bookings Section */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 ">
          Recent Bookings
        </h2>
        <ul className="divide-y divide-gray-200">
          <li className="py-3 flex justify-between">
            <span className="text-gray-700">John Cruz - Unit 301</span>
            <span className="text-gray-500 text-sm">2 days ago</span>
          </li>
          <li className="py-3 flex justify-between">
            <span className="text-gray-700">Anna Santos - Studio B</span>
            <span className="text-gray-500 text-sm">5 days ago</span>
          </li>
          <li className="py-3 flex justify-between">
            <span className="text-gray-700">Mark Tan - Room 204</span>
            <span className="text-gray-500 text-sm">1 week ago</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
