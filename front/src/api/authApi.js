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
  const response = await axiosClient.post('/auth/login', credentials);
  
  // Store JWT token and user role in localStorage
  if (response.data.token) {
    localStorage.setItem('authToken', response.data.token);
  }
  if (response.data.role) {
    localStorage.setItem('userRole', response.data.role);
  }
  
  return response;
};

/**
 * Logout user - clear auth data from localStorage
 */
export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userRole');
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if user has a valid token
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};

/**
 * Get current user role
 * @returns {string|null} User role or null if not logged in
 */
export const getUserRole = () => {
  return localStorage.getItem('userRole');
};
