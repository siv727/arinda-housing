export default function Footer() {
  return (
    <footer className="bg-gradient-to-bl from-[#FFF1EB] to-[#FFFDFA] py-12 mt-auto relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-4 gap-8 mb-8 justify-center">
          {/* Support */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-gray-900 mb-2">Support</h3>
            <a href="#" className="text-gray-600 text-sm hover:underline">Help Center</a>
            <a href="#" className="text-gray-600 text-sm hover:underline">Safety information</a>
            <a href="#" className="text-gray-600 text-sm hover:underline">Cancellation options</a>
            <a href="#" className="text-gray-600 text-sm hover:underline">Report a concern</a>
          </div>

          {/* Community */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-gray-900 mb-2">Community</h3>
            <a href="#" className="text-gray-600 text-sm hover:underline">Student resources</a>
            <a href="#" className="text-gray-600 text-sm hover:underline">Campus partnerships</a>
            <a href="#" className="text-gray-600 text-sm hover:underline">Events</a>
            <a href="#" className="text-gray-600 text-sm hover:underline">Blog</a>
          </div>

          {/* Hosting */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-gray-900 mb-2">Hosting</h3>
            <a href="#" className="text-gray-600 text-sm hover:underline">List your property</a>
            <a href="#" className="text-gray-600 text-sm hover:underline">Host resources</a>
            <a href="#" className="text-gray-600 text-sm hover:underline">Community forum</a>
            <a href="#" className="text-gray-600 text-sm hover:underline">Host an experience</a>
          </div>

          {/* Arinda */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-gray-900 mb-2">Arinda</h3>
            <a href="#" className="text-gray-600 text-sm hover:underline">About</a>
            <a href="#" className="text-gray-600 text-sm hover:underline">Careers</a>
            <a href="#" className="text-gray-600 text-sm hover:underline">Press</a>
            <a href="#" className="text-gray-600 text-sm hover:underline">Investors</a>
          </div>
        </div>

        {/* Copyright and legal links */}
        <div className="border-t border-gray-300 pt-6 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Arinda, Inc. All rights reserved.
          </p>
          
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-600 hover:underline">Privacy</a>
            <a href="#" className="text-gray-600 hover:underline">Terms</a>
            <a href="#" className="text-gray-600 hover:underline">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}