import axiosClient from './axiosClient';

export const submitApplication = async (data) => {
  // expects: { listingId, moveInDate, phoneNumber, applicantMessage, leaseTerm }
  return axiosClient.post('/tenant/applications', data);
};

/**
 * Check if the authenticated tenant is eligible to apply to a listing.
 * Returns { canApply, reason, blockedUntil, hoursRemaining }
 */
export const checkApplicationEligibility = async (listingId) => {
  return axiosClient.get(`/tenant/applications/eligibility?listingId=${listingId}`);
};
