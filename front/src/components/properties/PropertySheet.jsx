import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";

export default function PropertySheet({
  open,
  onOpenChange,
  property = null,
  onEdit = () => {},
  onRemove = () => {},
}) {
  const [confirming, setConfirming] = useState(false);

  // Reset confirming state
  useEffect(() => {
    if (!open) setConfirming(false);
  }, [open]);

  const handleRemove = () => {
    onRemove(property);
    setConfirming(false);
    onOpenChange(false);
  };

  const p = property || {};

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[480px] rounded-l-lg md:rounded-lg md:mr-3 md:mt-3 md:h-[97vh] flex flex-col shadow-2xl">
        <SheetHeader>
          <SheetTitle>Property Details</SheetTitle>
        </SheetHeader>

        <SheetDescription>
          <div className="flex-1 overflow-y-auto px-5 pt-4 space-y-4">
            <div className="w-full h-56 bg-gray-100 rounded-md overflow-hidden mb-2">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-lg text-black">{p.title}</p>
                <p className="text-sm">{p.location}</p>
              </div>
            </div>
          </div>
        </SheetDescription>

        <hr />

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 space-y-4">
          <div className="font-medium">Reviews</div>

          {(p.reviews || []).length === 0 ? (
            <div className="text-sm text-gray-500">No reviews yet.</div>
          ) : (
            <div className="space-y-4">
              {(p.reviews || []).map((r, idx) => (
                <div key={r.id}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={r.avatar}
                        alt={r.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-sm">{r.name}</div>

                        <div className="flex items-center text-yellow-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <i
                              key={i}
                              className={`fa-solid fa-star text-sm ${
                                i < r.rating
                                  ? "text-yellow-500"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="text-sm text-gray-700 mt-1">
                        {r.comment}
                      </div>
                    </div>
                  </div>

                  {p.reviews.length > 1 && idx !== p.reviews.length - 1 && (
                    <hr className="my-4 border-gray-200" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <SheetFooter className="border-t pt-4">
          {!confirming ? (
            <div className="flex justify-end gap-3 w-full font-medium">
              <button
                onClick={() => setConfirming(true)}
                className="hover:bg-[#FFF8F2] transition  border rounded-lg py-3 px-6 text-gray-700"
              >
                <i className="fa-regular fa-trash pr-2"></i> Remove
              </button>
              <button
                onClick={() => onEdit(property)}
                className="rounded-lg py-2 bg-[#F35E27] transition hover:bg-[#e7521c] px-6 text-white cursor-pointer"
              >
                <i className="fa-regular fa-pen-to-square pr-2"></i>Edit
              </button>
            </div>
          ) : (
            <div className="flex justify-end gap-3 w-full font-semibold">
              <button
                onClick={() => setConfirming(false)}
                className="hover:bg-[#FFF8F2] transition  border rounded-lg py-3 px-6 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleRemove}
                className="rounded-lg py-2 bg-[#F35E27] transition hover:bg-[#e7521c] px-6 text-white cursor-pointer"
              >
                Yes, remove
              </button>
            </div>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
