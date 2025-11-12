
import React, { useState } from "react";

// Reusable floating-label input. Uses internal focus/value state so label
// remains floated when the field has content.
export default function FloatingInput({
  id,
  label,
  value,
  onChange,
  onBlur,
  onFocus,
  type = "text",
  className = "",
  required = false,
}) {
  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setFocused(false);
    if (onBlur) onBlur(e);
  };

  const floated = focused || (value != null && String(value).length > 0);

  return (
    <div className={className}>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={type}
          placeholder=" "
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className="peer mt-1 block w-full bg-transparent outline-none text-base text-gray-800 p-3 pt-6"
        />
        <label
          htmlFor={id}
          className={`absolute left-3 transition-all text-gray-500 origin-left ${
            floated ? "top-2 text-xs " : "top-5 text-base "
          }`}
        >
          {label}
          {!required ? "" : " *"}
        </label>
      </div>
    </div>
  );
}
