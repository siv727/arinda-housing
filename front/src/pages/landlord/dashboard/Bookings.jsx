import React, { useState, useEffect } from 'react'
import BookingsTable from '@/components/bookings/BookingsTable'
import { getLandlordBookings } from '@/api/bookingsApi'

export default function Bookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
    fetchBookings()
  }

  const handleReject = () => {
    // Refresh bookings after rejection
    fetchBookings()
  }

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

      <BookingsTable bookings={bookings} onAccept={handleAccept} onReject={handleReject} />
    </div>
  )
}
