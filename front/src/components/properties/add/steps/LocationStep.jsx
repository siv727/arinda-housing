import React, { useState } from "react";
import FloatingInput from "@/components/ui/FloatingInput";

export default function LocationStep({ form = {}, update }) {
  const [unit, setUnit] = useState(form.unit || "");
  const [building, setBuilding] = useState(form.building || "");
  const [street, setStreet] = useState(form.street || "");
  const [barangay, setBarangay] = useState(form.barangay || "");
  const [city, setCity] = useState(form.city || "");
  const [zip, setZip] = useState(form.zip || "");
  const [province, setProvince] = useState(form.province || "");
  const [mapIsConfirmed, setMapIsConfirmed] = useState(false);

  const isMapValid =
    (street || "").trim() &&
    (barangay || "").trim() &&
    (city || "").trim() &&
    (zip || "").trim() &&
    (province || "").trim();

  const saveFormData = () => {
    update({ unit, building, street, barangay, city, zip, province });
    console.log("Form data saved to parent.");
  };

  const findOnMap = () => {
    saveFormData();
    console.log("TODO: Mapbox geocoding here type shiz");
    update({ mapIsConfirmed: true });
    setMapIsConfirmed(true);
  };

  return (
    <div className="space-y-6">
      <p className="text-lg text-gray-600 mb-4">
        Enter the address details for your property.
      </p>

      <div className="border border-[#EAD1C7] rounded-lg overflow-hidden bg-white">
        <FloatingInput
          id="unit"
          label="Unit / Level (if applicable)"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          onBlur={saveFormData}
          className="px-2  border-[#EAD1C7] border-b last:border-b-0"
        />

        <FloatingInput
          id="building"
          label="Building name (if applicable)"
          value={building}
          onChange={(e) => setBuilding(e.target.value)}
          onBlur={saveFormData}
          className="px-2 border-[#EAD1C7] border-b"
        />

        <FloatingInput
          id="street"
          label="Street address"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          onBlur={saveFormData}
          className="px-2 border-[#EAD1C7] border-b"
        />

        <FloatingInput
          id="barangay"
          label="Barangay / District"
          value={barangay}
          onChange={(e) => setBarangay(e.target.value)}
          onBlur={saveFormData}
          className="px-2 border-[#EAD1C7] border-b"
        />

        <FloatingInput
          id="city"
          label="City / Municipality"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onBlur={saveFormData}
          className="px-2 border-[#EAD1C7] border-b"
        />

        <FloatingInput
          id="zip"
          label="ZIP code"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          onBlur={saveFormData}
          className="px-2 border-[#EAD1C7] border-b"
        />

        <FloatingInput
          id="province"
          label="Province"
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          onBlur={saveFormData}
          className="px-2 "
        />
      </div>
      <div className="flex flex-row justify-end">
        <button
          onClick={findOnMap}
          className="cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed bg-[#F35E27] text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
          disabled={!isMapValid}
        >
          Save Address <i className="fa-solid fa-location-arrow pl-2"></i>
        </button>
      </div>

      <hr className="border-[#EAD1C7]" />

      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <p className="text-base font-medium">Confirm Your Location</p>
          <p className="text-sm text-gray-600">
            We've placed a pin based on your address. Drag the pin to adjust the
            exact spot for renters.
          </p>
        </div>
      </div>

      <div className="h-96 bg-white border border-[#EAD1C7] rounded-lg flex items-center justify-center text-gray-400">
        Map placeholder or smth.
      </div>
    </div>
  );
}
