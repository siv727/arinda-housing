import { useState } from 'react'
import Navbar from '../../components/tenant/Navbar'
import ApplicationCard from '../../components/tenant/ApplicationCard'
import { mockApplications } from '../../data/mockApplications'

const MyApplication = () => {
  const [selectedFilter, setSelectedFilter] = useState('All Applications')

  const filters = ['All Applications', 'Pending', 'Approved', 'Rejected']

  const filteredApplications = selectedFilter === 'All Applications' 
    ? mockApplications 
    : mockApplications.filter(app => app.status === selectedFilter)

  return (
    <div className="min-h-screen bg-gradient-to-bl from-[#FFF1EB] to-[#FFFDFA]">
      <Navbar />
      <div className="pt-24 p-6  mx-auto">
        <div className="space-y-4 mb-6">
          <h1 className="text-[32px] font-bold">My Applications</h1>
          <p className="text-gray-600">
            Track the status of your rental applications and manage your documents.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedFilter === filter
                  ? 'bg-[#F35E27] text-white shadow-md'
                  : 'bg-white text-gray-700 border border-[#EAD1C7] hover:border-[#F35E27] hover:text-[#F35E27]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Applications Grid */}
        <div className="grid grid-cols-1 gap-6">
          {filteredApplications.length > 0 ? (
            filteredApplications.map((application) => (
              <ApplicationCard key={application.id} application={application} />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16">
              <i className="fa-regular fa-folder-open text-gray-300 text-6xl mb-4"></i>
              <p className="text-gray-500 text-lg font-medium">No applications found</p>
              <p className="text-gray-400 text-sm">
                {selectedFilter === 'All Applications' 
                  ? 'Start browsing properties to submit your first application'
                  : `No ${selectedFilter.toLowerCase()} applications at the moment`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyApplication