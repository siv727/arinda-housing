import axiosClient from './axiosClient';

export const getDashboardStats = async () => {
    return axiosClient.get('/landlord/dashboard/stats');
};

export const getRecentApplications = async () => {
    return axiosClient.get('/landlord/dashboard/recent-applications');
};

export const getRecentListings = async () => {
    return axiosClient.get('/landlord/dashboard/recent-listings');
};