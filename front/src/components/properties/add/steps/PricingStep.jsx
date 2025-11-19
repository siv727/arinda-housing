import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import FeatureCard from "./FeatureCard";

const ADVANCE_OPTIONS = [0, 1, 2, 3];
const LEASE_TERMS = [
  { key: "1", label: "1 month", icon: "fa-regular fa-calendar-day" },
  { key: "3", label: "3 months", icon: "fa-regular fa-calendar-days" },
  { key: "6", label: "6 months", icon: "fa-regular fa-calendar-days" },
  { key: "12", label: "12 months", icon: "fa-regular fa-calendar-alt" },
  { key: "24", label: "24 months", icon: "fa-regular fa-calendar" },
];

const UTILITIES = [
  { key: "Wi-Fi", label: "Wi‑Fi", icon: "fa-regular fa-wifi" },
  { key: "Water", label: "Water", icon: "fa-regular fa-water" },
  { key: "Electricity", label: "Electricity", icon: "fa-regular fa-bolt" },
  {
    key: "Trash Collection",
    label: "Trash Collection",
    icon: "fa-regular fa-trash",
  },
  { key: "Gas", label: "Gas", icon: "fa-regular fa-fire" },
  { key: "Cable TV", label: "Cable TV", icon: "fa-regular fa-tv" },
];

function formatCurrency(v) {
  const n = Number(v) || 0;
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function PricingStep({ form = {}, update }) {
  const monthly = Number(form.monthlyRent) || 0;
  const security = Number(form.securityDeposit) || 0;
  const appFee = Number(form.applicationFee) || 0;
  const petFee = Number(form.petFee) || 0;
  const advance = Number(form.advanceRentMonths) || 0;

  const toggleArray = (key, value) => {
    const arr = new Set(form[key] || []);
    if (arr.has(value)) arr.delete(value);
    else arr.add(value);
    update({ [key]: Array.from(arr) });
  };

  const totalMoveIn = monthly * advance + security + appFee + petFee;

  return (
    <div className="flex flex-col gap-6">
      <p className="text-lg text-gray-600 mb-2">
        Configure rental rates and fees for your property.
      </p>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg mb-2 font-medium">Monthly Rent (₱) <span class = "text-red-500">*</span></p>
            <input
              type="number"
              className="mt-1 block w-full border-[#EAD1C7] border rounded-lg p-2 bg-white "
              value={form.monthlyRent || ""}
              onChange={(e) => update({ monthlyRent: e.target.value })}
              placeholder="e.g., 5000"
            />
          </div>

          <div>
            <p className="text-lg mb-2 font-medium">Security Deposit (₱) <span class = "text-red-500">*</span></p>
            <input
              type="number"
              className="mt-1 block w-full border-[#EAD1C7] border rounded-lg p-2 bg-white"
              value={form.securityDeposit || ""}
              onChange={(e) => update({ securityDeposit: e.target.value })}
              placeholder="e.g., 5000"
            />
          </div>

          <div>
            <p className="text-lg mb-2 font-medium">Application Fee (₱)</p>
            <input
              type="number"
              className="mt-1 block w-full border-[#EAD1C7] border rounded-lg p-2 bg-white"
              value={form.applicationFee || ""}
              onChange={(e) => update({ applicationFee: e.target.value })}
              placeholder="e.g., 500"
            />
          </div>

          <div>
            <p className="text-lg  mb-2 font-medium">Pet Fee (₱)</p>
            <input
              type="number"
              className="mt-1 block w-full border-[#EAD1C7] border rounded-lg p-2 bg-white"
              value={form.petFee || ""}
              onChange={(e) => update({ petFee: e.target.value })}
              placeholder="e.g., 1000"
            />
          </div>

          <div>
            <p className="text-lg font-medium mb-2">Advance Rent <span class = "text-red-500">*</span></p>
            <select
              value={advance}
              onChange={(e) =>
                update({ advanceRentMonths: parseInt(e.target.value, 10) })
              }
              className="w-full text-left rounded-lg border px-3 py-2 bg-white"
            >
              {ADVANCE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt === 0
                    ? "No Advance Rent"
                    : `${opt} Month${opt > 1 ? "s" : ""}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        <hr className="border-[#EAD1C7] lg:my-6 2xl:my-10" />

        <div>
          <p className="text-lg font-medium mb-2">
            Available Lease Terms (months)
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {LEASE_TERMS.map((t) => {
              const checked = (form.leaseTerms || []).includes(t.key);
              return (
                <FeatureCard
                  key={t.key}
                  item={t}
                  checked={checked}
                  onToggle={() => toggleArray("leaseTerms", t.key)}
                  idPrefix="lease"
                />
              );
            })}
          </div>
        </div>

        <hr className="border-[#EAD1C7] lg:my-6 2xl:my-10" />

        <div>
          <p className="text-lg font-medium mb-2">What's included</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {UTILITIES.map((u) => {
              const checked = (form.includedUtilities || []).includes(u.key);
              return (
                <FeatureCard
                  key={u.key}
                  item={u}
                  checked={checked}
                  onToggle={() => toggleArray("includedUtilities", u.key)}
                  idPrefix="util"
                />
              );
            })}
          </div>
        </div>
      </div>

      <hr className="border-[#EAD1C7] my-4" />

      <div className="space-y-4">
        <div className="bg-[#FFF8F5] border border-[#EAD1C7] rounded-lg p-4">
          <h3 className="font-semibold mb-2 text-lg">Pricing Summary</h3>
          <div className="text-base  space-y-2">
            <div className="flex justify-between text-gray-700">
              <span>Monthly Rent</span>
              <span>{formatCurrency(monthly)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Security Deposit</span>
              <span>{formatCurrency(security)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Application Fee</span>
              <span>{formatCurrency(appFee)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Pet Fee</span>
              <span>{formatCurrency(petFee)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Advance Rent ({advance} months)</span>
              <span>{formatCurrency(monthly * advance)}</span>
            </div>
            <div className="flex justify-between  border-t border-[#EAD1C7] pt-2 font-medium">
              <span>Total Move-in Cost</span>
              <span>{formatCurrency(totalMoveIn)}</span>
            </div>
          </div>
        </div>

        <div className="bg-[#FFF8F5] border border-[#EAD1C7] rounded-lg p-4">
          <h3 className="font-semibold mb-2 text-lg">Lease & Included</h3>
          <div className="text-base text-gray-700 space-y-2">
            <div>
              <>Lease terms:</>{" "}
              {(form.leaseTerms || []).length
                ? (form.leaseTerms || [])
                    .map(
                      (k) => LEASE_TERMS.find((t) => t.key === k)?.label || k
                    )
                    .join(", ")
                : "—"}
            </div>
            <div>
              <>Included utilities:</>{" "}
              {(form.includedUtilities || []).length
                ? (form.includedUtilities || [])
                    .map((k) => UTILITIES.find((u) => u.key === k)?.label || k)
                    .join(", ")
                : "—"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
