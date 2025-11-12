import React from 'react'

const StatusBadge = ({ status }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
    status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
  }`}>
    <span className={`mr-2 h-2.5 w-2.5 rounded-full ${status === 'Available' ? 'bg-green-500' : 'bg-orange-500'}`}></span>
    {status}
  </span>
)

const PropertyTable = ({ properties, onRowClick = () => {} }) => {
  return (
    <div className="w-full overflow-auto bg-white border border-[#EAD1C7] rounded-lg">
      <table className="min-w-full divide-y divide-[#EAD1C7]">
        <thead className="bg-[#FFF8F2]">
          <tr className="text-sm">
            <th className="px-6 py-4 text-left font-medium">Property</th>
            <th className="px-6 py-4 text-left font-medium">Type</th>
            <th className="px-6 py-4 text-left font-medium">Location</th>
            <th className="px-6 py-4 text-left font-medium">Price</th>
            <th className="px-6 py-4 text-left font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-[#EAD1C7]">
          {properties.map((property, idx) => (
            <tr key={idx} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => onRowClick(property)}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-8">
                  <div className="w-20 h-14 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                    <img src={property.image} alt={property.title} className="w-full h-full object-cover " />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{property.title}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{property.type}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{property.location}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{property.price}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <StatusBadge status={property.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PropertyTable
