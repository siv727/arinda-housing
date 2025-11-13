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

  // Reset confirming state when the sheet is closed from parent.
  useEffect(() => {
    if (!open) setConfirming(false);
  }, [open]);

  const handleRemove = () => {
    onRemove(property);
    setConfirming(false);
    onOpenChange(false);
  };
  // protect against parent passing `null` explicitly
  const p = property || {};

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[480px] rounded-l-lg md:rounded-lg md:mr-3 md:mt-3 md:h-[90vh] flex flex-col shadow-2xl">
        {/* Header used only for confirmation view */}
        {confirming && (
          <SheetHeader>
            <SheetTitle>Remove this listing?</SheetTitle>
            <SheetDescription>
              This is permanent—you’ll no longer be able to find or edit this
              listing.
            </SheetDescription>
          </SheetHeader>
        )}

        <hr />

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            <div className="w-full h-56 bg-gray-100 rounded-md overflow-hidden mb-2">
            {p.image ? (
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}
          </div>

          <div className="text-center">
            <p className="font-semibold text-lg">{p.title}</p>
            <p className="text-sm text-gray-500">{p.location}</p>
          </div>

          {!confirming ? (
            <div className="mt-2">
              <div className="mt-6 flex flex-col gap-3 font-medium">
                  <button
                  onClick={() => onEdit(property)}
                  className="bg-[#F35E27] transition hover:bg-[#e7521c] text-white rounded-lg py-3 w-full cursor-pointer"
                >
                  Edit listing
                </button>
                <button
                  onClick={() => setConfirming(true)}
                  className="hover:bg-[#FFF8F2] transition flex items-center justify-center gap-2 border rounded-lg py-3 w-full text-gray-700"
                >
                  <i className="fa-regular fa-trash-can"></i>
                  Remove listing
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="w-full h-40 bg-gray-100 rounded-md overflow-hidden mb-4 mt-2">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
              </div>

              <div className="text-center mb-4">
                  <p className="font-semibold text-lg">{p.title}</p>
                  <p className="text-sm text-gray-500">{p.location}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <SheetFooter className="border-t pt-4">
          {!confirming ? (
            <div className="flex justify-end gap-3 w-full font-medium">
              <button
                onClick={() => onEdit(property)}
                className="rounded-lg py-2 bg-[#F35E27] transition hover:bg-[#e7521c] px-6 text-white cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => setConfirming(true)}
                className="hover:bg-[#FFF8F2] transition  border rounded-lg py-3 px-6 text-gray-700"
              >
                Remove
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
