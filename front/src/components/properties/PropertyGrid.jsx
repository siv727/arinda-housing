import React from 'react'

const PropertyGrid = ({ properties }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 transition-all">
      {properties.map((property, index) => (
        <div
          key={index}
          className="w-full overflow-hidden rounded-xl bg-white border border-[#EAD1C7] relative transform hover:-translate-y-1 transition-transform duration-150"
        >
          <div className="h-64 text-center justify-center flex items-center relative">
            <img
              src={property.image}
              alt={property.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-orange-500/20 backdrop-blur-[1px]"></div>

            <div
              className={`absolute top-3 left-3 px-3 py-1 rounded-full flex items-center shadow-sm  ${
                property.status === 'Available' ? 'bg-white text-green-600' : 'bg-white text-orange-600'
              }`}
            >
              <span
                className={`mr-2 h-2.5 w-2.5 rounded-full ${
                  property.status === 'Available' ? 'bg-green-500' : 'bg-orange-500'
                }`}
              ></span>
              <span className="text-xs font-medium">{property.status}</span>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-gray-900">{property.title}</h2>

              <span className="bg-orange-100 text-orange-700 text-sm font-medium px-3 py-1 rounded-full">
                {property.type}
              </span>
            </div>

            <p className="text-gray-500 text-sm">{property.location}</p>

            <div className="mt-4">
              <span className="text-2xl font-bold text-gray-900">{property.price}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PropertyGrid
