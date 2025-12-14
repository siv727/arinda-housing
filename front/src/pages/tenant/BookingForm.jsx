import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import Navbar from '../../components/tenant/Navbar'
import ListingSummaryCard from '../../components/tenant/ListingSummaryCard'
import BookingFormCard from '../../components/tenant/BookingFormCard'
import SuccessModal from '../../components/tenant/SuccessModal'
import { getListingById } from '../../api/listingApi'
import { getProfile } from '../../api/profileApi'
import { submitApplication, checkApplicationEligibility } from '../../api/applicationApi'

const BookingForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  
  // Get moveInDate and leaseTerm from navigation state (pre-selected from listing page)
  const { moveInDate: initialMoveInDate, leaseTerm: initialLeaseTerm } = location.state || {}

  // State
  const [listing, setListing] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  
  // Booking details state (editable in ListingSummaryCard)
  const [moveInDate, setMoveInDate] = useState(initialMoveInDate || '')
  const [leaseTerm, setLeaseTerm] = useState(initialLeaseTerm || '12')

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
          leaseterms: data.leaseterms || [],
          host: {
            name: data.hostname,
            email: data.hostemail,
            phone: data.hostphonenumber
          }
        }

        setListing(mappedListing)
        setUserProfile(profileRes.data)
        
        // Set default lease term from listing if not already set
        if (!initialLeaseTerm && data.leaseterms && data.leaseterms.length > 0) {
          const firstTerm = parseInt(data.leaseterms[0]) || 12
          setLeaseTerm(String(firstTerm).replace(' months', ''))
        }
        
        // Fallback eligibility check - redirect if not eligible
        // (In case user navigates directly to booking URL)
        try {
          const eligibilityRes = await checkApplicationEligibility(data.id)
          if (!eligibilityRes.data.canApply) {
            // Redirect back to listing page - the BookingInfoCard will show the status
            navigate(`/tenant/listings/${id}`, { replace: true })
            return
          }
        } catch (eligErr) {
          // If eligibility check fails, continue (backend will validate on submit)
          console.error('Eligibility check failed:', eligErr)
        }
      } catch (err) {
        console.error('Failed to fetch data:', err)
        const errorMsg = err.response?.data?.error || err.response?.data?.message || 'Failed to load booking form. Please try again.'
        setError(errorMsg)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchData()
    }
  }, [id, navigate])

  const handleFormSubmit = async (formData) => {
    // Validate booking details
    if (!moveInDate) {
      setSubmitError('Please select a move-in date in the booking details panel.')
      return
    }
    
    setSubmitting(true)
    setSubmitError(null)
    
    try {
      await submitApplication({
        listingId: listing.id,
        moveInDate: moveInDate,
        phoneNumber: formData.phoneNumber,
        applicantMessage: formData.additionalNotes,
        leaseTerm: parseInt(leaseTerm) || 12
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
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{error || 'Listing not found'}</h1>
            <Link to="/tenant/listings" className="text-orange-600 hover:underline">
              Back to Listings
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Prepare initial form data from user profile
  const initialFormData = {
    firstName: userProfile?.firstname || '',
    lastName: userProfile?.lastname || '',
    email: userProfile?.email || '',
    phoneNumber: '',
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

        {/* Main Grid Layout - Equal Width Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-4">
          {/* Left Column - Booking Form */}
          <div className="col-span-6">
            <BookingFormCard 
              listing={listing}
              initialData={initialFormData}
              onSubmit={handleFormSubmit}
              submitting={submitting}
              submitError={submitError}
            />
          </div>

          {/* Right Column - Listing Summary with Editable Booking Details */}
          <div className="col-span-5">
            <ListingSummaryCard 
              listing={listing} 
              moveInDate={moveInDate}
              leaseTerm={leaseTerm}
              onMoveInDateChange={setMoveInDate}
              onLeaseTermChange={setLeaseTerm}
            />
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal isOpen={showSuccessModal} onClose={handleModalClose} />
    </div>
  )
}

export default BookingForm
