import { useState, useEffect } from 'react'
import { getLandlordTenants, endLease, evictTenant } from '@/api/tenantsApi'
import TenantsTable from '@/components/landlord/tenants/TenantsTable'
import TenantFilters from '@/components/landlord/tenants/TenantFilters'

export default function Tenants() {
  const [query, setQuery] = useState('')
  const [tenants, setTenants] = useState([])
  const [leaseStatusFilter, setLeaseStatusFilter] = useState('All')
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTenants()
  }, [])

  const fetchTenants = async () => {
    try {
      setLoading(true)
      const data = await getLandlordTenants()
      setTenants(data)
    } catch (error) {
      console.error('Failed to fetch tenants:', error)
    } finally {
      setLoading(false)
    }
  }

  const filtered = tenants.filter(t => {
    const q = query.trim().toLowerCase()
    if (!q) return true
    return (`${t.tenant.name} ${t.tenant.email} ${t.property.title}`.toLowerCase()).includes(q)
  })

  // Map backend enum to display format
  const mapLeaseStatus = (status) => {
    const map = {
      'ACTIVE': 'Active Tenant',
      'COMPLETED': 'Completed Tenant',
      'EVICTED': 'Evicted Tenant'
    }
    return map[status] || status
  }

  const statusFiltered = filtered.filter(t => {
    if (leaseStatusFilter === 'All') return true
    return mapLeaseStatus(t.leaseStatus) === leaseStatusFilter
  })

  const handleEndLease = async (tenant) => {
    try {
      await endLease(tenant.leaseId)
      await fetchTenants()
    } catch (error) {
      console.error('Failed to end lease:', error)
      alert(error.response?.data?.message || 'Failed to end lease')
    }
  }

  const handleEvict = async (tenant) => {
    try {
      await evictTenant(tenant.leaseId)
      await fetchTenants()
    } catch (error) {
      console.error('Failed to evict tenant:', error)
      alert(error.response?.data?.message || 'Failed to evict tenant')
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-4">
        <h1 className="text-[32px] font-bold">Tenants Management</h1>
        <p className="text-gray-600">Manage tenant information and lease agreements.</p>
      </div>

      <form onSubmit={e => e.preventDefault()}>
        <div className="flex space-x-2">
          <div className="relative flex-grow">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              name="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search tenants"
              className="w-full border rounded-lg border-[#EAD1C7] bg-white pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowFilters(s => !s)}
           className="bg-orange-500 cursor-pointer font-medium text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition flex items-center"
          >
            <i className="fa-regular fa-filter pr-2"></i>Filters
          </button>
        </div>

      </form>

      {showFilters && (
        <TenantFilters status={leaseStatusFilter} setStatus={setLeaseStatusFilter} onClose={() => setShowFilters(false)} />
      )}

      <div>
        {loading ? (
          <div className="text-center py-10">Loading tenants...</div>
        ) : (
          <TenantsTable 
            bookings={statusFiltered.map(t => ({
              ...t,
              id: t.leaseId,
              leaseStatus: mapLeaseStatus(t.leaseStatus)
            }))} 
            onEndLease={handleEndLease} 
            onEvict={handleEvict}
          />
        )}
      </div>
    </div>
  )
}