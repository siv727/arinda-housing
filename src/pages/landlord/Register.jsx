import React from 'react'
import RegisterForm from '../../components/auth/RegisterForm'
import Navbar from '../../components/common/Navbar'
const LandlordRegister = () => {
    const description = "Join Arinda’s hosting platform to list your properties."

    return(
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-bl from-[#FFF1EB] to-[#FFFDFA] p-4">
        <Navbar userType="landlord" />
        <div class = "w-[500px] bg-white border rounded-2xl overflow-hidden relative">
            <div class="absolute top-0 left-0 right-0 h-2  bg-[#F35E27] pointer-events-none"></div>
            <h1 className="text-3xl font-bold pt-8 py-4 text-center">Create an account</h1>
            <p className="text-center mb-6 ">{description}</p>
            <hr></hr>
            <RegisterForm userType="landlord" />
            <div class=" text-[14px] text-center text-gray-600 mb-6">
                Already have an account?
                <a href="/tenant/login" class="text-[#DD4912] hover:underline font-semibold pl-2">Sign In</a>
            </div>
        </div>
    </div>
    )
}

export default LandlordRegister
