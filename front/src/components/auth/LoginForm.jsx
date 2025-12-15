import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, getUserRole } from '@/api/authApi'

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const email = formData.get('email')
    const password = formData.get('password')

    // Clear any previous errors
    setError('')
    setLoading(true)

    try {
      const response = await login({ email, password });

      
      // Get role from localStorage (already stored by login function)
      const role = getUserRole();
      
      // Redirect based on user role
      if (role === 'LANDLORD') {
        navigate('/landlord/dashboard')
      } else {
        navigate('/tenant/listings')
      }
    } catch (error) {
      // Extract error message from various backend response formats
      let errorMessage = "Invalid email or password. Please try again.";
      
      if (error.response?.data) {
        const data = error.response.data;
        // Check for different error message formats
        errorMessage = data.message || 
                      data.error || 
                      data.msg ||
                      data.detail ||
                      (typeof data === 'string' ? data : null) ||
                      errorMessage;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <form onSubmit={handleSubmit} className="p-6">
      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex items-start gap-2">
          <i className="fa-solid fa-circle-exclamation mt-0.5"></i>
          <span>{error}</span>
        </div>
      )}

      <div className="mb-6">
        <label className="text-[14px] font-semibold block mb-2">Email</label>
        <div className="relative">
          <input required type="email" name="email" placeholder="Enter your email" className="peer w-full placeholder:text-[14px] bg-[#FFFEFD] pl-10 py-2 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-[#F35E27] focus:border-[#c9c9c9] transition"/>
          <i className="fa-solid fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 
                        peer-focus:text-[#F35E27] transition-colors"></i>
        </div>
      </div>

      <div className="mb-6">
        <label className="text-[14px] font-semibold block mb-2">Password</label>
        <div className="relative">
          <input
            required
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

      </div>

      <div>
        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-3 text-[14px] bg-gradient-to-r from-[#DD4912] to-[#FFA500] text-white rounded flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Signing in...' : 'Sign in'}
          {!loading && <i className="fa-solid fa-arrow-right transition-transform duration-200 group-hover:translate-x-2"></i>}
        </button>
      </div>
    </form>
  )
}

export default LoginForm
