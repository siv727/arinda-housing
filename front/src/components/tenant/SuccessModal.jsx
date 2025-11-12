const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full text-center shadow-2xl">
        {/* Green checkmark icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
            <i className="fa-solid fa-check text-white text-3xl"></i>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted!</h2>

        {/* Message */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          Your application has been successfully submitted. The landlord will review it and get back to you within 24-48 hours.
        </p>

        {/* Button */}
        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-[#DD4912] to-[#FFA500] text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
        >
          Got it, thanks!
        </button>
      </div>
    </div>
  )
}

export default SuccessModal
