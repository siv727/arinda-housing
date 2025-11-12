import { Outlet } from 'react-router-dom'
import LandlordNavbar from '../../../components/landlord/Navbar'

function LandlordDashboardLayout() {
  return (
    <div className="flex min-h-screen bg-[#FFFDFA]">
      <div className="flex-1 flex flex-col">
        <LandlordNavbar />

        {/* Page content stuff */}
        <main className="flex-1  mx-auto px-6 2xl:px-[50px] w-full pt-20 ">
          <Outlet /> {/* This is where child pages (Overview, Bookings, etc.) show up */}
        </main>
      </div>
    </div>
  )
}

export default LandlordDashboardLayout
