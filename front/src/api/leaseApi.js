import axiosClient from './axiosClient';

/**
 * Get student's leases/rentals
 * @param {string} filter - Filter by status: 'all', 'current', or 'past'
 * @returns {Promise} API response with lease data
 */
export const getStudentLeases = async (filter = 'all') => {
    return axiosClient.get('/leases', {
        params: { filter }
    });
};