import { Outlet } from 'react-router-dom'
import LandlordNavbar from '../../../components/landlord/Navbar'

function LandlordDashboardLayout() {
  return (
    <div className="flex min-h-screen bg-[#FFFDFA]">
      <div className="flex-1 flex flex-col">
        <LandlordNavbar />

        {/* Page content stuff */}
        <main className="flex-1 max-w-7xl mx-auto px-[8px] w-full pt-15 ">
          <Outlet /> {/* This is where child pages (Overview, Bookings, etc.) show up */}
        </main>
      </div>
    </div>
  )
}

export default LandlordDashboardLayout
