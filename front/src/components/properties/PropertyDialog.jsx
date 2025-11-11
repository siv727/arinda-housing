import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog'
export default function PropertyDialog({ open, onOpenChange, property = {}, onEdit = () => {}, onRemove = () => {} }) {
  const [confirming, setConfirming] = useState(false)

  if (!property) return null

  // Reset confirming state when the dialog is closed from parent
  useEffect(() => {
    if (!open) setConfirming(false)
  }, [open])

  const handleRemove = () => {
    onRemove(property)
    setConfirming(false)
    onOpenChange(false)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent showCloseButton={true} className="w-[400px] shadow-2xl rounded-3xl ">
          {!confirming ? (
            <div className="mt-4">
              <div className="w-full h-56 bg-gray-100 rounded-md overflow-hidden mb-4 mt-2">
                {property.image ? (
                  <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
              </div>

              <div className="text-center ">
                <p className="font-semibold text-lg">{property.title}</p>
                <p className="text-sm text-gray-500">{property.location}</p>
              </div>

              <div className="mt-6 flex flex-col gap-3 font-medium">
                <button onClick={() => onEdit(property)} className="bg-[#F35E27] transition hover:bg-[#e7521c] text-white rounded-lg py-3 w-full cursor-pointer">Edit listing</button>
                <button onClick={() => setConfirming(true)} className="hover:bg-[#FFF8F2] transition flex items-center justify-center gap-2 border rounded-lg py-3 w-full text-gray-700">
                  <i class="fa-regular fa-trash-can"></i>
                  Remove listing
                </button>
              </div>
            </div>
          ) : (

            <div>
              <DialogHeader class = "text-center">
                <DialogTitle class = "text-[22px] font-semibold mt-4">Remove this listing?</DialogTitle>
                <DialogDescription class = "text-base text-gray-600">This is permanent—you’ll no longer be able to find or edit this listing.</DialogDescription>
              </DialogHeader>

              <div className="w-full h-40 bg-gray-100 rounded-md overflow-hidden mb-4 mt-4">
                {property.image ? (
                  <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
              </div>

              <div className="text-center mb-4">
                <p className="font-semibold text-lg">{property.title}</p>
                <p className="text-sm text-gray-500">{property.location}</p>
              </div>

              <div className="mt-6 flex flex-col gap-3 font-semibold">
                <button onClick={handleRemove} className="bg-[#F35E27] transition hover:bg-[#e7521c] text-white rounded-lg py-3 w-full cursor-pointer">Yes, remove</button>
                <button onClick={() => setConfirming(false)} className="hover:bg-[#FFF8F2] transition flex items-center justify-center gap-2 border rounded-lg py-3 w-full text-gray-700">Cancel</button>
              </div>
            </div>
          )}

          <DialogClose className="sr-only" />
        </DialogContent>
      </Dialog>
    </>
  )
}
