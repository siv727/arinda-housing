export default function Tenants() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Tenants Management</h1>
      <p className="text-gray-600">
        Manage tenant information and lease agreements.
      </p>

      <form method="POST">
        <div className="flex space-x-2">
          <div className="relative flex-grow">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              name="search"
              placeholder="Search tenants"
              className="w-full border rounded-full border-gray-300 bg-white pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            type="submit"
            className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
