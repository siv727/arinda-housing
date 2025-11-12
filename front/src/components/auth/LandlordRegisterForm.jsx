import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const LandlordRegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Registering as landlord')

    // Gather form data
    const formData = new FormData(e.target)
    const firstName = formData.get('firstName')
    const lastName = formData.get('lastName')
    const email = formData.get('email')
    const phoneNumber = formData.get('phoneNumber')
    const password = formData.get('password')
    const confirmPassword = formData.get('confirmPassword')

    // Password match validation
    if (password !== confirmPassword) {
      console.error('Passwords do not match') // replace this with a proper error display
      return
    }

    // API call to register landlord
    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/register',
        {
          firstname: firstName,
          lastname: lastName,
          email,
          phonenumber: phoneNumber,
          passwordhash: password,
          role: 'LANDLORD'
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log('Landlord registered successfully:', response.data) // remove after finalization
      navigate('/landlord/dashboard')
    } catch (error) {
      console.error('Error registering landlord:', error.response?.data || error.message) // replace this with a proper error display
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6"
    >

      {/* First and Last Name */}
      <div className="flex gap-4 mb-4">
        {/* First Name */}
        <div className="flex-1">
          <label className="text-[14px] font-semibold block mb-2">First Name</label>
          <div className="relative">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="peer w-full placeholder:text-[14px] bg-[#FFFEFD] pl-10 py-2 border border-gray-300 rounded-lg
                      focus:outline-none focus:ring-2 focus:ring-[#F35E27] focus:border-[#c9c9c9] transition"
              required
            />
            <i className="fa-solid fa-user absolute left-3 top-1/2 -translate-y-1/2 text-gray-400
                        peer-focus:text-[#F35E27] transition-colors"></i>
          </div>
        </div>

        {/* Last Name */}
        <div className="flex-1">
          <label className="text-[14px] font-semibold block mb-2">Last Name</label>
          <div className="relative">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="peer w-full placeholder:text-[14px] bg-[#FFFEFD] pl-10 py-2 border border-gray-300 rounded-lg
                      focus:outline-none focus:ring-2 focus:ring-[#F35E27] focus:border-[#c9c9c9] transition"
              required
            />
            <i className="fa-solid fa-user absolute left-3 top-1/2 -translate-y-1/2 text-gray-400
                        peer-focus:text-[#F35E27] transition-colors"></i>
          </div>
        </div>
      </div>

      {/* Email */}
      <div className="mb-6">
        <label className="text-[14px] font-semibold block mb-2">Email</label>
        <div className="relative">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="peer w-full placeholder:text-[14px] bg-[#FFFEFD] pl-10 py-2 border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-[#F35E27] focus:border-[#c9c9c9] transition"
            required
          />
          <i className="fa-solid fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 
                        peer-focus:text-[#F35E27] transition-colors"></i>
        </div>
      </div>

      {/* Phone Number */}
      <div className="mb-6">
        <label className="text-[14px] font-semibold block mb-2">Phone Number</label>
        <div className="relative">
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Enter your phone number"
            className="peer w-full placeholder:text-[14px] bg-[#FFFEFD] pl-10 py-2 border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-[#F35E27] focus:border-[#c9c9c9] transition"
            required
          />
          <i className="fa-solid fa-phone absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 
                        peer-focus:text-[#F35E27] transition-colors"></i>
        </div>
      </div>

      {/* Password */}
      <div className="mb-6">
        <label className="text-[14px] font-semibold block mb-2">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Enter your password"
            className="peer w-full placeholder:text-[14px] bg-[#FFFEFD] pl-10 pr-10 py-2 border border-gray-300 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-[#F35E27] focus:border-[#c9c9c9] transition"
            required
          />
          <i className="fa-solid fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 
                        peer-focus:text-[#F35E27] transition-colors"></i>
          <i
            onClick={togglePasswordVisibility}
            className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'} absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer transition-colors`}
          ></i>
        </div>
      </div>

      {/* Confirm Password */}
      <div className="mb-6">
        <label className="text-[14px] font-semibold block mb-2">Confirm Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirm your password"
            className="peer w-full placeholder:text-[14px] bg-[#FFFEFD] pl-10 pr-10 py-2 border border-gray-300 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-[#F35E27] focus:border-[#c9c9c9] transition"
            required
          />
          <i className="fa-solid fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 
                        peer-focus:text-[#F35E27] transition-colors"></i>
          <i
            onClick={togglePasswordVisibility}
            className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'} absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer transition-colors`}
          ></i>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 text-[14px] bg-gradient-to-r from-[#DD4912] to-[#FFA500] text-white rounded flex items-center justify-center gap-2 group cursor-pointer"
      >
        Sign Up
        <i className="fa-solid fa-arrow-right transition-transform duration-200 group-hover:translate-x-2"></i>
      </button>
    </form>
  )
}

export default LandlordRegisterForm
