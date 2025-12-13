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
    "Active Tenant": "bg-green-100 text-green-700",
    "Completed Tenant": "bg-blue-100 text-blue-700",
    "Evicted Tenant": "bg-red-100 text-red-700",
  };
  const dot = {
    "Active Tenant": "bg-green-500",
    "Completed Tenant": "bg-blue-500",
    "Evicted Tenant": "bg-red-500",
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
      {status}
    </div>
  );
};

export default function TenantSheet({
  open,
  onOpenChange,
  booking,
  leaseStatus = "Active Tenant",
  onUpdateStatus = () => {},
  onEndLease = () => {},
  onEvict = () => {},
}) {
  const tenant = booking?.tenant;
  const property = booking?.property;
  const [status, setStatus] = useState(leaseStatus);
  const [confirmingEndLease, setConfirmingEndLease] = useState(false);
  const [confirmingEvict, setConfirmingEvict] = useState(false);
  

  useEffect(() => {
    setStatus(leaseStatus);
  }, [leaseStatus, booking]);

  useEffect(() => {
    if (!open) {
      setConfirmingEndLease(false);
      setConfirmingEvict(false);
    }
  }, [open]);

  const performEndLease = async () => {
    if (!booking) return;
    if (onEndLease) onEndLease(booking);
    setConfirmingEndLease(false);
    onOpenChange(false);
  };

  const performEvict = async () => {
    if (!booking) return;
    if (onEvict) onEvict(booking);
    setConfirmingEvict(false);
    onOpenChange(false);
  };

  const formatCurrency = (amount) => {
    if (!amount) return '-'
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
    }).format(amount)
  }

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
              <StatusBadge status={status} />
            </div>
          </div>

          <div className="p-5 border rounded-lg bg-gray-50 m-5">
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700">Lease Information</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500">Monthly Rent</label>
                <div className="text-sm font-semibold">{formatCurrency(booking?.price)}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500">Move-in Date</label>
                  <div className="text-sm font-semibold">{booking?.moveInDate }</div>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Lease Contract</label>
                  <div className="text-sm font-semibold">{booking?.leaseTerm} months</div>
                </div>
              </div>
            </div>
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
              <div className="mt-1 px-4 py-2 border rounded-lg bg-gray-50 ">
                {tenant?.phone }
              </div>

               
              </div>
            </div>

            <div>
               <label className="text-sm font-medium text-gray-700">
                  Address
                </label>
                <div className="mt-1 px-4 py-2 border rounded-lg bg-gray-50">
                  {property?.address}
                </div>
            </div>
          </div>
        </div>

        <SheetFooter className="border-t pt-4">
          {!confirmingEndLease && !confirmingEvict ? (
            <div className="flex justify-end gap-3 w-full font-semibold">
              <button
                onClick={() => onOpenChange(false)}
                className="hover:bg-[#FFF8F2] transition  border rounded-lg py-3 px-6 text-gray-700 cursor-pointer"
              >
                Close <i className="fa-solid fa-arrow-turn-down-left pl-1"></i>
              </button>
              <button
                onClick={() => setConfirmingEndLease(true)}
                className="rounded-lg py-2 px-6 text-white transition bg-[#F35E27] hover:bg-[#e7521c] cursor-pointer "
                disabled={status === 'Completed Tenant' || status === 'Evicted Tenant'}
              >
                End Lease <i className="fa-regular fa-note pl-2"></i>
              </button>
              <button
                onClick={() => setConfirmingEvict(true)}
                className="rounded-lg py-2 px-6 text-white transition border-[#a11313] border-2 bg-[#c92121] hover:bg-[#a71616] cursor-pointer "
                disabled={status === 'Completed Tenant' || status === 'Evicted Tenant'}
              >
                Evict Tenant <i className="fa-solid fa-link-slash pl-2"></i>
              </button>
            </div>
          ) : confirmingEndLease ? (
            <div className="flex justify-end gap-3 w-full font-semibold">
              <button
                onClick={() => setConfirmingEndLease(false)}
                className="hover:bg-[#FFF8F2] transition  border rounded-lg py-3 px-6 text-gray-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={performEndLease}
                className="rounded-lg py-2 px-6 text-white transition bg-[#F35E27] hover:bg-[#e7521c] cursor-pointer"
              >
                Yes, End Lease
              </button>
            </div>
          ) : (
            <div className="flex justify-end gap-3 w-full font-semibold">
              <button
                onClick={() => setConfirmingEvict(false)}
                className="hover:bg-[#FFF8F2] transition  border rounded-lg py-3 px-6 text-gray-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={performEvict}
                className="rounded-lg py-2 px-6 text-white transition bg-[#c92121] hover:bg-[#a71616] cursor-pointer"
              >
                Yes, Evict Tenant
              </button>
            </div>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
