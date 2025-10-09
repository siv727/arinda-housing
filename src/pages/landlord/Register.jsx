import React from 'react'
import RegisterForm from '../../components/auth/RegisterForm'
import Navbar from '../../components/common/Navbar'
import OrangeHatCard from '../../components/common/OrangeHatCard'

const LandlordRegister = () => {
    const description = "Join Arinda’s hosting platform to list your properties."

    return(
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-bl from-[#FFF1EB] to-[#FFFDFA] p-4">
        <Navbar userType="landlord" />
        <OrangeHatCard>
            <h1 className="text-3xl font-bold pt-8 py-4 text-center">Create an account</h1>
            <p className="text-center mb-6 ">{description}</p>
            <hr></hr>
            <RegisterForm userType="landlord" />
            <div class=" text-[14px] text-center text-gray-600 mb-6">
                Already have an account?
                <a href="/landlord/login" class="text-[#DD4912] hover:underline font-semibold pl-2">Sign In</a>
            </div>
        </OrangeHatCard>
    </div>
    )
}

export default LandlordRegister
