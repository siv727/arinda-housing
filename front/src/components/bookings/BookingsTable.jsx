import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";

const StatusBadge = ({ status }) => {
  const map = {
    Confirmed: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Rejected: "bg-red-100 text-red-700",
  };
  const dot = {
    Confirmed: "bg-green-500",
    Pending: "bg-yellow-500",
    Rejected: "bg-red-500",
  };
  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
        map[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      <span
        className={`mr-2 h-2.5 w-2.5 rounded-full ${
          dot[status] || "bg-gray-400"
        }`}
      ></span>
      {status}
    </div>
  );
};

const BookingsTable = ({
  bookings = [],
  onAccept = () => {},
  onReject = () => {},
}) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const openSheet = (b) => {
    setSelected(b);
    setSheetOpen(true);
  };

  const closeSheet = () => {
    setSheetOpen(false);
    setSelected(null);
  };

  const handleApprove = () => {
    if (!selected) return;
    onAccept(selected);
    closeSheet();
  };

  const handleReject = () => {
    if (!selected) return;
    onReject(selected);
    closeSheet();
  };

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
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-300">
            {bookings.map((b) => (
              <tr
                key={b.id}
                onClick={() => openSheet(b)}
                className="hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-6 py-[26px] whitespace-nowrap align-top">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={b.tenant?.avatar}
                        alt={b.tenant?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">
                        {b.tenant.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {b.tenant.email}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-[26px] whitespace-nowrap align-top">
                  <div className="text-sm font-semibold">
                    {b.property.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {b.property.address}
                  </div>
                </td>

                <td className="px-6 py-[26px] whitespace-nowrap align-top text-sm">
                  {b.checkIn}
                </td>

                <td className="px-6 py-[26px] whitespace-nowrap align-top">
                  <StatusBadge status={b.status} />
                </td>

                <td className="px-6 py-[26px] whitespace-nowrap align-top text-sm">
                  {b.bookedDate}
                </td>

                {/* actions removed — row click opens the sheet with full application */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Slide-in sheet with booking application details */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="sm:max-w-[600px] rounded-l-lg md:rounded-lg md:mr-3 md:mt-3 md:h-[97vh]">
          <SheetHeader>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                <img
                  src={selected?.tenant?.avatar}
                  alt={selected?.tenant?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <SheetTitle>Application Details</SheetTitle>
              </div>
            </div>
          </SheetHeader>

          <hr></hr>
          <div className=" space-y-4 p-5">
            <div className="grid grid-cols-2 gap-4">
              {/* split name into first/last */}
              <div>
                <label className="text-sm font-medium  text-gray-500">
                  First Name
                </label>
                <div className="mt-1 px-4 py-2 border rounded-lg bg-gray-50">
                  {selected?.tenant?.name?.split(" ")[0] ?? ""}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium  text-gray-500">
                  Last Name
                </label>
                <div className="mt-1 px-4 py-2 border rounded-lg bg-gray-50">
                  {selected?.tenant?.name?.split(" ").slice(1).join(" ") ?? ""}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Email Address
                </label>
                <div className="mt-1 px-4 py-2 border rounded-lg bg-gray-50">
                  {selected?.tenant?.email}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium  text-gray-500">
                  Phone Number
                </label>
                <div className="mt-1 px-4 py-2 border rounded-lg bg-gray-50">
                  {selected?.tenant?.phone}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium  text-gray-500">
                  Move-in Date
                </label>
                <div className="mt-1 px-4 py-2 border rounded-lg bg-gray-50">
                  {selected?.tenant?.moveInDate ?? selected?.checkIn}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium  text-gray-500">
                  Student ID
                </label>
                <div className="mt-1 px-4 py-2 border rounded-lg bg-gray-50">
                  {selected?.tenant?.studentId ?? ""}
                </div>
              </div>
              
            </div>

            <div>
                <label className="text-sm font-medium  text-gray-500">
                  University
                </label>
                <div className="mt-1 px-4 py-2 border rounded-lg bg-gray-50">
                  {selected?.tenant?.university ?? ""}
                </div>
              </div>

            <div>
              <label className="text-sm font-medium  text-gray-500">
                Additional Notes
              </label>
              <div className="mt-1  px-4 py-2 border rounded-lg bg-gray-50 h-32">
                {selected?.tenant?.notes ?? "-"}
              </div>
            </div>
          </div>

          <SheetFooter>
            <div className="flex gap-3 w-full border-t   ">
              <button
                onClick={handleReject}
                className="flex-1 rounded-lg py-2 px-4 bg-red-600 text-white"
              >
                Reject
              </button>
              <button
                onClick={handleApprove}
                className="flex-1 rounded-lg py-2 px-4 bg-green-600 text-white"
              >
                Approve
              </button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default BookingsTable;
