import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const LoginForm = ({ userType = 'tenant' }) => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(`Logging in as ${userType}`)

    const formData = new FormData(e.target)
    const email = formData.get('email')
    const password = formData.get('password')

    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/login',
        {
          email,
          password
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log('User logged in successfully:', response.data)
      response.data.role === 'LANDLORD' && userType === 'landlord' ? navigate('/landlord/dashboard') : navigate('/tenant/listings')
    } catch (error) {
      console.error('Error logging in:', error.response?.data || error.message)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="mb-6">
        <label className="text-[14px] font-semibold block mb-2">Email</label>
        <div className="relative">
          <input type="email" name="email" placeholder="Enter your email" className="peer w-full placeholder:text-[14px] bg-[#FFFEFD] pl-10 py-2 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-[#F35E27] focus:border-[#c9c9c9] transition"/>
          <i className="fa-solid fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 
                        peer-focus:text-[#F35E27] transition-colors"></i>
        </div>
      </div>

      <div className="mb-6">
        <label className="text-[14px] font-semibold block mb-2">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Enter your password"
            className="peer w-full placeholder:text-[14px] bg-[#FFFEFD] pl-10 pr-10 py-2 border border-gray-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-[#F35E27] focus:border-[#c9c9c9] transition"
          />
          <i className="fa-solid fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 
                        peer-focus:text-[#F35E27] transition-colors"></i>

          <i
            onClick={togglePasswordVisibility}
            className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'} absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer transition-colors`}
          ></i>
        </div>
      </div>

      <div className="flex items-center justify-between text-[14px] mb-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="remember_me"
            className="w-4 h-4 text-[#F35E27] border-gray-300 rounded focus:ring-[#F35E27]"
          />
          <span className="text-gray-600">Remember me</span>
        </label>
        <a href="#" className="text-[#F35E27] hover:underline">
          Forgot password?
        </a>
      </div>

      <div>
        <button type="submit" className="w-full py-3 text-[14px] bg-gradient-to-r from-[#DD4912] to-[#FFA500] text-white rounded flex items-center justify-center gap-2 group cursor-pointer">
          Sign in
          <i className="fa-solid fa-arrow-right transition-transform duration-200 group-hover:translate-x-2"></i>
        </button>
      </div>
    </form>
  )
}

export default LoginForm
