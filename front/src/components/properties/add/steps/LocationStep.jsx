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

  const saveFormData = () => {
    update({ unit, building, street, barangay, city, zip, province });
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
    </div>
  );
}
