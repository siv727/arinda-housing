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
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
        map[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      <span
        className={`mr-2 h-2 w-2 rounded-full ${dot[status] || "bg-gray-400"}`}
      ></span>
      {status} Tenant
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
  const [draftStatus, setDraftStatus] = useState(paymentStatus);
  const [confirming, setConfirming] = useState(false);
  

  // 1. Define your color mapping for the buttons here
  const selectionColors = {
    Paid: "bg-green-100 border-green-500 text-green-700",
    "Due Soon": "bg-yellow-100 border-yellow-500 text-yellow-700",
    Overdue: "bg-red-100 border-red-500 text-red-700",
  };

  useEffect(() => {
    setStatus(paymentStatus);
    setDraftStatus(paymentStatus);
  }, [paymentStatus, booking]);

  useEffect(() => {
    if (!open) setConfirming(false);
  }, [open]);

  const handleStatusChange = (value) => {
    setDraftStatus(value);
  };

  const savePayment = () => {
    if (!booking) return;
    if (onUpdatePayment) onUpdatePayment(booking.id, draftStatus);
    setStatus(draftStatus);
  };


  const performEnd = async () => {
    if (!booking) return;
    if (onEndLease) onEndLease(booking);
    setConfirming(false);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[550px] rounded-l-lg md:rounded-lg md:mr-3 md:mt-3 md:h-[97vh] flex flex-col">
        <SheetHeader>
          <SheetTitle>Tenant Details</SheetTitle>
        </SheetHeader>

        <hr />

        <div className="flex-1 overflow-y-auto ">
          <div className="space-y-2">
            <div className="flex justify-center px-5">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                <img
                  src={tenant?.avatar}
                  alt={tenant?.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-[20px] font-semibold text-center flex flex-row mx-auto justify-center gap-2">
                <div className=" ">{tenant?.name?.split(" ")[0] ?? ""}</div>
                <div className="">
                  {tenant?.name?.split(" ").slice(1).join(" ") ?? ""}
                </div>
              </div>

              <div className="text-sm text-gray-500 text-center">
                {tenant?.email}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <StatusBadge status={"Active"} />
            </div>
          </div>

          <div className="p-5 border rounded-lg bg-gray-50 m-5">
            <div className="justify-between flex flex-row mb-4">
              <p className="text-sm font-medium text-gray-700">Monthly Rent</p>
            </div>

            <p className="text-sm font-medium text-gray-700">
              Set Payment Status
            </p>

            <div className="mt-2 gap-2 justify-between flex ">
                {["Paid", "Due Soon", "Overdue"].map((s) => (
                <button
                  key={s}
                  onClick={() => handleStatusChange(s)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium border w-full transition-colors cursor-pointer ${
                    draftStatus === s
                      ? selectionColors[s]
                      : "border-gray-300 bg-white hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className=" flex justify-end m-5">
            <button
              onClick={savePayment}
              disabled={draftStatus === status}
              className={`rounded-lg py-2.5 font-medium px-6 text-white transition ${
                draftStatus === status
                  ? "opacity-50 cursor-not-allowed bg-[#F35E27]"
                  : "bg-[#F35E27] hover:bg-[#e7521c] cursor-pointer"
              }`}
            >
              Save Changes <i className="fa-solid fa-check pl-1"></i>
            </button>
          </div>
          <hr className="my-4"></hr>
          <div className="mx-5 mb-10 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Property
                </label>
                <div className="mt-1 px-4 py-2 border rounded-lg bg-gray-50">
                  {property?.title}
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
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Check in
              </label>
              <div className="mt-1 px-4 py-2 border rounded-lg bg-gray-50 ">
                {property?.title}
              </div>
            </div>
          </div>
        </div>

        <SheetFooter className="border-t pt-4">
          {!confirming ? (
            <div className="flex justify-end gap-3 w-full font-semibold">
              <button
                onClick={() => onOpenChange(false)}
                className="hover:bg-[#FFF8F2] transition  border rounded-lg py-3 px-6 text-gray-700 cursor-pointer"
              >
                Close <i className="fa-solid fa-arrow-turn-down-left pl-1"></i>
              </button>
              <button
                onClick={() => setConfirming(true)}
                className="rounded-lg py-2 px-6 text-white transition bg-[#F35E27] hover:bg-[#e7521c] cursor-pointer "
              >
                End Lease <i className="fa-regular fa-note pl-2"></i>
              </button>
            </div>
          ) : (
            <div className="flex justify-end gap-3 w-full font-semibold">
              <button
                onClick={() => setConfirming(false)}
                className="hover:bg-[#FFF8F2] transition  border rounded-lg py-3 px-6 text-gray-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={performEnd}
                className="rounded-lg py-2 px-6 text-white transition bg-[#F35E27] hover:bg-[#e7521c]"
              >
                Yes, End Lease
              </button>
            </div>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
