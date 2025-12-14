import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { checkApplicationEligibility } from '../../api/applicationApi'

const BookingInfoCard = ({ listing }) => {
  // Parse lease terms from listing or use defaults
  const leaseTermOptions = listing.leaseterms && listing.leaseterms.length > 0
    ? listing.leaseterms.map(term => {
        // Extract number from strings like "6 months" or just use the value
        const months = parseInt(term) || term
        return { value: String(months).replace(' months', ''), label: term }
      })
    : [
        { value: '6', label: '6 months' },
        { value: '12', label: '12 months' }
      ]

  const [moveInDate, setMoveInDate] = useState('')
  const [leaseTerm, setLeaseTerm] = useState(leaseTermOptions[0]?.value || '6')
  
  // Eligibility state
  const [eligibility, setEligibility] = useState(null)
  const [eligibilityLoading, setEligibilityLoading] = useState(true)
  const [timeRemaining, setTimeRemaining] = useState(null)

  // Update default lease term when options change
  useEffect(() => {
    if (leaseTermOptions.length > 0 && !leaseTermOptions.find(opt => opt.value === leaseTerm)) {
      setLeaseTerm(leaseTermOptions[0].value)
    }
  }, [listing.leaseterms])

  // Check eligibility on mount
  useEffect(() => {
    const fetchEligibility = async () => {
      try {
        setEligibilityLoading(true)
        const response = await checkApplicationEligibility(listing.id)
        setEligibility(response.data)
        
        // Calculate time remaining for countdown
        if (response.data.blockedUntil) {
          const blockedUntil = new Date(response.data.blockedUntil)
          const now = new Date()
          const diffMs = blockedUntil - now
          if (diffMs > 0) {
            setTimeRemaining(Math.ceil(diffMs / 1000))
          }
        }
      } catch (err) {
        console.error('Failed to check eligibility:', err)
        // If check fails, allow booking (backend will validate)
        setEligibility({ canApply: true, reason: 'ELIGIBLE' })
      } finally {
        setEligibilityLoading(false)
      }
    }

    if (listing?.id) {
      fetchEligibility()
    }
  }, [listing?.id])

  // Countdown timer
  useEffect(() => {
    if (!timeRemaining || timeRemaining <= 0) return

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          // Refresh eligibility when timer expires
          checkApplicationEligibility(listing.id).then(response => {
            setEligibility(response.data)
          }).catch(() => {})
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeRemaining, listing?.id])

  // Format time remaining for display
  const formatTimeRemaining = (seconds) => {
    if (!seconds || seconds <= 0) return null
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  // Pricing details
  const monthlyRent = listing.price || 0
  const securityDeposit = listing.securityDeposit || 0
  const applicationFee = listing.applicationFee || 0
  const petFee = listing.petFee || 0
  const advanceRent = listing.advanceRent || 0
  const advanceRentCost = listing.advanceRentCost || 0
  
  // Use backend total if available, otherwise calculate
  const totalMoveInCost = listing.totalMoveInCost || (monthlyRent + securityDeposit + applicationFee + petFee + advanceRentCost)

  // Render the appropriate button/badge based on eligibility
  const renderBookingButton = () => {
    if (eligibilityLoading) {
      return (
        <div className="w-full bg-gray-100 text-gray-400 font-bold py-3 rounded-lg text-center mb-6">
          <i className="fa-solid fa-spinner fa-spin mr-2"></i>
          Checking availability...
        </div>
      )
    }

    if (!eligibility || eligibility.canApply) {
      // Eligible - show normal Book Now button
      return (
        <Link
          to={`/tenant/listings/${listing.id}/book`}
          state={{ moveInDate, leaseTerm }}
          className="block w-full bg-gradient-to-r from-[#DD4912] to-[#FFA500] text-white font-bold py-3 rounded-lg text-center hover:opacity-90 transition-opacity mb-6 cursor-pointer"
        >
          Book Now
        </Link>
      )
    }

    // Not eligible - show status badge
    const getStatusConfig = () => {
      switch (eligibility.reason) {
        case 'PENDING':
          return {
            icon: 'fa-clock',
            bgClass: 'bg-yellow-100 border-yellow-300',
            textClass: 'text-yellow-800',
            iconClass: 'text-yellow-600',
            title: 'Pending Application',
            subtitle: 'Waiting for landlord review'
          }
        case 'HAS_ACTIVE_LEASE':
          return {
            icon: 'fa-house-lock',
            bgClass: 'bg-red-100 border-red-300',
            textClass: 'text-red-800',
            iconClass: 'text-red-600',
            title: 'Active Lease Exists',
            subtitle: 'You cannot apply while you have an active lease'
          }
        case 'ACTIVE_LEASE':
          return {
            icon: 'fa-home',
            bgClass: 'bg-blue-100 border-blue-300',
            textClass: 'text-blue-800',
            iconClass: 'text-blue-600',
            title: 'Active Lease',
            subtitle: 'You have an active lease here'
          }
        case 'COOLDOWN':
          return {
            icon: 'fa-hourglass-half',
            bgClass: 'bg-orange-100 border-orange-300',
            textClass: 'text-orange-800',
            iconClass: 'text-orange-600',
            title: 'Cooldown Period',
            subtitle: timeRemaining && timeRemaining > 0 
              ? `Can reapply in ${formatTimeRemaining(timeRemaining)}`
              : 'Please wait before reapplying'
          }
        default:
          return {
            icon: 'fa-circle-xmark',
            bgClass: 'bg-gray-100 border-gray-300',
            textClass: 'text-gray-800',
            iconClass: 'text-gray-600',
            title: 'Cannot Apply',
            subtitle: 'Not eligible at this time'
          }
      }
    }

    const config = getStatusConfig()

    return (
      <div className={`w-full ${config.bgClass} border rounded-lg py-4 px-4 mb-6`}>
        <div className="flex items-center gap-3">
          <div className={`${config.iconClass} text-2xl`}>
            <i className={`fa-solid ${config.icon}`}></i>
          </div>
          <div className="flex-1">
            <div className={`font-bold ${config.textClass}`}>{config.title}</div>
            <div className={`text-sm ${config.textClass} opacity-80`}>{config.subtitle}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
      {/* Price */}
      <div className="mb-4">
        <div>
          <span className="text-3xl font-bold text-gray-900">₱{monthlyRent.toLocaleString()}</span>
          <span className="text-gray-600"> / month</span>
        </div>
      </div>

      {/* Availability */}
      {(listing.availability || listing.availableDate) && (
        <div className="mb-4 pb-4 border-b border-gray-200">
          <p className="text-sm text-gray-600">
            <i className="fa-solid fa-calendar-check mr-2 text-orange-500"></i>
            Available from <span className="font-semibold text-gray-900">{listing.availability || listing.availableDate}</span>
          </p>
        </div>
      )}

      {/* Move-in Date */}
      <div className="mb-4">
        <label htmlFor="moveInDate" className="block text-sm font-semibold text-gray-700 mb-2">
          Move-in Date
        </label>
        <input
          type="date"
          id="moveInDate"
          value={moveInDate}
          onChange={(e) => setMoveInDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
      </div>

      {/* Lease Term - Dynamic from listing */}
      <div className="mb-6">
        <label htmlFor="leaseTerm" className="block text-sm font-semibold text-gray-700 mb-2">
          Lease Term
        </label>
        <div className="relative">
          <select
            id="leaseTerm"
            value={leaseTerm}
            onChange={(e) => setLeaseTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent cursor-pointer appearance-none bg-white"
          >
            {leaseTermOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
            <i className="fa-solid fa-chevron-down text-xs"></i>
          </div>
        </div>
      </div>

      {/* Book Now Button or Status Badge */}
      {renderBookingButton()}

      {/* Cost Breakdown */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900 mb-3">Move-in Cost Breakdown</h3>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Monthly Rent</span>
          <span className="font-semibold text-gray-900">₱{monthlyRent.toLocaleString()}</span>
        </div>

        {securityDeposit > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Security Deposit</span>
            <span className="font-semibold text-gray-900">₱{securityDeposit.toLocaleString()}</span>
          </div>
        )}

        {applicationFee > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Application Fee</span>
            <span className="font-semibold text-gray-900">₱{applicationFee.toLocaleString()}</span>
          </div>
        )}

        {petFee > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Pet Fee</span>
            <span className="font-semibold text-gray-900">₱{petFee.toLocaleString()}</span>
          </div>
        )}

        {advanceRent > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Advance Rent ({advanceRent} month{advanceRent > 1 ? 's' : ''})</span>
            <span className="font-semibold text-gray-900">₱{advanceRentCost.toLocaleString()}</span>
          </div>
        )}

        <div className="pt-3 border-t border-gray-200 flex justify-between">
          <span className="font-bold text-gray-900">Total Move-in Cost</span>
          <span className="font-bold text-orange-600 text-lg">₱{totalMoveInCost.toLocaleString()}</span>
        </div>
      </div>

      {/* Note */}
      <p className="text-xs text-gray-500 mt-4 text-center">
        <i className="fa-solid fa-info-circle mr-1"></i>
        Security deposit is refundable
      </p>
    </div>
  )
}

export default BookingInfoCard