import React, { useState } from "react";
import ApplicationSheet from "./ApplicationSheet";
import { getBookingDetails } from "@/api/bookingsApi";

const StatusBadge = ({ status }) => {
  const statusMap = {
    APPROVED: { label: "Approved", bg: "bg-green-100 text-green-700", dot: "bg-green-500" },
    PENDING: { label: "Pending", bg: "bg-yellow-100 text-yellow-700", dot: "bg-yellow-500" },
    REJECTED: { label: "Rejected", bg: "bg-red-100 text-red-700", dot: "bg-red-500" },
    COMPLETED: { label: "Completed", bg: "bg-blue-100 text-blue-700", dot: "bg-blue-500" },
    EVICTED: { label: "Evicted", bg: "bg-red-100 text-red-700", dot: "bg-red-500" },
  };
  const style = statusMap[status] || { label: status, bg: "bg-gray-100 text-gray-700", dot: "bg-gray-400" };
  
  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${style.bg}`}>
      <span className={`mr-2 h-2 w-2 rounded-full ${style.dot}`}></span>
      {style.label}
    </div>
  );
};

const BookingsTable = ({
  bookings = [],
  onAccept = () => {},
  onReject = () => {},
  onError = () => {},
}) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const openSheet = async (bookingSummary) => {
    try {
      setLoadingDetails(true);
      // Fetch full booking details
      const fullBooking = await getBookingDetails(bookingSummary.id);
      setSelectedBooking(fullBooking);
      setSheetOpen(true);
    } catch (err) {
      console.error('Failed to fetch booking details:', err);
      alert('Failed to load booking details');
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleApprove = () => {
    onAccept();
    setSheetOpen(false);
  };

  const handleReject = () => {
    onReject();
    setSheetOpen(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return '-';
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <>
      <div className="overflow-auto bg-white border border-[#EAD1C7] rounded-lg">
        <table className="min-w-full divide-y divide-[#EAD1C7]">
          <thead className="bg-[#FFF8F2]">
            <tr className="text-sm">
              <th className="px-6 py-4 text-left font-medium">Tenant</th>
              <th className="px-6 py-4 text-left font-medium">Property</th>
              <th className="px-6 py-4 text-left font-medium">Move-In Date</th>
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
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center">
                      <span className="text-sm font-semibold text-gray-600">
                        {b.tenantName?.charAt(0) || '?'}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold">
                        {b.tenantName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {b.tenantEmail}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-[26px] whitespace-nowrap align-top">
                  <div className="text-sm font-semibold">
                    {b.propertyTitle}
                  </div>
                  <div className="text-xs text-gray-500">
                    {b.propertyAddress}
                  </div>
                </td>

                <td className="px-6 py-[26px] whitespace-nowrap align-top text-sm">
                  {formatDate(b.moveInDate)}
                </td>

                <td className="px-6 py-[26px] whitespace-nowrap align-top">
                  <StatusBadge status={b.status} />
                </td>

                <td className="px-6 py-[26px] whitespace-nowrap align-top text-sm">
                  {formatDateTime(b.bookedDate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {bookings.length === 0 && (
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-500">No bookings found</p>
          </div>
        )}
      </div>
      
      <ApplicationSheet 
        open={sheetOpen} 
        onOpenChange={setSheetOpen} 
        booking={selectedBooking}
        loading={loadingDetails}
        onApprove={handleApprove} 
        onReject={handleReject}
        onError={onError}
      />
    </>
  );
};

export default BookingsTable;
