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
        <h1 className="text-[32px] font-bold">Bookings Management</h1>
        <p className="text-gray-600">Manage all tenant bookings and reservations for your properties.</p>
      </div>

        <BookingsTable bookings={bookings} onAccept={handleAccept} onReject={handleReject} />
 
    </div>
  )
}
