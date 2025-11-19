import React from 'react'

export default function PropertyFilters({ status, setStatus, onClose }) {
  const btn = (label) => `px-4 py-2 rounded-md border ${status === label ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-700 border-gray-300'} hover:opacity-90`;

  return (
    <div className="mt-3 p-4 border rounded-lg bg-white border-[#EAD1C7]">
      <div className="flex items-center justify-between mb-3 ">
        <h3 className="font-medium text-lg">Filter Properties</h3>
        <button onClick={onClose} className="text-[#F35E27] text-base cursor-pointer hover:text-orange-600 ">Close</button>
      </div>

      <div class = "flex flex-row items-center  gap-4">
        <label className="block  text-gray-600 mb-2 text-sm">Filter by Status:</label>
        <div className="flex gap-2">
          <button type="button" onClick={() => setStatus('All')} className={`${btn('All')} cursor-pointer`}>All</button>
          <button type="button" onClick={() => setStatus('Available')} className={`${btn('Available')} cursor-pointer`}>Available</button>
          <button type="button" onClick={() => setStatus('Occupied')} className={`${btn('Occupied')} cursor-pointer`}>Occupied</button>
        </div>
      </div>
    </div>
  )
}
