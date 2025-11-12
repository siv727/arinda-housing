import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import FloatingInput from "@/components/ui/FloatingInput";

export default function LocationStep({ form = {}, update }) {
  const [unit, setUnit] = useState(form.unit || "");
  const [building, setBuilding] = useState(form.building || "");
  const [street, setStreet] = useState(form.street || "");
  const [barangay, setBarangay] = useState(form.barangay || "");
  const [city, setCity] = useState(form.city || "");
  const [zip, setZip] = useState(form.zip || "");
  const [province, setProvince] = useState(form.province || "");

  const save = () =>
    update({ unit, building, street, barangay, city, zip, province });

  return (
    <div className="space-y-6">
      <p className="text-lg text-gray-600 mb-4">
        Enter the address details for your property. 
      </p>

      <div className="border border-[#EAD1C7] rounded-lg overflow-hidden bg-white">
        <FloatingInput
          id="unit"
          label="Unit / Level (optional)"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          onBlur={save}
          className="px-2  border-[#EAD1C7] border-b last:border-b-0"
        />

        <FloatingInput
          id="building"
          label="Building name (optional)"
          value={building}
          onChange={(e) => setBuilding(e.target.value)}
          onBlur={save}
          className="px-2 border-[#EAD1C7] border-b"
        />

        <FloatingInput
          id="street"
          label="Street address"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          onBlur={save}
          className="px-2 border-[#EAD1C7] border-b"
        />

        <FloatingInput
          id="barangay"
          label="Barangay / District (optional)"
          value={barangay}
          onChange={(e) => setBarangay(e.target.value)}
          onBlur={save}
          className="px-2 border-[#EAD1C7] border-b"
        />

        <FloatingInput
          id="city"
          label="City / Municipality"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onBlur={save}
          className="px-2 border-[#EAD1C7] border-b"
        />

        <FloatingInput
          id="zip"
          label="ZIP code"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          onBlur={save}
          className="px-2 border-[#EAD1C7] border-b"
        />

        <FloatingInput
          id="province"
          label="Province"
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          onBlur={save}
          className="px-2 "
        />
  </div>

      <hr class = "border-[#EAD1C7]"/>

      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <p className="text-base font-medium">Show your property's precise location</p>
          <p className="text-sm text-gray-600">
            Help renters find your place easily by pinpointing its exact spot on
            the map, ensuring they can locate your property without hassle or
            confusion.
          </p>
        </div>
        <Switch className="h-[30px] w-[50px] data-[state=checked]:bg-orange-500 data-[state=unchecked]:bg-gray-300" />
      </div>

     
        <div className="h-96 bg-white border border-[#EAD1C7] rounded-lg flex items-center justify-center text-gray-400">
          Map placeholder or smth.
        </div>
    
    </div>
  );
}
