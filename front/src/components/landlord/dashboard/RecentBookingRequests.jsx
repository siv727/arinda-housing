import React from "react";

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
        className={`mr-2 h-2 w-2 rounded-full ${
          dot[status] || "bg-gray-400"
        }`}
      ></span>
      {status}
    </div>
  );
};


const getInitials = (name) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export default function RecentBookingRequests({ bookings = [] }) {
  // Only show max 3 recent bookings
  const recentBookings = bookings.slice(0, 3);

  return (
    <div className="bg-white rounded-2xl border border-[#EAD1C7] p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Recent Applications
        </h2>
        <a
          href="/landlord/dashboard/bookings"
          className="text-sm text-[#F35E27] hover:text-[#d64d1f] font-medium transition-colors"
        >
          View all →
        </a>
      </div>

      <div className="space-y-3">
        {recentBookings.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-8">
            No recent applications
          </p>
        ) : (
          recentBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white border border-[#EAD1C7] rounded-xl p-4"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                  <img
                    src={booking.tenant?.avatar}
                    alt={booking.tenant?.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm truncate">
                        {booking.tenant.name}
                      </h3>
                      <p className="text-xs text-gray-500 truncate mt-0.5">
                        {booking.property.title}
                      </p>
                    </div>

                    {/* Status Badge */}
                    <StatusBadge status={booking.status} />
                  </div>

                  {/* Tags */}
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-600 text-xs">
                      <i className="fa-regular fa-calendar text-xs mr-1"></i>
                      {booking.checkIn}
                    </span>
                    <span className="text-xs text-gray-400">
                      Applied {booking.bookedDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
