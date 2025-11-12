import { useState } from 'react'

const PhotoGallery = ({ images, title }) => {
  const [showModal, setShowModal] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const openModal = (index = 0) => {
    setCurrentImageIndex(index)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  if (!images || images.length === 0) return null

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 gap-2 rounded-lg overflow-hidden h-[400px]">
        {/* Main large image */}
        <div 
          className="col-span-1 row-span-2 cursor-pointer relative group"
          onClick={() => openModal(0)}
        >
          <img
            src={images[0]}
            alt={`${title} - main`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
        </div>

        {/* Smaller images on the right */}
        <div className="grid grid-cols-2 gap-2">
          {images.slice(1, 5).map((image, index) => (
            <div
              key={index}
              className="relative cursor-pointer group h-[196px]"
              onClick={() => openModal(index + 1)}
            >
              <img
                src={image}
                alt={`${title} - ${index + 2}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
              
              {/* Show all photos button on last image */}
              {index === 3 && images.length > 5 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    openModal(0)
                  }}
                  className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-semibold hover:bg-black/70 transition-colors"
                >
                  <i className="fa-regular fa-images mr-2"></i>
                  Show all photos
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 z-10"
            aria-label="Close gallery"
          >
            <i className="fa-solid fa-times"></i>
          </button>

          {/* Previous button */}
          {images.length > 1 && (
            <button
              onClick={prevImage}
              className="absolute left-4 text-white text-4xl hover:text-gray-300 z-10"
              aria-label="Previous image"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
          )}

          {/* Main image */}
          <div className="max-w-5xl max-h-[90vh] flex flex-col items-center">
            <img
              src={images[currentImageIndex]}
              alt={`${title} - ${currentImageIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain"
            />
            <p className="text-white mt-4 text-sm">
              {currentImageIndex + 1} / {images.length}
            </p>
          </div>

          {/* Next button */}
          {images.length > 1 && (
            <button
              onClick={nextImage}
              className="absolute right-4 text-white text-4xl hover:text-gray-300 z-10"
              aria-label="Next image"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          )}

          {/* Thumbnail strip */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-4xl overflow-x-auto p-2">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-16 h-16 object-cover cursor-pointer rounded ${
                  index === currentImageIndex ? 'ring-2 ring-white' : 'opacity-60 hover:opacity-100'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default PhotoGallery
