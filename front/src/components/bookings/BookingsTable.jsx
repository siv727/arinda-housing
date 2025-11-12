import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog'

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

const ActionButtons = ({ onRequestAccept = () => {}, onRequestReject = () => {} }) => {
  return (
    <div className="flex items-center gap-2">
      <button onClick={onRequestAccept} title="Confirm" className="w-9 h-9 rounded-md hover:bg-[#FFF8F2] text-gray-600 bg-white border-gray-300 border flex items-center justify-center cursor-pointer">
        <i className="fa-solid fa-check"></i>
      </button>
      <button onClick={onRequestReject} title="Reject" className="w-9 h-9 rounded-md hover:bg-[#FFF8F2] text-gray-600 bg-white border-gray-300 border flex items-center justify-center cursor-pointer">
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  )
}

const BookingsTable = ({ bookings = [], onAccept = () => {}, onReject = () => {} }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState(null) // 'approve' | 'reject'
  const [selected, setSelected] = useState(null)

  const requestAction = (b, mode) => {
    setSelected(b)
    setModalMode(mode)
    setModalOpen(true)
  }

  const handleConfirm = () => {
    if (!selected) return
    if (modalMode === 'approve') onAccept(selected)
    if (modalMode === 'reject') onReject(selected)
    setModalOpen(false)
    setSelected(null)
    setModalMode(null)
  }

  const handleCancel = () => {
    setModalOpen(false)
    setSelected(null)
    setModalMode(null)
  }

  return (
    <>
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
          <tbody className="bg-white divide-y divide-gray-300">
            {bookings.map((b) => (
              <tr key={b.id} className="hover:bg-gray-50">
                <td className="px-6 py-[26px] whitespace-nowrap align-top">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                      <img src={b.tenant?.avatar} alt={b.tenant?.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{b.tenant.name}</div>
                      <div className="text-xs text-gray-500">{b.tenant.email}</div>
                    </div>
                  </div>
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
                    onRequestAccept={() => requestAction(b, 'approve')}
                    onRequestReject={() => requestAction(b, 'reject')}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation dialog */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="w-[440px]">
          <DialogHeader>
            <DialogTitle>{modalMode === 'approve' ? 'Approve Booking' : 'Reject Booking'}</DialogTitle>
            <DialogDescription>
              {modalMode === 'approve'
                ? 'Confirm this booking request.'
                : 'Confirm rejection of this booking request.'}
            </DialogDescription>
          </DialogHeader>

          <div className="w-full h-28 bg-gray-100 rounded-md overflow-hidden mb-4 mt-4 flex items-center justify-center">
            <div>
              <p className="font-semibold text-lg text-center">Are you sure you want to {modalMode === 'approve' ? 'approve' : 'reject'} the booking for <span className="font-semibold">{selected?.property?.title}</span>?</p>
            </div>
          </div>

          <div className="flex gap-3 mt-2">
            <button onClick={handleConfirm} className={`flex-1 rounded-lg py-2 px-4 text-white ${modalMode === 'approve' ? 'bg-green-600' : 'bg-red-600'}`}>
              {modalMode === 'approve' ? 'Approve' : 'Reject'}
            </button>
            <button onClick={handleCancel} className="flex-1 border rounded-lg py-2 px-4">Cancel</button>
          </div>

          <DialogClose className="sr-only" />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default BookingsTable
