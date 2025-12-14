import React from "react";

const StatusBadge = ({ status }) => {
  // Normalize status to title case for display
  const displayStatus = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  
  const map = {
    Approved: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Rejected: "bg-red-100 text-red-700",
    Completed: "bg-blue-100 text-blue-700",
    Evicted: "bg-red-100 text-red-700",
  };
  const dot = {
    Approved: "bg-green-500",
    Pending: "bg-yellow-500",
    Rejected: "bg-red-500",
    Completed: "bg-blue-500",
    Evicted: "bg-red-500",
  };
  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
        map[displayStatus] || "bg-gray-100 text-gray-700"
      }`}
    >
      <span
        className={`mr-2 h-2 w-2 rounded-full ${dot[displayStatus] || "bg-gray-400"}`}
      ></span>
      {displayStatus}
    </div>
  );
};

export default function ApplicationCard({ application }) {
  return (
    <div className="bg-white rounded-2xl border border-[#EAD1C7] overflow-hidden hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="w-24 h-18 rounded-md overflow-hidden bg-gray-100 flex-shrink-0 mb-2 items-center justify-center flex">
              <img
                src={application.propertyImage}
                alt={application.propertyTitle}
                className="w-full h-full object-cover "
              />
              </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {application.propertyTitle}
            </h3>
            <p className="text-sm text-gray-500 mb-1">
              {application.propertyLocation}
            </p>
            <p className="text-sm text-gray-600">
              Landlord: {application.landlordName}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <StatusBadge status={application.status} />
            <p className="text-lg font-bold text-gray-900">
              {application.propertyPrice}
            </p>
          </div>
        </div>
      </div>

      <hr className="border-[#EAD1C7]" />

      <div className="p-6 pt-4">
        <div className="flex gap-6">
          {/* Left Side - Application Details */}
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              Application Details
            </h4>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs text-gray-500">Phone Number</label>
                <p className="text-sm font-medium text-gray-900">
                  {application.phoneNumber || '-'}
                </p>
              </div>
              <div>
                <label className="text-xs text-gray-500">Lease Term</label>
                <p className="text-sm font-medium text-gray-900">
                  {application.leaseTerm || '-'}
                </p>
              </div>
              <div>
                <label className="text-xs text-gray-500">Move-in Date</label>
                <p className="text-sm font-medium text-gray-900">
                  {application.moveInDate}
                </p>
              </div>
              <div>
                <label className="text-xs text-gray-500">Applied Date</label>
                <p className="text-sm font-medium text-gray-900">
                  {application.checkInDate}
                </p>
              </div>
            </div>

            {/* Message from Landlord */}
            {application.responseMessage && (
              <div>
                <label className="text-xs text-gray-500 font-semibold">
                  Message from Landlord
                </label>
                <div className="mt-1 p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700">
                  {application.responseMessage}
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Documents */}
          <div className="w-[400px] flex-shrink-0">
            <h5 className="text-sm font-semibold text-gray-700 mb-2">
              Documents
            </h5>
            {application.documents && application.documents.length > 0 ? (
              <div className="space-y-2">
                {application.documents.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-[#FFF8F2] border border-[#EAD1C7] rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                        <i className="fa-regular fa-file-pdf text-red-600"></i>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {doc.name}
                        </p>
                        <p className="text-xs text-gray-500">{doc.size}</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-[#F35E27] cursor-pointer text-white text-sm font-semibold rounded-lg hover:bg-[#e7521c] transition-colors">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center py-8 border border-gray-200 rounded-lg bg-gray-50">
                <div className="text-center">
                  <i className="fa-regular fa-file text-gray-300 text-3xl mb-2"></i>
                  <p className="text-sm text-gray-500">
                    No documents available
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
