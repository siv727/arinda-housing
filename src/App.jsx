import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LandlordLanding from './pages/landlord/Landing'
import TenantLanding from './pages/tenant/Landing'
import TenantLogin from './pages/tenant/Login'
import TenantRegister from './pages/tenant/Register'
import LandlordLogin from './pages/landlord/Login'
import LandlordRegister from './pages/landlord/Register'


function App() {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/tenant" replace />} />
        <Route path="/landlord" element={<LandlordLanding />} />
        <Route path="/tenant" element={<TenantLanding />} />

        {/* Auth routes */}
        <Route path="/tenant/login" element={<TenantLogin />} />
        <Route path="/tenant/register" element={<TenantRegister />} />
        <Route path="/landlord/login" element={<LandlordLogin />} />
        <Route path="/landlord/register" element={<LandlordRegister />} />
      </Routes>
    </Router>
  )
}

export default App
