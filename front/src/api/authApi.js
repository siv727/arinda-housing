import axiosClient from './axiosClient';

/**
 * Register a new landlord
 * @param {Object} data - Registration data
 * @param {string} data.firstname - First name
 * @param {string} data.lastname - Last name
 * @param {string} data.email - Email address
 * @param {string} data.phonenumber - Phone number
 * @param {string} data.passwordhash - Password
 * @returns {Promise} API response
 */
export const registerLandlord = async (data) => {
  return axiosClient.post('/auth/register', {
    ...data,
    role: 'LANDLORD',
  });
};

/**
 * Register a new tenant/student
 * @param {Object} data - Registration data
 * @param {string} data.firstname - First name
 * @param {string} data.lastname - Last name
 * @param {string} data.email - Email address
 * @param {string} data.school - School name
 * @param {string} data.studentid - Student ID
 * @param {string} data.passwordhash - Password
 * @returns {Promise} API response
 */
export const registerTenant = async (data) => {
  return axiosClient.post('/auth/register', {
    ...data,
    role: 'STUDENT',
  });
};

/**
 * Login user
 * @param {Object} credentials
 * @param {string} credentials.email - Email address
 * @param {string} credentials.password - Password
 * @returns {Promise} API response with auth token
 */
export const login = async (credentials) => {
  return axiosClient.post('/auth/login', credentials);
};
