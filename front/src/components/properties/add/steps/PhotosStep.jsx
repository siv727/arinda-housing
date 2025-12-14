import React from 'react'

export default function PhotosStep({ form = {}, update }) {
  const onFiles = (e) => {
    const files = Array.from(e.target.files || [])
    update({ photos: [...(form.photos || []), ...files] })
  }

  const removeExistingPhoto = (index) => {
    const updated = [...(form.existingPhotos || [])]
    updated.splice(index, 1)
    update({ existingPhotos: updated })
  }

  const removeNewPhoto = (index) => {
    const updated = [...(form.photos || [])]
    updated.splice(index, 1)
    update({ photos: updated })
  }

  const totalPhotos = (form.existingPhotos?.length || 0) + (form.photos?.length || 0)

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
        <div className="w-full">
          {totalPhotos > 0 && (
            <div className="mt-6 flex gap-3 flex-wrap justify-center">
              {/* Existing photos */}
              {form.existingPhotos?.map((url, i) => (
                <div
                  key={`existing-${i}`}
                  className="relative w-24 h-24 rounded-lg overflow-hidden group"
                >
                  <img 
                    src={url} 
                    alt={`Photo ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removeExistingPhoto(i)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                  >
                    ×
                  </button>
                </div>
              ))}
              
              {/* New photos */}
              {form.photos?.map((f, i) => (
                <div
                  key={`new-${i}`}
                  className="relative w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-500 group"
                >
                  {f.name || "photo"}
                  <button
                    onClick={() => removeNewPhoto(i)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          
          <p className="text-center text-sm text-gray-600 mt-4">
            {totalPhotos} photo{totalPhotos !== 1 ? 's' : ''} selected (minimum 5 required)
          </p>
        </div>
      </div>
    </div>
      
  )
}
