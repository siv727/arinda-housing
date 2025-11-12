import React from 'react'
import { useNavigate } from 'react-router-dom'
import AddPropertyForm from '@/components/properties/add/AddPropertyForm'

export default function AddPropertyPage() {
  const navigate = useNavigate()

  return (
    <div className="pt-6 2xl:p-6 bg-[#FFFDFA] ">
      <div className="flex items-center justify-between mb-6  mx-auto ">
        <h1 className="text-[32px] font-bold">Add Property</h1>
        <button onClick={() => navigate(-1)} className="text-sm px-6 py-2  text-[#222222] font-medium rounded-full  border border-[#DDDDDD] hover:border-[#222222] transition">
          Save & exit
        </button>
      </div>

      <AddPropertyForm />
      
    </div>
  )
}
