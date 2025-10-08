export default function LandlordLanding() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-orange-100 text-gray-900 w-screen">
      <h1 className="text-4xl font-bold mb-4">Landlord Landing</h1>
      <p className="text-lg mb-6">Manage your listings and tenants with ease.</p>
      <a href="/tenant" className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
        Go to Tenant Landing
      </a>
    </div>
  )
}
