import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerTenant } from "@/api/authApi";
import { validatePassword } from "@/utils/passwordValidation";

const TenantRegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Registering as tenant");

    // Gather form data
    const formData = new FormData(e.target);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const school = formData.get("school");
    const studentId = formData.get("studentId");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    // Password strength validation
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      setError(passwordValidation.errors.join(". "));
      return;
    }

    // Password match validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Clear any previous errors
    setError("");
    setLoading(true);

    // API call to register tenant
    try {
      const response = await registerTenant({
        firstname: firstName,
        lastname: lastName,
        email,
        school,
        studentid: studentId,
        passwordhash: password,
      });

      console.log("Tenant registered successfully:", response.data);
      navigate("/tenant/listings");
    } catch (error) {
      // Log full error for debugging
      console.error("Full error object:", error);
      console.error("Error response:", error.response);
      console.error("Error response data:", error.response?.data);
      
      // Extract error message from various backend response formats
      let errorMessage = "Registration failed. Please try again.";
      
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
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex items-start gap-2">
          <i className="fa-solid fa-circle-exclamation mt-0.5"></i>
          <span>{error}</span>
        </div>
      )}

      {/* First and Last Name */}
      <div className="flex gap-4 mb-4">
        {/* First Name */}
        <div className="flex-1">
          <label className="text-[14px] font-semibold block mb-2">
            First Name
          </label>
          <div className="relative">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="peer w-full placeholder:text-[14px] bg-[#FFFEFD] pl-10 py-2 border border-gray-300 rounded-lg
                      focus:outline-none focus:ring-2 focus:ring-[#F35E27] focus:border-[#c9c9c9] transition"
              required
            />
            <i
              className="fa-solid fa-user absolute left-3 top-1/2 -translate-y-1/2 text-gray-400
                        peer-focus:text-[#F35E27] transition-colors"
            ></i>
          </div>
        </div>

        {/* Last Name */}
        <div className="flex-1">
          <label className="text-[14px] font-semibold block mb-2">
            Last Name
          </label>
          <div className="relative">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="peer w-full placeholder:text-[14px] bg-[#FFFEFD] pl-10 py-2 border border-gray-300 rounded-lg
                      focus:outline-none focus:ring-2 focus:ring-[#F35E27] focus:border-[#c9c9c9] transition"
              required
            />
            <i
              className="fa-solid fa-user absolute left-3 top-1/2 -translate-y-1/2 text-gray-400
                        peer-focus:text-[#F35E27] transition-colors"
            ></i>
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
          <i
            className="fa-solid fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 
                        peer-focus:text-[#F35E27] transition-colors"
          ></i>
        </div>
      </div>

      {/* School */}
      <div className="flex gap-4">
        <div className="mb-6">
          <label className="text-[14px] font-semibold block mb-2">School</label>
          <div className="relative">
            <input
              type="text"
              name="school"
              placeholder="Enter your school"
              className="peer w-full placeholder:text-[14px] bg-[#FFFEFD] pl-10 py-2 border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-[#F35E27] focus:border-[#c9c9c9] transition"
              required
            />
            <i
              className="fa-solid fa-graduation-cap absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 
                        peer-focus:text-[#F35E27] transition-colors"
            ></i>
          </div>
        </div>

        {/* Student ID */}
        <div className="mb-6">
          <label className="text-[14px] font-semibold block mb-2">
            Student ID
          </label>
          <div className="relative">
            <input
              type="text"
              name="studentId"
              placeholder="Enter your student ID"
              className="peer w-full placeholder:text-[14px] bg-[#FFFEFD] pl-10 py-2 border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-[#F35E27] focus:border-[#c9c9c9] transition"
              required
            />
            <i
              className="fa-solid fa-id-card absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 
                        peer-focus:text-[#F35E27] transition-colors"
            ></i>
          </div>
        </div>
      </div>

      {/* Password */}
      <div className="mb-6">
        <label className="text-[14px] font-semibold block mb-2">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            className="peer w-full placeholder:text-[14px] bg-[#FFFEFD] pl-10 pr-10 py-2 border border-gray-300 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-[#F35E27] focus:border-[#c9c9c9] transition"
            required
          />
          <i
            className="fa-solid fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 
                        peer-focus:text-[#F35E27] transition-colors"
          ></i>
          <i
            onClick={togglePasswordVisibility}
            className={`fa-solid ${
              showPassword ? "fa-eye-slash" : "fa-eye"
            } absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer transition-colors`}
          ></i>
        </div>
      </div>

      {/* Confirm Password */}
      <div className="mb-6">
        <label className="text-[14px] font-semibold block mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm your password"
            className="peer w-full placeholder:text-[14px] bg-[#FFFEFD] pl-10 pr-10 py-2 border border-gray-300 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-[#F35E27] focus:border-[#c9c9c9] transition"
            required
          />
          <i
            className="fa-solid fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 
                        peer-focus:text-[#F35E27] transition-colors"
          ></i>
          <i
            onClick={toggleConfirmPasswordVisibility}
            className={`fa-solid ${
              showConfirmPassword ? "fa-eye-slash" : "fa-eye"
            } absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer transition-colors`}
          ></i>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 text-[14px] bg-gradient-to-r from-[#DD4912] to-[#FFA500] text-white rounded flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Signing Up..." : "Sign Up"}
        {!loading && <i className="fa-solid fa-arrow-right transition-transform duration-200 group-hover:translate-x-2"></i>}
      </button>
    </form>
  );
};

export default TenantRegisterForm;
