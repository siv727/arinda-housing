import { useState } from 'react'
import { Link } from 'react-router-dom'

const BookingInfoCard = ({ listing }) => {
  const [moveInDate, setMoveInDate] = useState('')
  const [leaseTerm, setLeaseTerm] = useState('6') // Default 6 months
  const [isFavorite, setIsFavorite] = useState(false)

  // Calculate total move-in cost
  const monthlyRent = listing.price
  const securityDeposit = listing.securityDeposit || 0
  const applicationFee = listing.applicationFee || 0
  const totalMoveInCost = monthlyRent + securityDeposit + applicationFee

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
      {/* Price and Favorite */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-3xl font-bold text-gray-900">₱{listing.price.toLocaleString()}</span>
          <span className="text-gray-600"> / month</span>
        </div>
        <button
          onClick={toggleFavorite}
          className="text-2xl cursor-pointer transition-colors"
          aria-label="Add to favorites"
        >
          <i className={`fa-${isFavorite ? 'solid' : 'regular'} fa-heart ${isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}></i>
        </button>
      </div>

      {/* Availability */}
      {listing.availability && (
        <div className="mb-4 pb-4 border-b border-gray-200">
          <p className="text-sm text-gray-600">
            <i className="fa-solid fa-calendar-check mr-2 text-orange-500"></i>
            Available from <span className="font-semibold text-gray-900">{listing.availability}</span>
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

      {/* Lease Term */}
      <div className="mb-6">
        <label htmlFor="leaseTerm" className="block text-sm font-semibold text-gray-700 mb-2">
          Lease Term
        </label>
        <select
          id="leaseTerm"
          value={leaseTerm}
          onChange={(e) => setLeaseTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent cursor-pointer"
        >
          <option value="3">3 months</option>
          <option value="6">6 months</option>
          <option value="9">9 months</option>
          <option value="12">12 months</option>
        </select>
      </div>

      {/* Book Now Button */}
      <Link
        to={`/tenant/listings/${listing.id}/book`}
        className="block w-full bg-gradient-to-r from-[#DD4912] to-[#FFA500] text-white font-bold py-3 rounded-lg text-center hover:opacity-90 transition-opacity mb-6 cursor-pointer"
      >
        Book Now
      </Link>

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
