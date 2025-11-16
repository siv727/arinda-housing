import React from 'react'

export default function ProgressBar({ current = 0, total = 1 }) {
  return (
    <div>
      <div className="flex gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="flex-1 h-2 rounded-t"
            style={{
              backgroundColor: i <= current ? '#F35E27' : '#e5e7eb',
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}
