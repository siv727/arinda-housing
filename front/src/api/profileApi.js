import axiosClient from './axiosClient';

/**
 * Get user profile
 * @returns {Promise} API response with user profile data
 */
export const getProfile = async () => {
    return axiosClient.get('/tenant/profile');
};

/**
 * Update user profile
 * @param {Object} data - Profile data to update
 * @param {string} data.firstname - First name
 * @param {string} data.lastname - Last name
 * @param {string} data.school - School/University name (for students)
 * @param {string} data.studentid - Student ID (for students)
 * @returns {Promise} API response with updated profile
 */
export const updateProfile = async (data) => {
    return axiosClient.put('/tenant/profile', data);
};