import { useState, useEffect } from 'react'

const BookingFormCard = ({ 
  listing, 
  initialData = {}, 
  leaseTerm,
  onSubmit, 
  submitting = false,
  submitError = null 
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    moveInDate: '',
    studentId: '',
    university: '',
    additionalNotes: ''
  })

  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [errors, setErrors] = useState({})
  const [preFilledFields, setPreFilledFields] = useState({})

  // Pre-fill form with initial data when it becomes available
  useEffect(() => {
    if (initialData) {
      const newFormData = {
        firstName: initialData.firstName || '',
        lastName: initialData.lastName || '',
        email: initialData.email || '',
        phoneNumber: initialData.phoneNumber || '',
        moveInDate: initialData.moveInDate || '',
        studentId: initialData.studentId || '',
        university: initialData.university || '',
        additionalNotes: initialData.additionalNotes || ''
      }
      setFormData(newFormData)
      
      // Track which fields were pre-filled
      const filled = {}
      Object.keys(newFormData).forEach(key => {
        if (newFormData[key]) {
          filled[key] = true
        }
      })
      setPreFilledFields(filled)
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required'
    } else {
      const phoneDigits = formData.phoneNumber.replace(/[\s-]/g, '')
      if (!/^(09|\+639)\d{9}$/.test(phoneDigits)) {
        newErrors.phoneNumber = 'Please enter a valid Philippine mobile number'
      }
    }
    
    if (!formData.moveInDate) {
      newErrors.moveInDate = 'Move-in date is required'
    }
    
    if (!formData.studentId.trim()) newErrors.studentId = 'Student ID is required'
    if (!formData.university.trim()) newErrors.university = 'University is required'
    
    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  // Helper to get input styling based on pre-filled status
  const getInputClass = (fieldName) => {
    const baseClass = 'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:opacity-50 transition-colors'
    const errorClass = errors[fieldName] ? 'border-red-500' : ''
    const preFilledClass = preFilledFields[fieldName] ? 'bg-blue-50/50 border-blue-200' : 'bg-gray-50 border-gray-300'
    
    if (errors[fieldName]) {
      return `${baseClass} border-red-500 bg-red-50`
    }
    return `${baseClass} ${preFilledClass}`
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8 mt-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Book Your Stay</h2>
      <p className="text-gray-600 mb-6">Complete the form below to submit your booking application</p>

      {/* Pre-fill notice */}
      <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2">
        <i className="fa-solid fa-circle-info text-blue-500"></i>
        <p className="text-blue-700 text-sm">
          We've pre-filled some fields from your profile to save you time. Feel free to edit if needed.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* First Name and Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              disabled={submitting}
              className={getInputClass('firstName')}
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              disabled={submitting}
              className={getInputClass('lastName')}
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>
        </div>

        {/* Email and Phone Number */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              disabled={submitting}
              className={getInputClass('email')}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="09XX XXX XXXX"
              disabled={submitting}
              className={getInputClass('phoneNumber')}
            />
            {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
          </div>
        </div>

        {/* Move-in Date and Student ID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="moveInDate" className="block text-sm font-semibold text-gray-700 mb-2">
              Move-in Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="moveInDate"
              name="moveInDate"
              value={formData.moveInDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              disabled={submitting}
              className={getInputClass('moveInDate')}
            />
            {errors.moveInDate && <p className="text-red-500 text-xs mt-1">{errors.moveInDate}</p>}
          </div>

          <div>
            <label htmlFor="studentId" className="block text-sm font-semibold text-gray-700 mb-2">
              Student ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              placeholder="Enter your student ID"
              disabled={submitting}
              className={getInputClass('studentId')}
            />
            {errors.studentId && <p className="text-red-500 text-xs mt-1">{errors.studentId}</p>}
          </div>
        </div>

        {/* University */}
        <div className="mb-4">
          <label htmlFor="university" className="block text-sm font-semibold text-gray-700 mb-2">
            University <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="university"
            name="university"
            value={formData.university}
            onChange={handleChange}
            placeholder="Enter your university"
            disabled={submitting}
            className={getInputClass('university')}
          />
          {errors.university && <p className="text-red-500 text-xs mt-1">{errors.university}</p>}
        </div>

        {/* Additional Notes */}
        <div className="mb-6">
          <label htmlFor="additionalNotes" className="block text-sm font-semibold text-gray-700 mb-2">
            Additional Notes <span className="text-gray-400">(optional)</span>
          </label>
          <textarea
            id="additionalNotes"
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
            placeholder="Any additional information you'd like to share with the landlord..."
            rows="4"
            disabled={submitting}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none disabled:opacity-50"
          ></textarea>
        </div>

        {/* Terms and Conditions */}
        <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              disabled={submitting}
              className="mt-1 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
            />
            <span className="text-sm text-gray-700">
              I agree to the <a href="#" className="text-orange-600 hover:underline">Terms and Conditions</a> and <a href="#" className="text-orange-600 hover:underline">Privacy Policy</a>. I understand that this application does not guarantee approval and that additional documentation may be required.
            </span>
          </label>
        </div>

        {/* Validation/Submit Errors - positioned above button */}
        {(errors.terms || submitError) && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <i className="fa-solid fa-circle-exclamation text-red-500"></i>
            <p className="text-red-700">{errors.terms || submitError}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-gradient-to-r from-[#DD4912] to-[#FFA500] text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <i className="fa-solid fa-spinner fa-spin"></i>
              Submitting...
            </>
          ) : (
            'Submit Application'
          )}
        </button>
      </form>
    </div>
  )
}

export default BookingFormCard
