import React, { useState } from 'react'

const LandlordRegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Registering as landlord')
    // TODO: add registration logic (API call, validation)
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
        className="w-full py-3 text-[14px] bg-gradient-to-r from-[#DD4912] to-[#FFA500] text-white rounded flex items-center justify-center gap-2 group"
      >
        Sign Up
        <i className="fa-solid fa-arrow-right transition-transform duration-200 group-hover:translate-x-2"></i>
      </button>

      <div className="flex items-center my-4">
        <hr className="flex-grow border-t border-gray-300" />
        <span className="mx-4 text-gray-500 text-[14px]">or sign up with</span>
        <hr className="flex-grow border-t border-gray-300" />
      </div>

      <div className="space-y-4">
        <button className="font-semibold w-full py-3 text-[14px] bg-white border-[#989494] border text-black rounded flex items-center justify-center relative">
          <i className="fa-brands fa-google absolute left-4 text-[#DD4912]"></i>
          Continue with Google
        </button>
      </div>
    </form>
  )
}

export default LandlordRegisterForm
