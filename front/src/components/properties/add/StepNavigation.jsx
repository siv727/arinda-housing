import React from "react";
import { useNavigate } from "react-router-dom";

export default function StepNavigation({
  current,
  total,
  onBack,
  onNext,
  onSubmit,
}) {
  const navigate = useNavigate();
  return (
  <div className="fixed left-0 right-0 bottom-0 bg-white border-t z-20">
      <div className=" p-4 px-5 2xl:px-16">
        <div className="flex items-center justify-between mt-2">
          <div>
            <button
              onClick={onBack}
              disabled={current === 0}
              className="px-6 py-2 border rounded-[8px]  "
            >
              <i className="fa-solid fa-chevron-left pr-2"></i>Back
            </button>
          </div>

          <div>
            {current < total - 1 ? (
              <button
                onClick={onNext}
                className="px-6 py-2 bg-[#F35E27] text-white rounded-[8px]"
              >
                Next
              </button>
            ) : (
              <button
                onClick={onSubmit}
                className="px-6 py-2 bg-[#F35E27] text-white rounded-[8px]"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
