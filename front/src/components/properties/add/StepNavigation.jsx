import React from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";

export default function StepNavigation({
  current,
  total,
  onBack,
  onNext,
  onSubmit,
  canNext = true,
}) {
  const navigate = useNavigate();
  return (
    <div className="fixed left-0 right-0 bottom-0 bg-white  z-20">
      <div className="">
        <ProgressBar current={current} total={total} />
      </div>
      <div className=" p-4 px-5 2xl:px-16">
        <div className="flex items-center justify-between mt-2">
          <div>
            {current !== 0 && (
              <button
                onClick={onBack}
                className="px-6 py-3 border rounded-[8px] font-medium cursor-pointer hover:bg-[#FFF8F2] transition"
              >
                <i className="fa-solid fa-chevron-left pr-2"></i>Back
              </button>
            )}
          </div>

          <div>
            {current < total - 1 ? (
              <button
                onClick={canNext ? onNext : undefined}
                disabled={!canNext}
                className={`px-6 py-3 bg-[#F35E27] text-white rounded-[8px] font-medium transition ${
                  !canNext
                    ? "opacity-40 cursor-not-allowed"
                    : "cursor-pointer hover:bg-orange-600"
                }`}
              >
                Next<i className="fa-solid fa-chevron-right pl-2"></i>
              </button>
            ) : (
              <button
                onClick={onSubmit}
                className="px-6 py-3 bg-[#F35E27] text-white rounded-[8px] font-medium cursor-pointer hover:bg-orange-600 transition"
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
