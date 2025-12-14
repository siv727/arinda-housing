import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import Navbar from '../../components/tenant/Navbar'
import ListingSummaryCard from '../../components/tenant/ListingSummaryCard'
import BookingFormCard from '../../components/tenant/BookingFormCard'
import SuccessModal from '../../components/tenant/SuccessModal'
import { getListingById } from '../../api/listingApi'
import { getProfile } from '../../api/profileApi'
import { submitApplication } from '../../api/applicationApi'

const BookingForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  
  // Get moveInDate and leaseTerm from navigation state
  const { moveInDate: initialMoveInDate, leaseTerm: initialLeaseTerm } = location.state || {}

  // State
  const [listing, setListing] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  // Fetch listing and user profile on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Fetch both in parallel
        const [listingRes, profileRes] = await Promise.all([
          getListingById(id),
          getProfile()
        ])

        // Map listing data (same structure as ListingDetail)
        const data = listingRes.data
        const mappedListing = {
          id: data.id,
          title: data.title,
          description: data.description,
          images: data.photodetails?.map(p => p.url) || [],
          image: data.photodetails?.[0]?.url || null,
          roomType: data.roomtype,
          propertyType: data.propertytype,
          location: data.location,
          rating: data.reviewsummary?.averagerating || 0,
          reviewCount: data.reviewsummary?.totalreviews || 0,
          price: data.pricingdetails?.monthlyrent,
          displayPrice: data.monthlyrent,
          securityDeposit: data.pricingdetails?.securitydeposit,
          applicationFee: data.pricingdetails?.appfee,
          amenities: data.amenities || [],
          inclusions: data.inclusions || [],
          host: {
            name: data.hostname,
            email: data.hostemail,
            phone: data.hostphonenumber
          }
        }

        setListing(mappedListing)
        setUserProfile(profileRes.data)
      } catch (err) {
        console.error('Failed to fetch data:', err)
        setError('Failed to load booking form. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchData()
    }
  }, [id])

  const handleFormSubmit = async (formData) => {
    setSubmitting(true)
    setSubmitError(null)
    
    try {
      await submitApplication({
        listingId: listing.id,
        moveInDate: formData.moveInDate,
        phoneNumber: formData.phoneNumber,
        applicantMessage: formData.additionalNotes
      })
      setShowSuccessModal(true)
    } catch (err) {
      console.error('Failed to submit application:', err)
      setSubmitError(err?.response?.data?.message || err?.response?.data?.error || 'Failed to submit application. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleModalClose = () => {
    setShowSuccessModal(false)
    navigate('/tenant/applications')
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-8">
          <div className="text-center py-12">
            <div className="text-orange-600 text-xl font-semibold">Loading...</div>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !listing) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{error || 'Listing not found'}</h1>
          <Link to="/tenant/listings" className="text-orange-600 hover:underline">
            Back to Listings
          </Link>
        </div>
      </div>
    )
  }

  // Prepare initial form data from user profile and navigation state
  const initialFormData = {
    firstName: userProfile?.firstname || '',
    lastName: userProfile?.lastname || '',
    email: userProfile?.email || '',
    phoneNumber: '', // User must enter
    moveInDate: initialMoveInDate || '',
    studentId: userProfile?.studentid || '',
    university: userProfile?.school || '',
    additionalNotes: ''
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
            <BookingFormCard 
              listing={listing}
              initialData={initialFormData}
              leaseTerm={initialLeaseTerm}
              onSubmit={handleFormSubmit}
              submitting={submitting}
              submitError={submitError}
            />
          </div>

          {/* Right Column - Listing Summary */}
          <div className="lg:col-span-1">
            <ListingSummaryCard listing={listing} leaseTerm={initialLeaseTerm} />
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal isOpen={showSuccessModal} onClose={handleModalClose} />
    </div>
  )
}

export default BookingForm
