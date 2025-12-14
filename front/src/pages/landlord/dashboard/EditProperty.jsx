import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AddPropertyForm from '@/components/properties/add/AddPropertyForm'
import { getListingDetails } from '../../../api/landlordListingApi'

export default function EditPropertyPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [initialData, setInitialData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPropertyData()
  }, [id])

  const fetchPropertyData = async () => {
    try {
      setLoading(true)
      const response = await getListingDetails(id)
      const data = response.data

      // Map backend data to form structure
      const mappedData = {
        // Basic Info
        title: data.title,
        description: data.description,

        // Type (Map backend -> frontend keys)
        propertyType: getPropertyTypeKey(data.propertytype),
        roomType: getRoomTypeKey(data.roomtype),

        // Location
        unit: data.unit || '',
        building: data.building || '',
        street: data.address,
        barangay: data.barangay,
        city: data.city,
        zip: data.postcode,
        province: data.province,

        // Pricing
        monthlyRent: data.monthlyrent,
        securityDeposit: data.securitydeposit,
        applicationFee: data.appfee || 0,
        petFee: data.petfee || 0,
        advanceRentMonths: data.advancerent || 0,

        // Arrays
        leaseTerms: data.leaseterms || [],
        includedUtilities: data.inclusions || [],
        amenities: data.amenities || [],
        neighborhood: data.establishments || [],

        // Photos (store URLs for display, we'll handle new uploads separately)
        existingPhotos: data.photos || [],
        photos: [], // New photos to upload
      }

      setInitialData(mappedData)
    } catch (error) {
      console.error('Failed to fetch property details:', error)
      alert('Failed to load property details')
      navigate('/landlord/dashboard/properties')
    } finally {
      setLoading(false)
    }
  }

  // Helper functions to reverse map backend types to frontend keys
  const getPropertyTypeKey = (backendType) => {
    const map = {
      'Boarding House': 'BoardingHouse',
      'Apartment': 'Apartment',
      'Dormitory': 'Dormitory',
      'Condominium': 'Condominium'
    }
    return map[backendType] || backendType
  }

  const getRoomTypeKey = (backendType) => {
    const map = {
      'Studio': 'Studio',
      'Private Room': 'PrivateRoom',
      'Shared Room': 'SharedRoom',
      'Shared Dormitory': 'SharedDormitory',
      '1-Bedroom': 'OneBedRoom',
      '2-Bedroom': 'TwoBedRoom'
    }
    return map[backendType] || backendType
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <i className="fa-solid fa-circle-notch fa-spin text-4xl text-[#F35E27] mb-4"></i>
          <p className="text-lg font-medium">Loading property details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-6 2xl:p-6 bg-[#FFFDFA]">
      <div className="flex items-center justify-between mb-6 mx-auto">
        <h1 className="text-[32px] font-bold">Edit Property</h1>
        <button 
          onClick={() => navigate('/landlord/dashboard/properties')} 
          className="text-sm px-6 py-2 text-[#222222] font-medium rounded-full border border-[#DDDDDD] hover:bg-[#FFF8F2] cursor-pointer transition"
        >
          Cancel
        </button>
      </div>

      {initialData && (
        <AddPropertyForm 
          editMode={true} 
          listingId={id}
          initialData={initialData}
        />
      )}
    </div>
  )
}
