import React from 'react'
import FeatureCard from './FeatureCard'

const AMENITIES = [
  { key: 'No Amenities', label: 'No Amenities', icon: 'fa-regular fa-circle-xmark' },
  { key: 'Air Conditioning', label: 'Air Conditioning', icon: 'fa-regular fa-snowflake' },
  { key: 'Laundry Area', label: 'Laundry Area', icon: 'fa-regular fa-shirt' },
  { key: 'Furniture', label: 'Fully Furnished', icon: 'fa-regular fa-couch' },
  { key: 'Parking Space', label: 'Parking Space', icon: 'fa-regular fa-car' },
  { key: 'Security', label: 'Security', icon: 'fa-regular fa-shield-halved' },
  { key: 'Pet Friendly', label: 'Pet Friendly', icon: 'fa-regular fa-paw' },
  { key: 'Swimming Pool', label: 'Swimming Pool', icon: 'fa-regular fa-water-ladder' },
  { key: 'Gym', label: 'Gym', icon: 'fa-regular fa-dumbbell' },
  { key: 'Study Area', label: 'Study Area', icon: 'fa-regular fa-book' },
]

export default function AmenitiesStep({ form = {}, update }) {
  const togg = (amen) => {
    const set = new Set(form.amenities || [])
    if (set.has(amen)) set.delete(amen)
    else set.add(amen)
    update({ amenities: Array.from(set) })
  }

  return (
    <div>
      <p className="text-lg text-gray-600 mb-4">
        Select amenities that are available on your property.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {AMENITIES.map((a) => {
          const checked = (form.amenities || []).includes(a.key)
          return (
            <FeatureCard key={a.key} item={a} checked={checked} onToggle={() => togg(a.key)} idPrefix="amen" />
          )
        })}
      </div>
    </div>
  )
}
