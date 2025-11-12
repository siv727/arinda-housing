import React, { useState } from 'react'
import BookingsTable from '@/components/bookings/BookingsTable'
import { bookings as mockBookings } from '@/data/mockBookings'

export default function Bookings() {
  const [bookings, setBookings] = useState(mockBookings)

  const handleAccept = (b) => {
    setBookings((prev) => prev.map(x => x.id === b.id ? { ...x, status: 'Confirmed' } : x))
  }

  const handleReject = (b) => {
    setBookings((prev) => prev.map(x => x.id === b.id ? { ...x, status: 'Rejected' } : x))
  }

  return (
    <div className="py-6 2xl:p-6 space-y-6">
      <div className="space-y-4">
        <p className="text-gray-600">Manage all tenant bookings and reservations for your properties.</p>
      </div>

      
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Bookings</h2>
        <BookingsTable bookings={bookings} onAccept={handleAccept} onReject={handleReject} />
 
    </div>
  )
}
