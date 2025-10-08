export default function TenantLanding() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100 text-gray-900 w-screen">
      <h1 className="text-4xl font-bold mb-4">Tenant Landing</h1>
      <p className="text-lg mb-6">Find your next home quickly and easily.</p>
      <a href="/landlord" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
        Go to Landlord Landing
      </a>
    </div>
  )
}
