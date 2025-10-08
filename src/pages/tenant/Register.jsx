import React from 'react'
import RegisterForm from '../../components/auth/RegisterForm'
import Navbar   from '../../components/common/Navbar'

const TenantRegister = () => {
    const description = "Join us and start managing your listings with ease"
    return (
        <RegisterForm userType="tenant" />
    )
}

export default TenantRegister
