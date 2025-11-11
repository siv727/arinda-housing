import React from 'react'

export default function PhotosStep({ form = {}, update }) {
  const onFiles = (e) => {
    const files = Array.from(e.target.files || [])
    update({ photos: files })
  }

  return (
     <div className="space-y-6">
      <p className="text-lg text-gray-600 mb-4">
        You'll need at least 5 photos to get started. You can add more or make
        changes later.
      </p>

      <div className="w-full border-2 border-dashed border-[#EAD1C7] rounded-xl bg-white h-[400px] flex flex-col items-center justify-center text-center space-y-4">

        <i class="fa-light fa-photo-film text-5xl"></i>

        {/* Upload message */}
        <div>
          <p className=" font-medium text-[22px] mb-2">
            Drag and drop
          </p>
          <p class = "text-gray-700 text-sm">
            or browse for photos
          </p>
        </div>

        {/* Browse button */}
        <label
          htmlFor="file-upload"
          className="bg-[#FFF8F2] text-[#F35E27] px-6 py-2 rounded-lg font-semibold cursor-pointer hover:bg-orange-100 transition"
        >
          Browse
        </label>
        <input
          id="file-upload"
          type="file"
          multiple
          onChange={onFiles}
          className="hidden"
        />

        {/* Preview area */}
        {form.photos?.length > 0 && (
          <div className="mt-6 flex gap-3 flex-wrap justify-center">
            {form.photos.map((f, i) => (
              <div
                key={i}
                className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-500"
              >
                {f.name || "photo"}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
      
  )
}
