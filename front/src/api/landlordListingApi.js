import axiosClient from './axiosClient';

/**
 * Create a new listing
 * @param {Object} data - The listing data
 * @returns {Promise} API response
 */
export const createListing = async (data) => {
    return axiosClient.post('/landlord/listings', data);
};

/**
 * Retrieve all listings created by the logged-in landlord
 * @returns {Promise} API response containing array of listings
 */
export const getMyListings = async () => {
    return axiosClient.get('/landlord/listings');
};

/**
 * Retrieve specific listing details (Landlord view)
 * @param {string|number} id - Listing ID
 * @returns {Promise} API response
 */
export const getListingDetails = async (id) => {
    return axiosClient.get(`/landlord/listings/${id}`);
};

/**
 * Update an existing listing
 * @param {string|number} id - Listing ID
 * @param {Object} data - Updated listing data
 * @returns {Promise} API response
 */
export const updateListing = async (id, data) => {
    return axiosClient.put(`/landlord/listings/${id}`, data);
};

/**
 * Delete a listing
 * @param {string|number} id - Listing ID
 * @returns {Promise} API response
 */
export const deleteListing = async (id) => {
    return axiosClient.delete(`/landlord/listings/${id}`);
};

/**
 * Upload photos for a listing
 * @param {FormData} formData - FormData object containing 'photos' files
 * @returns {Promise} API response with photo URLs
 */
export const uploadListingPhotos = async (formData) => {
    return axiosClient.post('/landlord/listings/upload-photos', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};