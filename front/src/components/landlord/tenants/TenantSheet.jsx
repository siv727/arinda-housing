import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";

const StatusBadge = ({ status }) => {
  const map = {
    Active: "bg-green-100 text-green-700",
    Paid: "bg-green-100 text-green-700",
    "Due Soon": "bg-yellow-100 text-yellow-700",
    Overdue: "bg-red-100 text-red-700",
  };
  const dot = {
    Active: "bg-green-500",
    Paid: "bg-green-500",
    "Due Soon": "bg-yellow-500",
    Overdue: "bg-red-500",
  };
  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
        map[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      <span
        className={`mr-2 h-2 w-2 rounded-full ${dot[status] || "bg-gray-400"}`}
      ></span>
      {status}
    </div>
  );
};

export default function TenantSheet({
  open,
  onOpenChange,
  booking,
  paymentStatus = "Due Soon",
  onUpdatePayment = () => {},
  onEndLease = () => {},
}) {
  const tenant = booking?.tenant;
  const property = booking?.property;
  const [status, setStatus] = useState(paymentStatus);

  useEffect(() => {
    setStatus(paymentStatus);
  }, [paymentStatus, booking]);

  const handleStatusChange = (value) => {
    setStatus(value);
    if (booking) onUpdatePayment(booking.id, value);
  };

  const handleEnd = () => {
    if (booking) onEndLease(booking);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[600px] rounded-l-lg md:rounded-lg md:mr-3 md:mt-3 md:h-[97vh] flex flex-col">
        <SheetHeader>
          <SheetTitle>Tenant Details</SheetTitle>
        </SheetHeader>

        <hr />

        <div className="flex-1 overflow-y-auto px-5 pt-3 space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
              <img
                src={tenant?.avatar}
                alt={tenant?.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div class = "text-[20px] font-semibold text-center flex flex-row mx-auto justify-center gap-2">
            <div className="mt-1 py-2">
              {tenant?.name?.split(" ")[0] ?? ""}
            </div>

            <div className="mt-1 py-2">
              {tenant?.name?.split(" ").slice(1).join(" ") ?? ""}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <StatusBadge status={"Active"} />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Property
            </label>
            <div className="mt-1 px-4 py-2 border rounded-lg bg-gray-50 ">
              {property?.title}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1 px-4 py-2 border rounded-lg bg-gray-50">
                {tenant?.email ?? ""}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="mt-1 px-4 py-2 border rounded-lg bg-gray-50">
                {tenant?.phone ?? ""}
              </div>
            </div>
          </div>
        </div>

        <SheetFooter className="border-t pt-4">
          <div className="flex justify-end gap-3 w-full font-medium">
            <button
              onClick={() => onOpenChange(false)}
              className="hover:bg-[#FFF8F2] transition  border rounded-lg py-3 px-6 text-gray-700 cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handleEnd}
              className="rounded-lg py-2 px-6 text-white transition bg-[#F35E27] hover:bg-[#e7521c] cursor-pointer "
            >
              End Lease
            </button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
