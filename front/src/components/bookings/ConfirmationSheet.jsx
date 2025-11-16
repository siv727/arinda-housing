import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";

export default function ConfirmationSheet({
  open,
  onOpenChange,
  booking,
  onConfirm = () => {},
  onCancel = () => {},
}) {
  const tenant = booking?.tenant;
  const property = booking?.property;

  const [leaseTerm, setLeaseTerm] = useState("12 months");
  const [monthlyRent, setMonthlyRent] = useState(booking?.price || "");
  const [moveInDate, setMoveInDate] = useState(
    booking?.moveInDate || booking?.checkIn || ""
  );

  const isEmptyString = (v) => {
    return String(v ?? "").trim().length === 0;
  };

  const isInvalid =
    isEmptyString(monthlyRent) ||
    isEmptyString(moveInDate);
    

  useEffect(() => {
    if (open && booking) {
      setMonthlyRent(booking?.price || "");
      setMoveInDate(booking?.moveInDate || booking?.checkIn || "");
      setLeaseTerm(booking?.leaseDuration || "12 months"); 
    }
  }, [open, booking]);
  const submit = () => {
    onConfirm({ leaseTerm, monthlyRent, moveInDate });
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[550px] rounded-l-lg md:rounded-lg md:mr-3 md:mt-3 md:h-[97vh] flex flex-col">
        <SheetHeader>
          <SheetTitle>Finalize Booking</SheetTitle>
        </SheetHeader>

        <hr />

        <div className="flex-1 overflow-y-auto px-5 pt-3 space-y-4">
          <div>
            <h3 className="text-sm text-gray-600 font-medium">Tenant</h3>
            <div className="mt-2 px-4 py-2 border rounded-lg bg-gray-50">
              <div className="text-base ">{tenant?.name}</div>
            </div>
          </div>

          <div>
            <h3 className="text-sm text-gray-600 font-medium">Property</h3>
            <div className="mt-2 px-4 py-2 border rounded-lg bg-gray-50">
              <div className="text-base">{property?.title}</div>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600 font-medium">
              Agreed-upon Lease Term
            </label>
            <select
              className="mt-1 w-full px-3 py-2 border rounded-md"
              value={leaseTerm}
              onChange={(e) => setLeaseTerm(e.target.value)}
            >
              <option>1 months</option>
              <option>3 months</option>
              <option>6 months</option>
              <option>12 months</option>
              <option>24 months</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600 font-medium">
              Agreed-upon Monthly Rent
            </label>
            <input
              className="mt-1 w-full px-3 py-2 border rounded-md"
              value={monthlyRent}
              onChange={(e) => setMonthlyRent(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 font-medium">
              Final Move-in Date
            </label>
            <input
              type="text"
              className="mt-1 w-full px-3 py-2 border rounded-md"
              value={moveInDate}
              onChange={(e) => setMoveInDate(e.target.value)}
            />
          </div>
        </div>

        <SheetFooter className="border-t pt-4">
          <div className="flex justify-end gap-3 w-full font-medium">
            <button
              onClick={() => {
                onCancel();
                onOpenChange(false);
              }}
              className="hover:bg-[#FFF8F2] transition  border rounded-lg py-3 px-6 text-gray-700 cursor-pointer"
            >
              Cancel <i className="fa-solid fa-arrow-turn-down-left pl-1"></i>
            </button>
            <button
              disabled={isInvalid}
              onClick={submit}
              className={`
              rounded-lg py-2 px-6 text-white transition bg-[#F35E27] hover:bg-[#e7521c] 
              ${
                isInvalid
                  ? "opacity-40 cursor-not-allowed"
                  : "cursor-pointer"
              }
            `}
            >
              Confirm & Move to Tenants{" "}
              <i className="fa-regular fa-circle-check pl-2"></i>
            </button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
