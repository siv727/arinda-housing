import React from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function FeatureCard({ item, checked = false, onToggle = () => {}, idPrefix = 'feat' }) {
  return (
    <Label
      key={item.key}
      className={`group flex items-center justify-between gap-3  rounded-lg border p-4 transition ${
        checked ? 'border-[#F35E27] bg-[#FFF8F2]/30' : 'border-[#EAD1C7] bg-white'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-12 h-12 rounded-full text-gray-600 group-hover:border-gray-300">
          <i className={`${item.icon} text-2xl`}></i>
        </div>
        <div className="grid gap-1.5 font-normal">
          <p className="text-base leading-none font-medium">{item.label}</p>
        </div>
      </div>

      <Checkbox
        id={`${idPrefix}-${item.key}`}
        checked={checked}
        onCheckedChange={onToggle}
        className={`${checked ? 'data-[state=checked]:border-[#F35E27] data-[state=checked]:bg-[#F35E27] text-white' : ''}`}
      />
    </Label>
  )
}
