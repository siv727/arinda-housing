import axiosClient from './axiosClient'

/**
 * Get all tenants (lightweight summary for table)
 * Returns: TenantSummary[]
 */
export const getLandlordTenants = async () => {
  const response = await axiosClient.get('/landlord/tenants')
  return response.data
}

/**
 * Get detailed tenant information by ID
 * Returns: TenantResponse
 */
export const getTenantDetails = async (leaseId) => {
  const response = await axiosClient.get(`/landlord/tenants/${leaseId}`)
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
