import axiosClient from './axiosClient';

export const submitApplication = async (data) => {
  // expects: { listingId, moveInDate, phoneNumber, applicantMessage }
  return axiosClient.post('/tenant/applications', data);
};
