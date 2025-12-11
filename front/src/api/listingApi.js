import axiosClient from './axiosClient';

/**
 * Get all listings (for the feed)
 * @returns {Promise} API response
 */
export const getAllListings = async () => {
    return axiosClient.get('/listings');
};

/**
 * Get specific listing details
 * @param {string|number} id - Listing ID
 * @returns {Promise} API response
 */
export const getListingById = async (id) => {
    return axiosClient.get(`/listings/${id}`);
};