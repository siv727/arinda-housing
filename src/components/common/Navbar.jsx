import { useState, useEffect } from 'react'

const Navbar = ({ userType }) => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 border-b transition-all  ${
      scrolled 
        ? 'border-gray-300 bg-white/90 backdrop-blur-md' 
        : 'border-transparent bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between p-5">
        <div className="flex items-center gap-4">
          <div className="logo font-bold text-xl text-[#F35E27]">Arinda</div>
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center space-x-8">
          <li><a href="/" className="hover:text-[#F35E27] transition-colors">Home</a></li>
          <li><a href="/about" className="hover:text-[#F35E27] transition-colors">About</a></li>
          {userType === 'tenant' ? (
            <li><a href="/landlord" className="hover:text-[#F35E27] transition-colors">For Landlords</a></li>
          ) : (
            <li><a href="/tenant" className="hover:text-[#F35E27] transition-colors">For Tenants</a></li>
          )}

          {userType === 'tenant' ? (
            <li><a href="/tenant/login" className="font-semibold bg-gradient-to-r text-white p-3 rounded-full px-6 from-[#F35E27] to-[#ff8f4e] hover:opacity-90 transition-opacity">Get Started</a></li>
          ) : (
            <li><a href="/landlord/login" className="font-semibold bg-gradient-to-r text-white p-3 rounded-full px-6 from-[#F35E27] to-[#ff8f4e] hover:opacity-90 transition-opacity">Get Started</a></li>
          )}
          
          
        </ul>

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

      {/* Mobile menu panel */}
      <div className={`${open ? 'block' : 'hidden'} md:hidden bg-white/30 backdrop-blur-md border-b border-t border-black`}>
        <div className="px-4 pt-4 pb-6 space-y-4">
          <a href="/" className="block hover:text-[#F35E27] transition-colors">Home</a>
          <a href="/about" className="block hover:text-[#F35E27] transition-colors">About</a>
          {userType === 'tenant' ? (
            <a href="/landlord" className="block hover:text-[#F35E27] transition-colors">For Landlords</a>
          ) : (
            <a href="/tenant" className="block hover:text-[#F35E27] transition-colors">For Tenants</a>
          )}
          <a href="/signup" className="inline-block font-semibold bg-gradient-to-r text-white p-3 rounded-full px-6 from-[#F35E27] to-[#ff8f4e] hover:opacity-90 transition-opacity">Get Started</a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar