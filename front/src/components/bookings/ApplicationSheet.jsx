import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import ApprovalSheet from "./ApprovalSheet";
import RejectionSheet from "./RejectionSheet";
import { approveApplication, rejectApplication } from "@/api/bookingsApi";

const StatusBadge = ({ status }) => {
  const statusMap = {
    APPROVED: {
      label: "Approved",
      bg: "bg-green-100 text-green-700",
      dot: "bg-green-500",
    },
    PENDING: {
      label: "Pending",
      bg: "bg-yellow-100 text-yellow-700",
      dot: "bg-yellow-500",
    },
    REJECTED: {
      label: "Rejected",
      bg: "bg-red-100 text-red-700",
      dot: "bg-red-500",
    },
  };
  const style = statusMap[status] || {
    label: status,
    bg: "bg-gray-100 text-gray-700",
    dot: "bg-gray-400",
  };

  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${style.bg}`}
    >
      <span className={`mr-2 h-2 w-2 rounded-full ${style.dot}`}></span>
      {style.label}
    </div>
  );
};

export default function ApplicationSheet({
  open,
  onOpenChange,
  booking,
  loading,
  onApprove = () => {},
  onReject = () => {},
  onError = () => {},
}) {
  const tenant = booking?.tenant;
  const property = booking?.property;
  const [approvalOpen, setApprovalOpen] = useState(false);
  const [rejectionOpen, setRejectionOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const isActionSheetOpen = approvalOpen || rejectionOpen;

  const handleApprove = () => {
    if (!booking) return;
    setError(null);
    setApprovalOpen(true);
  };

  const handleReject = () => {
    if (!booking) return;
    setError(null);
    setRejectionOpen(true);
  };

  const handleApprovalConfirm = async (payload) => {
    try {
      setSubmitting(true);
      setError(null);
      await approveApplication(booking.id, {
        message: payload.message,
        attachmentUrl: payload.file ? "uploaded-file-url" : null, // TODO: Handle file upload
        confirmedMoveInDate: payload.confirmedMoveInDate,
      });
      setApprovalOpen(false);
      onApprove();
      onOpenChange(false);
    } catch (err) {
      console.error("Failed to approve application:", err);
      const errorMessage = err.response?.data?.message || "Failed to approve application";
      setError(errorMessage);
      onError(errorMessage);
      setApprovalOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRejectionConfirm = async (payload) => {
    try {
      setSubmitting(true);
      setError(null);
      await rejectApplication(booking.id, {
        message: payload.message,
      });
      setRejectionOpen(false);
      onReject();
      onOpenChange(false);
    } catch (err) {
      console.error("Failed to reject application:", err);
      const errorMessage = err.response?.data?.message || "Failed to reject application";
      setError(errorMessage);
      onError(errorMessage);
      setRejectionOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          className={`${
            isActionSheetOpen
              ? "sm:max-w-[580px] md:h-[85vh] md:mt-16"
              : "sm:max-w-[600px] md:h-[97vh] md:mt-3 transition-all"
          } transition-all rounded-l-lg md:rounded-lg md:mr-3 flex flex-col`}
        >
          <SheetHeader>
            <SheetTitle>Application Details</SheetTitle>
          </SheetHeader>

          <hr />

          {/* Error Banner */}
          {error && (
            <div className="mx-5 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
              <i className="fa-solid fa-circle-exclamation text-red-500"></i>
              <p className="text-red-700 text-sm flex-1">{error}</p>
              <button 
                onClick={() => setError(null)} 
                className="text-red-500 hover:text-red-700"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          )}

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-5 space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                <img
                  src={tenant?.avatar}
                  alt={tenant?.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="items-center justify-center flex flex-col">
                <div className="px-4 py-2">
                  <StatusBadge status={booking?.status} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-bold uppercase text-center text-gray-900">
                <i class="fa-regular fa-house pr-1"></i>Property & Dates
              </p>
            
              {/* Property  */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Property
                </label>
                <div className="mt-1 px-4 py-2 border rounded-lg bg-gray-50 ">
                  {property?.title ?? "-"}
                </div>
              </div>

              {/* Address  */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Address
                </label>
                <div className="mt-1 px-4 py-2 border rounded-lg bg-gray-50 ">
                  {property?.address ?? "-"}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Move-in Date */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Move-in Date
                  </label>
                  <div className="mt-1 px-4 py-2 border rounded-lg bg-gray-50">
                    {formatDate(booking?.moveInDate)}
                  </div>
                </div>
                {/* Lease Term */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Lease Term
                  </label>
                  <div className="mt-1 px-4 py-2 border rounded-lg bg-gray-50">
                    {booking?.leaseTerm
                      ? `${booking.leaseTerm} month${
                          booking.leaseTerm !== 1 ? "s" : ""
                        }`
                      : "-"}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. PERSONAL CONTACT */}
            <div className="space-y-4 pt-4 border-t">
              <p className="text-sm font-bold uppercase text-center text-gray-900">
               <i class="fa-regular fa-phone pr-1"></i> Personal Contact
              </p>
              <div className="grid grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <div className="mt-1 px-4 py-2 border rounded-lg bg-gray-50">
                    {tenant?.name?.split(" ")[0] ?? ""}
                  </div>
                </div>
                {/* Last Name */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <div className="mt-1 px-4 py-2 border rounded-lg bg-gray-50">
                    {tenant?.name?.split(" ").slice(1).join(" ") ?? ""}
                  </div>
                </div>
                {/* Email Address */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="mt-1 px-4 py-2 border rounded-lg bg-gray-50">
                    {tenant?.email}
                  </div>
                </div>
                {/* Phone Number */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="mt-1 px-4 py-2 border rounded-lg bg-gray-50">
                    {booking?.phoneNumber ?? ""}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. VERIFICATION */}
            <div className="space-y-4 pt-4 border-t ">
              <p className="text-sm font-bold  uppercase text-center text-gray-900">
                <i class="fa-regular fa-badge-check pr-1"></i>Verification
              </p>
              <div className="grid grid-cols-2 gap-4">
                {/* University */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    University
                  </label>
                  <div className="mt-1 px-4 py-2 border rounded-lg bg-gray-50 overflow-x-auto whitespace-nowrap">
                    {tenant?.university ?? ""}
                  </div>
                </div>
                {/* Student ID */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Student ID
                  </label>
                  <div className="mt-1 px-4 py-2 border rounded-lg bg-gray-50">
                    {tenant?.studentId ?? ""}
                  </div>
                </div>
              </div>
            </div>

            {/* 4. APPLICANT MESSAGE */}
            <div className="space-y-4 pt-4 border-t pb-10">

              <p className="text-sm font-bold  uppercase text-center text-gray-900">
                <i class="fa-regular fa-message pr-1"></i>Applicant Message
              </p>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Additional Notes
                </label>
                <div className="mt-1 px-4 py-2 border rounded-lg bg-gray-50 min-h-[80px]">
                  {booking?.applicantMessage ?? "-"}
                </div>
              </div>
            </div>
          </div>

          {/* Fixed footer */}
          <SheetFooter className="border-t pt-4 ">
            <div className="flex justify-end gap-3 w-full font-medium cursor-pointer">
              <button
                onClick={handleReject}
                disabled={submitting || booking?.status !== "PENDING"}
                className="hover:bg-[#FFF8F2] transition border rounded-lg py-3 px-6 text-gray-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reject<i className="fa-regular fa-circle-x pl-2"></i>
              </button>
              <button
                onClick={handleApprove}
                disabled={submitting || booking?.status !== "PENDING"}
                className="rounded-lg py-2 bg-[#F35E27] transition hover:bg-[#e7521c] px-6 text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Approve<i className="fa-regular fa-circle-check pl-2"></i>
              </button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Approval sheet opened after clicking Approve */}
      <ApprovalSheet
        open={approvalOpen}
        onOpenChange={setApprovalOpen}
        to={tenant?.email}
        currentMoveInDate={booking?.moveInDate}
        onConfirm={handleApprovalConfirm}
        onCancel={() => setApprovalOpen(false)}
      />

      <RejectionSheet
        open={rejectionOpen}
        onOpenChange={setRejectionOpen}
        to={tenant?.email}
        onConfirm={handleRejectionConfirm}
        onCancel={() => setRejectionOpen(false)}
      />
    </>
  );
}
