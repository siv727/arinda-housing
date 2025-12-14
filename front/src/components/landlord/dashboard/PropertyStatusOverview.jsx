import React from "react";

const StatusBadge = ({ status }) => {
  const styles = {
    Available: "bg-green-100 text-green-700",
    Occupied: "bg-orange-100 text-orange-700",
  };
  const dot = {
    Available: "bg-green-500",
    Occupied: "bg-orange-500",
  };

  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
        styles[status] || "bg-gray-100 text-gray-700"
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

export default function PropertyStatusOverview({ properties = [] }) {
  // Only show max 3 properties
  const recentProperties = properties.slice(0, 3);

  return (
    <div className="bg-white rounded-2xl border border-[#EAD1C7] p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Property Status
        </h2>
        <a
          href="/landlord/dashboard/properties"
          className="text-sm text-[#F35E27] hover:text-[#d64d1f] font-medium transition-colors"
        >
          View all →
        </a>
      </div>

      <div className="space-y-3">
        {recentProperties.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-8">
            No properties listed
          </p>
        ) : (
          recentProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white border border-[#EAD1C7] rounded-xl p-4"
            >
              <div className="flex items-start gap-4">
                {/* Property Image */}
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm truncate">
                        {property.title}
                      </h3>
                      <p className="text-xs text-gray-500 truncate mt-0.5">
                        {property.location}
                      </p>
                    </div>

                    {/* Status Badge */}
                    <StatusBadge status={property.status} />
                  </div>

                  {/* Additional Info */}
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-[#fff8f5] text-gray-600 text-xs">
                      <i className="fa-regular fa-home text-xs mr-1"></i>
                      {property.type}
                    </span>
                    <span className="text-xs font-semibold text-gray-700">
                      {property.price}
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
