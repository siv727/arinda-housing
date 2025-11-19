import React from 'react'
import BasicInfoStep from './BasicInfoStep'
import TypeStep from './TypeStep'
import LocationStep from './LocationStep'
import PricingStep from './PricingStep'
import PhotosStep from './PhotosStep'
import AmenitiesStep from './AmenitiesStep'
import NeighborhoodStep from './NeighborhoodStep'

const steps = [
  { id: 'basic', label: 'Basic Info', Component: BasicInfoStep },
  { id: 'type', label: 'Property Type', Component: TypeStep },
  { id: 'location', label: 'Location', Component: LocationStep },
  { id: 'pricing', label: 'Pricing', Component: PricingStep },
  { id: 'photos', label: 'Photos', Component: PhotosStep },
  { id: 'amenities', label: 'Amenities', Component: AmenitiesStep },
  { id: 'neighborhood', label: 'Neighborhood', Component: NeighborhoodStep },
]

export default function ReviewStep({ form = {}, update = () => {} }) {
  return (
    <div className="space-y-6">
      {steps.map((s) => {
        const S = s.Component
        return (
          <div key={s.id} className="bg-white border rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold mb-2 text-[28px]">{s.label}</h3>
            <S form={form} update={update} />
          </div>
        )
      })}
    </div>
  )
}
