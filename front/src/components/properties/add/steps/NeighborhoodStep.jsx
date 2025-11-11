import React from 'react'
import FeatureCard from './FeatureCard'

const NEIGHBORHOOD = [
  { key: 'Carenderia', label: 'Carenderia', icon: 'fa-regular fa-bowl-food' },
  { key: 'Convenience Store', label: 'Convenience Store', icon: 'fa-regular fa-store' },
  { key: 'Pharmacy', label: 'Pharmacy', icon: 'fa-regular fa-prescription-bottle-medical' },
  { key: 'Hospital', label: 'Hospital', icon: 'fa-regular fa-hospital' },
  { key: 'Terminal', label: 'Terminal', icon: 'fa-regular fa-bus' },
  { key: 'Bus Stop', label: 'Bus Stop', icon: 'fa-regular fa-bus-simple' },
  { key: 'Market', label: 'Market', icon: 'fa-regular fa-shop' },
  { key: 'Mall', label: 'Mall', icon: 'fa-regular fa-bag-shopping' },
  { key: 'School', label: 'School', icon: 'fa-regular fa-school' },
  { key: 'Church', label: 'Church', icon: 'fa-regular fa-church' },
  { key: 'Bank', label: 'Bank', icon: 'fa-regular fa-building-columns' },
  { key: 'ATM', label: 'ATM', icon: 'fa-regular fa-credit-card' },
  { key: 'Gas Station', label: 'Gas Station', icon: 'fa-regular fa-gas-pump' },
  { key: 'Park', label: 'Park', icon: 'fa-regular fa-tree' },
]

export default function NeighborhoodStep({ form = {}, update }) {
  const togg = (item) => {
    const set = new Set(form.neighborhood || [])
    if (set.has(item)) set.delete(item)
    else set.add(item)
    update({ neighborhood: Array.from(set) })
  }

  return (
    <div>
      <p className="text-lg text-gray-600 mb-4">
        Select neighborhood features and nearby points of interest.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {NEIGHBORHOOD.map((n) => {
          const checked = (form.neighborhood || []).includes(n.key)
          return <FeatureCard key={n.key} item={n} checked={checked} onToggle={() => togg(n.key)} idPrefix="neigh" />
        })}
      </div>
    </div>
  )
}
