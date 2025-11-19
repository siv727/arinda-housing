import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Navbar from '../../components/tenant/Navbar'
import ListingSummaryCard from '../../components/tenant/ListingSummaryCard'
import BookingFormCard from '../../components/tenant/BookingFormCard'
import SuccessModal from '../../components/tenant/SuccessModal'
import { mockListings } from '../../data/mockListings'

const BookingForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const listing = mockListings.find((l) => l.id === parseInt(id))
  
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Listing not found</h1>
          <Link to="/tenant/listings" className="text-orange-600 hover:underline">
            Back to Listings
          </Link>
        </div>
      </div>
    )
  }

  const handleFormSubmit = (formData) => {
    // In a real app, this would send data to the backend
    console.log('Booking application submitted:', {
      listingId: listing.id,
      listingTitle: listing.title,
      ...formData
    })
    
    // Show success modal
    setShowSuccessModal(true)
  }

  const handleModalClose = () => {
    setShowSuccessModal(false)
    // Navigate back to listings page
    navigate('/tenant/listings')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-8">
        {/* Back Button */}
        <Link
          to={`/tenant/listings/${listing.id}`}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 cursor-pointer"
        >
          <i className="fa-solid fa-arrow-left mr-2"></i>
          Back to Listing
        </Link>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Booking Form */}
          <div className="lg:col-span-2">
            <BookingFormCard listing={listing} onSubmit={handleFormSubmit} />
          </div>

          {/* Right Column - Listing Summary */}
          <div className="lg:col-span-1">
            <ListingSummaryCard listing={listing} />
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal isOpen={showSuccessModal} onClose={handleModalClose} />
    </div>
  )
}

export default BookingForm
