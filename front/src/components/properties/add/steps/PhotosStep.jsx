import React, { useState, useRef } from 'react'

export default function PhotosStep({ form = {}, update }) {
  const [error, setError] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  const validateAndAddFiles = (files) => {
    const fileArray = Array.from(files)
    
    // Validate file types
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    const invalidFiles = fileArray.filter(file => !validTypes.includes(file.type))
    
    if (invalidFiles.length > 0) {
      setError(`Invalid file type(s): ${invalidFiles.map(f => f.name).join(', ')}. Only JPG, PNG, GIF, and WebP images are allowed.`)
      return
    }
    
    // Validate file size (max 10MB per file)
    const maxSize = 10 * 1024 * 1024 // 10MB
    const oversizedFiles = fileArray.filter(file => file.size > maxSize)
    
    if (oversizedFiles.length > 0) {
      setError(`File(s) too large: ${oversizedFiles.map(f => f.name).join(', ')}. Maximum size is 10MB per file.`)
      return
    }
    
    setError('')
    update({ photos: [...(form.photos || []), ...fileArray] })
  }

  const onFileInputChange = (e) => {
    const files = e.target.files
    if (files && files.length > 0) {
      validateAndAddFiles(files)
    }
    // Reset input so selecting the same file again works
    e.target.value = ''
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    // Only set to false if we're leaving the drop zone entirely
    if (e.currentTarget.contains(e.relatedTarget)) return
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    
    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      validateAndAddFiles(files)
    }
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

      {/* Upload Drop Zone with photos inside */}
      <div 
        className={`w-full border-2 border-dashed rounded-xl bg-white min-h-[300px] p-6 transition-colors ${
          isDragging 
            ? 'border-[#F35E27] bg-orange-50' 
            : 'border-[#EAD1C7]'
        }`}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Upload prompt area - always at top */}
        <div className="flex flex-col items-center justify-center text-center mb-6">
          <i className={`fa-light fa-photo-film text-5xl mb-4 ${isDragging ? 'text-[#F35E27]' : 'text-gray-400'}`}></i>

          <div className="mb-4">
            <p className="font-medium text-[22px] mb-1">
              {isDragging ? 'Drop your photos here' : 'Drag and drop'}
            </p>
            <p className="text-gray-700 text-sm">
              or browse for photos
            </p>
          </div>

          <label
            htmlFor="file-upload"
            className="bg-[#FFF8F2] text-[#F35E27] px-6 py-2 rounded-lg font-semibold cursor-pointer hover:bg-orange-100 transition"
          >
            Browse
          </label>
          <input
            id="file-upload"
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
            onChange={onFileInputChange}
            className="hidden"
          />
        </div>

        {/* Photo Preview Grid - inside the same container */}
        {totalPhotos > 0 && (
          <div className="border-t border-[#EAD1C7] pt-4">
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {/* Existing photos */}
              {form.existingPhotos?.map((url, i) => (
                <div
                  key={`existing-${i}`}
                  className="relative aspect-square rounded-lg overflow-hidden group bg-gray-100"
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
                    <i className="fa-solid fa-xmark text-xs"></i>
                  </button>
                </div>
              ))}
              
              {/* New photos */}
              {form.photos?.map((f, i) => (
                <div
                  key={`new-${i}`}
                  className="relative aspect-square rounded-lg overflow-hidden group bg-gray-100"
                >
                  <img 
                    src={URL.createObjectURL(f)} 
                    alt={f.name}
                    className="w-full h-full object-cover"
                  />
                  {/* File name tooltip on hover */}
                  <div className="absolute inset-x-0 bottom-0 bg-black/60 text-white text-xs p-1 truncate opacity-0 group-hover:opacity-100 transition">
                    {f.name}
                  </div>
                  <button
                    onClick={() => removeNewPhoto(i)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                  >
                    <i className="fa-solid fa-xmark text-xs"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Photo counter */}
      <p className="text-center text-sm text-gray-600">
        {totalPhotos} photo{totalPhotos !== 1 ? 's' : ''} selected (minimum 5 required)
      </p>

      {/* Error message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          <i className="fa-solid fa-exclamation-triangle mr-2"></i>
          {error}
        </div>
      )}
    </div>
  )
}
