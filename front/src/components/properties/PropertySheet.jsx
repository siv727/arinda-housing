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
      <SheetContent className="sm:max-w-[600px] rounded-l-lg md:rounded-lg md:mr-3 md:mt-3 md:h-[97vh] flex flex-col shadow-2xl">
        <SheetHeader>
          <SheetTitle>Property Details</SheetTitle>
        </SheetHeader>

        <SheetDescription>
          <div className="flex-1 overflow-y-auto px-5  space-y-4">
            <div className="w-full h-56 bg-gray-100 rounded-t-md overflow-hidden mb-4">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <div class="flex justify-between items-center ">
                <p className="font-semibold text-lg text-black">{p.title}</p>
                <p className="bg-orange-100 text-orange-700 text-[12px] font-medium px-3 py-1 rounded-full">
                  {p.type}
                </p>
              </div>

              <div class="flex justify-between items-center ">
                <p className="text-sm">{p.location}</p>
                <div>
                  <div
                    className={`px-3 py-1 rounded-full flex items-center border  ${
                      p.status === "Available"
                        ? "bg-white text-green-600"
                        : "bg-white text-orange-600"
                    }`}
                  >
                    <span
                      className={`mr-2 h-2 w-2 rounded-full ${
                        p.status === "Available"
                          ? "bg-green-500"
                          : "bg-orange-500"
                      }`}
                    ></span>
                    <span className="text-xs font-medium">
                      {p.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-1">
                <span className="text-2xl font-bold text-gray-900">
                  {p.price}
                </span>
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
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={r.avatar}
                        alt={r.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div class = "flex flex-col space-y-0.5 mb-2">
                          <div className="font-semibold text-base">{r.name}</div>
                          <p className="text-sm text-gray-500">{r.date}</p>
                        </div>
                        

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
                className="hover:bg-[#FFF8F2] transition  border rounded-lg py-3 px-6 text-gray-700 cursor-pointer"
              >
               Remove <i className="fa-regular fa-trash pl-2"></i> 
              </button>
              <button
                onClick={() => onEdit(property)}
                className="rounded-lg py-2 bg-[#F35E27] transition hover:bg-[#e7521c] px-6 text-white cursor-pointer"
              >
                Edit<i className="fa-regular fa-pen-to-square pl-2"></i>
              </button>
            </div>
          ) : (
            <div className="flex justify-end gap-3 w-full font-semibold">
              <button
                onClick={() => setConfirming(false)}
                className="hover:bg-[#FFF8F2] transition  border rounded-lg py-3 px-6 text-gray-700 cursor-pointer"
              >
                Cancel <i class="fa-solid fa-arrow-turn-down-left pl-1"></i>
              </button>
              <button
                onClick={handleRemove}
                className="rounded-lg py-2 bg-[#F35E27] transition hover:bg-[#e7521c] px-6 text-white cursor-pointer"
              >
                Yes, remove <i className="fa-regular fa-trash pl-2"></i>
              </button>
            </div>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
