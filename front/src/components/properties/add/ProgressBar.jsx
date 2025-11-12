import React from 'react'

export default function ProgressBar({ current = 0, total = 1 }) {
  const pct = Math.round(((current + 1) / total) * 100)
  return (
    <div>
      <div className="text-xs text-gray-600 mb-2">{pct}% complete</div>
      <div className="w-full bg-gray-100 h-2 rounded">
        <div className="bg-[#F35E27] h-2 rounded" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
