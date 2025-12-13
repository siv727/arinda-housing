import axiosClient from './axiosClient'

export const getLandlordTenants = async () => {
  const response = await axiosClient.get('/landlord/tenants')
  return response.data
}

export const endLease = async (leaseId) => {
  const response = await axiosClient.patch(`/landlord/tenants/${leaseId}/end-lease`)
  return response.data
}

export const evictTenant = async (leaseId) => {
  const response = await axiosClient.patch(`/landlord/tenants/${leaseId}/evict`)
  return response.data
}
