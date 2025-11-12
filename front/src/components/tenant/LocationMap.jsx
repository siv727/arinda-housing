const LocationMap = ({ mapLocation, title }) => {
  if (!mapLocation) {
    return null
  }

  const { lat, lng, address } = mapLocation

  // Using OpenStreetMap embed for the map
  // Alternative: can use Google Maps, Mapbox, or other providers
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.01},${lat - 0.01},${lng + 0.01},${lat + 0.01}&layer=mapnik&marker=${lat},${lng}`

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        <i className="fa-solid fa-location-dot mr-2 text-orange-500"></i>
        Where you'll be
      </h2>

      {/* Map iframe */}
      <div className="rounded-lg overflow-hidden border border-gray-200 mb-4">
        <iframe
          src={mapUrl}
          width="100%"
          height="400"
          style={{ border: 0 }}
          loading="lazy"
          title={`Map of ${title}`}
        ></iframe>
      </div>

      {/* Address */}
      <div className="flex items-start gap-3 text-gray-700">
        <i className="fa-solid fa-map-marker-alt text-orange-500 mt-1"></i>
        <div>
          <p className="font-semibold text-gray-900 mb-1">Exact location</p>
          <p className="text-gray-600">{address}</p>
          <p className="text-sm text-gray-500 mt-2">
            Coordinates: {lat.toFixed(6)}, {lng.toFixed(6)}
          </p>
        </div>
      </div>

      {/* Optional: Getting there section */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-2">
          <i className="fa-solid fa-info-circle text-blue-600 mr-2"></i>
          Getting there
        </h3>
        <p className="text-sm text-gray-700">
          The exact address will be provided after your booking is confirmed. This helps protect the host's privacy.
        </p>
      </div>
    </div>
  )
}

export default LocationMap
