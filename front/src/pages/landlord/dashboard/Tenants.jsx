import { useState } from 'react'
import { bookings as mockBookings } from '@/data/mockBookings'
import TenantsTable from '@/components/landlord/tenants/TenantsTable'

export default function Tenants() {
  const [query, setQuery] = useState('')
  const [bookings, setBookings] = useState(mockBookings)

  const confirmed = bookings.filter(b => b.status === 'Confirmed')

  const filtered = confirmed.filter(b => {
    const q = query.trim().toLowerCase()
    if (!q) return true
    return (`${b.tenant.name} ${b.tenant.email} ${b.property.title}`.toLowerCase()).includes(q)
  })

  const handleEndLease = (b) => {
    setBookings(prev => prev.map(x => x.id === b.id ? { ...x, status: 'Rejected' } : x))
  }

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-4">
        <h1 className="text-[32px] font-bold">Tenants Management</h1>
        <p className="text-gray-600">Manage tenant information and lease agreements.</p>
      </div>

      <form onSubmit={e => e.preventDefault()}>
        <div className="flex space-x-2">
          <div className="relative flex-grow">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              name="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search tenants"
              className="w-full border rounded-lg border-[#EAD1C7] bg-white pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            type="button"
           className="bg-orange-500 cursor-pointer font-medium text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition flex items-center"
          >
            <i className="fa-regular fa-filter pr-2"></i>Filters
          </button>
        </div>
      </form>

      <div>
        <TenantsTable bookings={filtered} onEndLease={handleEndLease} />
      </div>
    </div>
  )
}