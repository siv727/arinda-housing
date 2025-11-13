import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// Tenant pages
import TenantLogin from './pages/tenant/Login'
import TenantRegister from './pages/tenant/Register'
import TenantListings from './pages/tenant/Listings'
import ListingDetail from './pages/tenant/ListingDetail'
import BookingForm from './pages/tenant/BookingForm'

// Landlord pages
import LandlordLogin from './pages/landlord/Login'
import LandlordRegister from './pages/landlord/Register'

// Landlord dashboard pages
import LandlordDashboardLayout from './pages/landlord/dashboard/LandlordDashboardLayout'
import LandlordOverview from './pages/landlord/dashboard/Overview'
import LandlordBookings from './pages/landlord/dashboard/Bookings'
import LandlordProperties from './pages/landlord/dashboard/Properties'
import LandlordTenants from './pages/landlord/dashboard/Tenants'
import AddPropertyPage from './pages/landlord/dashboard/AddProperty'

// Landing page
import Landing from './pages/Landing'

function App() {
  return (
     <Router>
      <Routes>

        {/* Default */}
        <Route path="/" element={<Navigate to="/landing" replace />} />
        
        {/* Landing */}
        <Route path="/landing" element={<Landing />} />
        
        {/* Redirect old landing routes to unified landing */}
        <Route path="/tenant" element={<Navigate to="/landing" replace />} />
        <Route path="/landlord" element={<Navigate to="/landing" replace />} />

        {/* Auth routes */}
        <Route path="/tenant/login" element={<TenantLogin />} />
        <Route path="/tenant/register" element={<TenantRegister />} />
        <Route path="/landlord/login" element={<LandlordLogin />} />
        <Route path="/landlord/register" element={<LandlordRegister />} />

        {/* Tenant routes */}
        <Route path="/tenant/listings" element={<TenantListings />} />
        <Route path="/tenant/listings/:id" element={<ListingDetail />} />
        <Route path="/tenant/listings/:id/book" element={<BookingForm />} />

        {/* Landlord dashboard routes */}
        <Route path="/landlord/dashboard" element={<LandlordDashboardLayout />}>
          <Route path="" element={<LandlordOverview />} />
          <Route path="overview" element={<LandlordOverview />} />
          <Route path="bookings" element={<LandlordBookings />} />
          <Route path="properties" element={<LandlordProperties />} />
          <Route path="properties/add" element={<AddPropertyPage />} />
          <Route path="tenants" element={<LandlordTenants />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
