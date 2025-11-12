import { useState, useEffect } from 'react'
import ProfileMenuToggle from '../common/ProfileMenuToggle'
import NotificationBell from '../common/NotificationBell'

// eslint-disable-next-line no-unused-vars
const Navbar = ({ userType }) => {
  // eslint-disable-next-line no-unused-vars
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed w-full z-50 border-b transition-all ${
        scrolled
          ? 'border-[#EAD1C7] bg-white/90 backdrop-blur-md'
          : 'border-[#EAD1C7] bg-white'
      }`}
    >
      <div className="max-w-[1900px] mx-auto px-6 2xl:px-12 w-full flex items-center justify-between p-5">
        {/* Left: Logo */}
        <div className="logo font-bold text-xl text-[#F35E27]">Arinda</div>

        {/* Center: Links */}
        <ul className="hidden md:flex items-center space-x-12 absolute left-1/2 -translate-x-1/2 text-sm">
          <li>
            <a
              href="/landlord/dashboard/overview"
              className="hover:text-[#F35E27] transition-colors"
            >
              <i class="fa-regular fa-street-view pr-2"></i>Overview
            </a>
          </li>
          <li>
            <a
              href="/landlord/dashboard/bookings"
              className="hover:text-[#F35E27] transition-colors"
            >
              <i class="fa-regular fa-circle-check pr-2"></i>Bookings
            </a>
          </li>
          <li>
            <a
              href="/landlord/dashboard/properties"
              className="hover:text-[#F35E27] transition-colors"
            >
              <i class="fa-regular fa-building pr-2"></i>Properties
            </a>
          </li>
          <li>
            <a
              href="/landlord/dashboard/tenants"
              className="hover:text-[#F35E27] transition-colors"
            >
              <i class="fa-regular fa-people-pants-simple pr-2"></i>Tenants
            </a>
          </li>
        </ul>

        {/* Right: Notification & Profile */}
        <div className="flex items-center gap-6">
          <NotificationBell />
          <ProfileMenuToggle />
          
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`${
          open ? 'block' : 'hidden'
        } md:hidden bg-white/30 backdrop-blur-md border-b border-t border-black`}
      >
        <div className="px-4 pt-4 pb-6 space-y-4">
          <a
            href="/landlord/dashboard/overview"
            className="block hover:text-[#F35E27] transition-colors"
          >
            Overview
          </a>
          <a
            href="/landlord/dashboard/bookings"
            className="block hover:text-[#F35E27] transition-colors"
          >
            Bookings
          </a>
          <a
            href="/landlord/dashboard/properties"
            className="block hover:text-[#F35E27] transition-colors"
          >
            Properties
          </a>
          <a
            href="/landlord/dashboard/tenants"
            className="block hover:text-[#F35E27] transition-colors"
          >
            Tenants
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar