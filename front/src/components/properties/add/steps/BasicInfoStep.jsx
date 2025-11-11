import React from 'react'

export default function BasicInfoStep({ form = {}, update }) {
  return (
    <div className="grid grid-cols-1 gap-6">
    <span class = "text-lg text-gray-600">Add more details, e.g. utilities, facilities...</span>
    
      <label className="block">
        <span className="text-lg font-medium">Property Title</span>
        <input
          className="mt-1 block w-full border-[#EAD1C7] border rounded-lg p-2 bg-white"
          value={form.title || ''}
          onChange={(e) => update({ title: e.target.value })}
          placeholder="e.g., Cozy Studio Near University"
        />
      </label>
      
      <label className="block">
        <span className="text-lg font-medium">Description</span>
        <textarea
          className="mt-1 block w-full border border-[#EAD1C7] rounded-lg p-2 bg-white"
          rows={3}
          value={form.description || ''}
          onChange={(e) => update({ description: e.target.value })}
          placeholder='Write...'
        />
      </label>
    </div>
  )
}
