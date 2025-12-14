import axiosClient from './axiosClient';

/**
 * Get all bookings (lightweight summary for table)
 * Returns: BookingSummary[]
 */
export const getLandlordBookings = async () => {
  const response = await axiosClient.get('/landlord/bookings');
  return response.data;
};

/**
 * Get detailed booking information by ID
 * Returns: BookingResponse
 */
export const getBookingDetails = async (bookingId) => {
  const response = await axiosClient.get(`/landlord/bookings/${bookingId}`);
  return response.data;
};

/**
 * Approve an application
 * @param {number} bookingId - The booking/application ID
 * @param {Object} data - { message, attachmentUrl }
 */
export const approveApplication = async (bookingId, data) => {
  const response = await axiosClient.patch(`/landlord/bookings/${bookingId}/approve`, data);
  return response.data;
};

/**
 * Reject an application
 * @param {number} bookingId - The booking/application ID
 * @param {Object} data - { message }
 */
export const rejectApplication = async (bookingId, data) => {
  const response = await axiosClient.patch(`/landlord/bookings/${bookingId}/reject`, data);
  return response.data;
};

/**
 * Upload lease document (PDF/Image)
 * @param {FormData} formData - Contains the 'file' key
 */
export const uploadDocument = async (formData) => {
  // Matches the endpoint in LandlordController
  return axiosClient.post('/landlord/listings/upload-document', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};