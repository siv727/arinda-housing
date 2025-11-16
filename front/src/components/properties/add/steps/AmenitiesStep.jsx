import React from 'react'
import FeatureCard from './FeatureCard'

const AMENITIES = [
  { key: 'No Amenities', label: 'No Amenities', icon: 'fa-regular fa-circle-xmark' },
  { key: 'Air Conditioning', label: 'Air Conditioning', icon: 'fa-regular fa-snowflake' },
  { key: 'Laundry Area', label: 'Laundry Area', icon: 'fa-regular fa-shirt' },
  { key: 'Kitchen', label: 'Kitchen', icon: 'fa-regular fa-kitchen-set' },
  { key: 'Furniture', label: 'Fully Furnished', icon: 'fa-regular fa-couch' },
  { key: 'Parking Space', label: 'Parking Space', icon: 'fa-regular fa-car' },
  { key: 'Security', label: 'Security', icon: 'fa-regular fa-shield-halved' },
  { key: 'Pet Friendly', label: 'Pet Friendly', icon: 'fa-regular fa-paw' },
  { key: 'Swimming Pool', label: 'Swimming Pool', icon: 'fa-regular fa-water-ladder' },
  { key: 'Gym', label: 'Gym', icon: 'fa-regular fa-dumbbell' },
  { key: 'Study Area', label: 'Study Area', icon: 'fa-regular fa-book' },
]

export default function AmenitiesStep({ form = {}, update }) {
  const NO_KEY = 'No Amenities'

  const togg = (amen) => {
    const current = new Set(form.amenities || [])

    // Toggling the No Amenities option
    if (amen === NO_KEY) {
      if (current.has(NO_KEY)) {
        // remove
        current.delete(NO_KEY)
        update({ amenities: Array.from(current) })
      } else {
        // set only No Amenities
        update({ amenities: [NO_KEY] })
      }
      return
    }

    //  other amenity
    if (current.has(amen)) {
      current.delete(amen)
    } else {
      // if No Amenities is currently set, remove it first
      if (current.has(NO_KEY)) current.delete(NO_KEY)
      current.add(amen)
    }

    update({ amenities: Array.from(current) })
  }

  const noSelected = (form.amenities || []).includes(NO_KEY)

  return (
    <div>
      <p className="text-lg text-gray-600 mb-4">
        Select amenities that are available on your property.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {AMENITIES.map((a) => {
          const checked = (form.amenities || []).includes(a.key)
          const disabled = noSelected && a.key !== NO_KEY
          return (
            <FeatureCard key={a.key} item={a} checked={checked} onToggle={() => togg(a.key)} idPrefix="amen" disabled={disabled} />
          )
        })}
      </div>
    </div>
  )
}
