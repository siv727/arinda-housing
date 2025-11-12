import React from 'react'

const StatusBadge = ({ status }) => {
  const map = {
    Confirmed: 'bg-green-100 text-green-700',
    Pending: 'bg-yellow-100 text-yellow-700',
    Rejected: 'bg-red-100 text-red-700'
  }
  const dot = {
    Confirmed: 'bg-green-500',
    Pending: 'bg-yellow-500',
    Rejected: 'bg-red-500'
  }
  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${map[status] || 'bg-gray-100 text-gray-700'}`}>
      <span className={`mr-2 h-2.5 w-2.5 rounded-full ${dot[status] || 'bg-gray-400'}`}></span>
      {status}
    </div>
  )
}

const ActionButtons = ({ onAccept = () => {}, onReject = () => {} }) => {
  return (
    <div className="flex items-center gap-2">
      <button onClick={onAccept} title="Confirm" className="w-9 h-9 rounded-md bg-green-500 text-white flex items-center justify-center hover:opacity-90">
        <i className="fa-solid fa-check"></i>
      </button>
      <button onClick={onReject} title="Reject" className="w-9 h-9 rounded-md bg-red-500 text-white flex items-center justify-center hover:opacity-90">
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  )
}

const BookingsTable = ({ bookings = [], onAccept = () => {}, onReject = () => {} }) => {
  return (
    <div className="overflow-auto bg-white border border-[#EAD1C7] rounded-lg">
      <table className="min-w-full divide-y divide-[#EAD1C7]">
        <thead className="bg-[#FFF8F2]">
          <tr className="text-sm">
            <th className="px-6 py-4 text-left font-medium">Tenant</th>
            <th className="px-6 py-4 text-left font-medium">Property</th>
            <th className="px-6 py-4 text-left font-medium">Check In</th>
            <th className="px-6 py-4 text-left font-medium">Status</th>
            <th className="px-6 py-4 text-left font-medium">Booked Date</th>
            <th className="px-6 py-4 text-left font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-[#EAD1C7]">
          {bookings.map((b) => (
            <tr key={b.id} className="hover:bg-gray-50">
              <td className="px-6 py-[26px] whitespace-nowrap align-top">
                <div className="text-sm font-semibold">{b.tenant.name}</div>
                <div className="text-xs text-gray-500">{b.tenant.email}</div>
              </td>

              <td className="px-6 py-[26px] whitespace-nowrap align-top">
                <div className="text-sm font-semibold">{b.property.title}</div>
                <div className="text-xs text-gray-500">{b.property.address}</div>
              </td>

              <td className="px-6 py-[26px] whitespace-nowrap align-top text-sm">{b.checkIn}</td>

              <td className="px-6 py-[26px] whitespace-nowrap align-top">
                <StatusBadge status={b.status} />
              </td>

              <td className="px-6 py-[26px] whitespace-nowrap align-top text-sm">{b.bookedDate}</td>

              <td className="px-6 py-[26px] whitespace-nowrap align-top">
                <ActionButtons
                  onAccept={() => onAccept(b)}
                  onReject={() => onReject(b)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BookingsTable
