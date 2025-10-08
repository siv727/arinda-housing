import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LandlordLanding from './pages/landlord/Landing'
import TenantLanding from './pages/tenant/Landing'


function App() {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/tenant" replace />} />
        <Route path="/landlord" element={<LandlordLanding />} />
        <Route path="/tenant" element={<TenantLanding />} />
      </Routes>
    </Router>
  )
}

export default App
