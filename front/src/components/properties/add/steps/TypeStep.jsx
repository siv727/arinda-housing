import React from "react";

const PROPERTY_TYPES = [
  {
    key: "BoardingHouse",
    label: "Boarding House",
    icon: "fa-regular fa-house",
  },
  { key: "Apartment", label: "Apartment", icon: "fa-regular fa-building" },
  { key: "Dormitory", label: "Dormitory", icon: "fa-regular fa-city" },
  { key: "Condominium", label: "Condominium", icon: "fa-regular fa-buildings" },
];

const ROOM_TYPES = [
  {
    key: "Studio",
    label: "Studio / Studio Apartment",
    icon: "fa-regular fa-booth-curtain",
  },
  {
    key: "PrivateRoom",
    label: "Private Room",
    icon: "fa-regular fa-door-closed",
  },
  {
    key: "SharedRoom",
    label: "Shared Room",
    icon: "fa-regular fa-people-roof",
  },
  {
    key: "SharedDormitory",
    label: "Shared Dormitory",
    icon: "fa-regular fa-person-booth",
  },
  { key: "OneBedRoom", label: "1-Bedroom", icon: "fa-regular fa-bed" },
  { key: "TwoBedRoom", label: "2-Bedroom", icon: "fa-regular fa-bed-bunk" },
];

function TypeCard({ label, icon, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`group relative flex flex-col cursor-pointer items-start  gap-3 p-4 rounded-lg border hover:shadow-sm transition-all text-left w-full sm:w-auto ${
        selected
          ? "border-orange-500 ring-2 ring-orange-100 bg-[#FFF8F2]/30"
          : "border-[#EAD1C7] bg-white"
      }`}
    >
      <div className="flex items-center justify-center w-13 h-13 mb-2 rounded-full   text-gray-600 ">
        <i className={`${icon} text-2xl`}></i>
      </div>

      <div className="flex-1">
        <div className="font-medium 'text-gray-900 text-lg">{label}</div>
      </div>

      <div className="absolute top-4 right-4 h-5 w-5">
        {selected ? (
          <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-orange-500">
            <div className="h-2.5 w-2.5 rounded-full bg-orange-500"></div>
          </div>
        ) : (
          <div className="h-full w-full rounded-full border-2 border-[#EAD1C7] bg-white"></div>
        )}
      </div>
    </button>
  );
}

export default function TypeStep({ form = {}, update }) {
  const selectedProperty = form.propertyType || "";
  const selectedRoom = form.roomType || "";

  return (
    <div className="space-y-8">
      <p className="text-lg text-gray-600 mb-7">
        Choose the type of property you want to list.
      </p>

      <div
        role="radiogroup"
        aria-label="Property type"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {PROPERTY_TYPES.map((t) => (
          <TypeCard
            key={t.key}
            label={t.label}
            icon={t.icon}
            selected={selectedProperty === t.key}
            onSelect={() => update({ propertyType: t.key })}
          />
        ))}
      </div>

      <hr className="border-[#EAD1C7] mb-4"></hr>

      <div>
        <h2 className="text-3xl font-semibold mb-2">Room Type</h2>
        <p className="text-lg text-gray-600 mb-7">
          And select the type of unit you're listing.
        </p>
        <div
          role="radiogroup"
          aria-label="Room type"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {ROOM_TYPES.map((t) => (
            <TypeCard
              key={t.key}
              label={t.label}
              icon={t.icon}
              selected={selectedRoom === t.key}
              onSelect={() => update({ roomType: t.key })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
