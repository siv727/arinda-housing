import axiosClient from './axiosClient';

export const getLandlordProfile = async () => {
    const response = await axiosClient.get('/landlord/profile');
    return response.data;
};

export const updateLandlordProfile = async (profileData) => {
    const response = await axiosClient.put('/landlord/profile', profileData);
    return response.data;
};