import React, { useState, useEffect } from 'react'
import BookingsTable from '@/components/bookings/BookingsTable'
import BookingFilters from '@/components/bookings/BookingFilters'
import { getLandlordBookings } from '@/api/bookingsApi'

export default function Bookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [actionError, setActionError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getLandlordBookings()
      setBookings(data)
    } catch (err) {
      console.error('Failed to fetch bookings:', err)
      setError(err.response?.data?.message || err.message || 'Failed to fetch bookings')
    } finally {
      setLoading(false)
    }
  }

  const handleAccept = () => {
    // Refresh bookings after approval
    setActionError(null)
    fetchBookings()
  }

  const handleReject = () => {
    // Refresh bookings after rejection
    setActionError(null)
    fetchBookings()
  }

  const handleError = (errorMessage) => {
    setActionError(errorMessage)
  }

  // Filter bookings based on search and status
  const filteredBookings = bookings.filter((b) => {
    const q = searchTerm.trim().toLowerCase()
    const matchesSearch = q === '' || `${b.tenantName} ${b.tenantEmail} ${b.propertyTitle} ${b.propertyAddress}`.toLowerCase().includes(q)
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter.toUpperCase()
    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="py-6 2xl:p-6 space-y-6">
        <div className="space-y-4">
          <h1 className="text-[32px] font-bold">Bookings Management</h1>
          <p className="text-gray-600">Manage all tenant bookings and reservations for your properties.</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-500">Loading bookings...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-6 2xl:p-6 space-y-6">
        <div className="space-y-4">
          <h1 className="text-[32px] font-bold">Bookings Management</h1>
          <p className="text-gray-600">Manage all tenant bookings and reservations for your properties.</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="py-6 2xl:p-6 space-y-6">
      <div className="space-y-4">
        <h1 className="text-[32px] font-bold">Bookings Management</h1>
        <p className="text-gray-600">Manage all tenant bookings and reservations for your properties.</p>
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
              placeholder="Search bookings"
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
        <BookingFilters status={statusFilter} setStatus={setStatusFilter} onClose={() => setShowFilters(false)} />
      )}

      {/* Action Error Banner */}
      {actionError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <i className="fa-solid fa-circle-exclamation text-red-500"></i>
          <p className="text-red-700 flex-1">{actionError}</p>
          <button 
            onClick={() => setActionError(null)} 
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      )}

      <BookingsTable bookings={filteredBookings} onAccept={handleAccept} onReject={handleReject} onError={handleError} />
    </div>
  )
}
