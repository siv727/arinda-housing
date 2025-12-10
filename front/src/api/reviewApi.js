import axiosClient from './axiosClient';

export const submitReview = async (listingId, data) => {
  // expects: { rating, comment }
  return axiosClient.post(`/listings/${listingId}/reviews`, data);
};

export const updateReview = async (listingId, reviewId, data) => {
  return axiosClient.put(`/listings/${listingId}/reviews/${reviewId}`, data);
};

export const deleteReview = async (listingId, reviewId) => {
  return axiosClient.delete(`/listings/${listingId}/reviews/${reviewId}`);
};
