import React, { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet'
import ApprovalSheet from './ApprovalSheet'
import RejectionSheet from './RejectionSheet'

const StatusBadge = ({ status }) => {
  const map = {
    Confirmed: 'bg-green-100 text-green-700',
    Pending: 'bg-yellow-100 text-yellow-700',
    Rejected: 'bg-red-100 text-red-700',
  }
  const dot = {
    Confirmed: 'bg-green-500',
    Pending: 'bg-yellow-500',
    Rejected: 'bg-red-500',
  }
  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
        map[status] || 'bg-gray-100 text-gray-700'
      }`}
    >
      <span className={`mr-2 h-2 w-2 rounded-full ${dot[status] || 'bg-gray-400'}`}></span>
      {status}
    </div>
  )
}

export default function ApplicationSheet({ open, onOpenChange, booking, onApprove = () => {}, onReject = () => {} }) {
  const tenant = booking?.tenant
  const property = booking?.property
  const [approvalOpen, setApprovalOpen] = useState(false)
  const [rejectionOpen, setRejectionOpen] = useState(false)
  const isActionSheetOpen = approvalOpen || rejectionOpen;

  const handleApprove = () => {
    if (!booking) return
    setApprovalOpen(true)
  }

  const handleReject = () => {
    if (!booking) return
    setRejectionOpen(true)
  }

  const handleApprovalConfirm = (payload) => {
    onApprove(booking, payload)
    setApprovalOpen(false)
    onOpenChange(false)
  }

  const handleRejectionConfirm = (payload) => {
    onReject(booking, payload)
    setRejectionOpen(false)
    onOpenChange(false)
  }

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          className={`${isActionSheetOpen ? 'sm:max-w-[580px] md:h-[85vh] md:mt-16' : 'sm:max-w-[600px] md:h-[97vh] md:mt-3 transition-all'} transition-all rounded-l-lg md:rounded-lg md:mr-3   flex flex-col`}
        >
          <SheetHeader>
            <SheetTitle>Application Details</SheetTitle>
          </SheetHeader>

          <hr />

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-5 space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                <img
                  src={tenant?.avatar}
                  alt={tenant?.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

              <div className="flex flex-col gap-2">
                <div className="items-center justify-center flex flex-col">
                  <div className="px-4 py-2">
                    <StatusBadge status={booking?.status} />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Property</label>
                  <div className="mt-1 px-4 py-2 border rounded-lg bg-gray-50 ">
                    {property?.title ?? "-"}
                  </div>
                </div>
              </div>

            <div className="grid grid-cols-2 gap-4">
              {/* split name into first/last */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  First Name
                </label>
                <div className="mt-1 px-4 py-2 border rounded-lg bg-gray-50">
                  {tenant?.name?.split(" ")[0] ?? ""}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <div className="mt-1 px-4 py-2 border rounded-lg bg-gray-50">
                  {tenant?.name?.split(" ").slice(1).join(" ") ?? ""}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="mt-1 px-4 py-2 border rounded-lg bg-gray-50">
                  {tenant?.email}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="mt-1 px-4 py-2 border rounded-lg bg-gray-50">
                  {tenant?.phone}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Move-in Date
                </label>
                <div className="mt-1 px-4 py-2 border rounded-lg bg-gray-50">
                  {tenant?.moveInDate ?? booking?.checkIn}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Student ID
                </label>
                <div className="mt-1 px-4 py-2 border rounded-lg bg-gray-50">
                  {tenant?.studentId ?? ""}
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                University
              </label>
              <div className="mt-1 px-4 py-2 border rounded-lg bg-gray-50">
                {tenant?.university ?? ""}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Additional Notes
              </label>
              <div className="mt-1 px-4 py-2 border rounded-lg bg-gray-50 min-h-[80px]">
                {tenant?.notes ?? "-"}
              </div>
            </div>
          </div>

          {/* Fixed footer */}
          <SheetFooter className="border-t pt-4 ">
            <div className="flex justify-end gap-3 w-full font-medium cursor-pointer">
              <button
                onClick={handleReject}
                className="hover:bg-[#FFF8F2] transition  border rounded-lg py-3 px-6 text-gray-700"
              >
                Reject<i className="fa-regular fa-circle-x pl-2"></i>
              </button>
              <button
                onClick={handleApprove}
                className="rounded-lg py-2 bg-[#F35E27] transition hover:bg-[#e7521c] px-6 text-white cursor-pointer"
              >
                Approve<i className="fa-regular fa-circle-check pl-2"></i>
              </button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Approval sheet opened after clicking Approve */}
      <ApprovalSheet
        open={approvalOpen}
        onOpenChange={setApprovalOpen}
        to={tenant?.email}
        onConfirm={handleApprovalConfirm}
        onCancel={() => setApprovalOpen(false)}
      />

      <RejectionSheet
        open={rejectionOpen}
        onOpenChange={setRejectionOpen}
        to={tenant?.email}
        onConfirm={handleRejectionConfirm}
        onCancel={() => setRejectionOpen(false)}
      />
    </>
  )
}
