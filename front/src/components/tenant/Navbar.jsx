import { useState, useEffect } from 'react'
import ProfileMenuToggle from '../common/ProfileMenuToggle'
import NotificationBell from '../common/NotificationBell'

const Navbar = () => {
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
        <a 
          href="/tenant/listings" 
          className="logo font-bold text-xl text-[#F35E27] hover:opacity-80 transition-opacity cursor-pointer"
        >
          Arinda
        </a>

        <div className="flex justify-end gap-8">
          {/* Center: Links */}
          <ul className="hidden md:flex items-center text-sm gap-5">
            <li>
              <a
                href="/tenant/listings"
                className="hover:text-[#F35E27] transition-colors"
              >
                <i className="fa-regular fa-home pr-2"></i>Listings
              </a>
            </li>
            <li>
              <a
                href="/tenant/applications"
                className="hover:text-[#F35E27] transition-colors"
              >
                <i className="fa-regular fa-file-lines pr-2"></i>My Applications
              </a>
            </li>
          </ul>

          {/* Right: Notification & Profile */}
          <div className="flex items-center gap-6">
            <NotificationBell />
            <ProfileMenuToggle />
            
            {/* Mobile hamburger */}
            <div className="md:hidden">
              <button
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-label={open ? 'Close menu' : 'Open menu'}
                className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F35E27]"
              >
                <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  {open ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

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
            href="/tenant/listings"
            className="block hover:text-[#F35E27] transition-colors"
          >
            Listings
          </a>
          <a
            href="/tenant/applications"
            className="block hover:text-[#F35E27] transition-colors"
          >
            My Applications
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
