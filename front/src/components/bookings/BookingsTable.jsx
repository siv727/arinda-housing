import React, { useState } from "react";
import ApplicationSheet from "./ApplicationSheet";

const StatusBadge = ({ status }) => {
  const map = {
    Confirmed: "bg-green-100 text-green-700",
    Offered: "bg-orange-100 text-orange-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Rejected: "bg-red-100 text-red-700",
  };
  const dot = {
    Confirmed: "bg-green-500",
    Offered: "bg-orange-500", 
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
        className={`mr-2 h-2 w-2 rounded-full ${
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
  onFinalize = () => {},
}) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const openSheet = (b) => {
    setSelected(b);
    setSheetOpen(true);
  };

  const handleApprove = (b, payload) => {
    // if payload provided, this is an Offer being sent
    onAccept(b, payload)
  }

  const handleReject = (b) => {
    onReject(b)
  }

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
      <ApplicationSheet open={sheetOpen} onOpenChange={setSheetOpen} booking={selected} onApprove={handleApprove} onReject={handleReject} onFinalize={(b, details) => onFinalize(b, details)} />
    </>
  );
};

export default BookingsTable;
