import React from 'react'
import LoginForm from '../../components/auth/LoginForm'
import Navbar from '../../components/common/Navbar'
const TenantLogin = () => {
  const description = "Access your account and manage your listings seamlessly"

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-bl from-[#FFF1EB] to-[#FFFDFA] p-4">
        
        <Navbar userType="tenant" />
        <div class = "w-[500px] bg-white border rounded-2xl overflow-hidden relative">
            <div class="absolute top-0 left-0 right-0 h-2 bg-[#F35E27] pointer-events-none"></div>
            <h1 className="text-3xl font-bold pt-8 py-4 text-center">Login with your Email</h1>
            <p className="text-center mb-6 ">{description}</p>
            <hr></hr>
            <LoginForm userType="tenant" />
            <div class=" text-[14px] text-center text-gray-600 mb-6">
                Don’t have an account?
                <a href="/tenant/register" class="text-[#DD4912] hover:underline font-semibold pl-2">Sign Up</a>
            </div>
        </div>
    </div>
  )
}

export default TenantLogin
