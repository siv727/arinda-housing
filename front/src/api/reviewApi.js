import axiosClient from './axiosClient';

/**
 * Get all reviews for a listing
 */
export const getReviews = async (listingId) => {
  return axiosClient.get(`/listings/${listingId}/reviews`);
};

/**
 * Get rating summary for a listing
 */
export const getRatingSummary = async (listingId) => {
  return axiosClient.get(`/listings/${listingId}/reviews/rating`);
};

/**
 * Submit a new review
 */
export const submitReview = async (listingId, data) => {
  // expects: { rating, comment }
  return axiosClient.post(`/listings/${listingId}/reviews`, data);
};

/**
 * Update an existing review
 */
export const updateReview = async (listingId, reviewId, data) => {
  return axiosClient.put(`/listings/${listingId}/reviews/${reviewId}`, data);
};

/**
 * Delete a review
 */
export const deleteReview = async (listingId, reviewId) => {
  return axiosClient.delete(`/listings/${listingId}/reviews/${reviewId}`);
};
