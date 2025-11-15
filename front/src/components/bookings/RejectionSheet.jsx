import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";

export default function RejectionSheet({
  open,
  onOpenChange,
  to = "",
  onConfirm = () => {},
  onCancel = () => {},
}) {
  const [message, setMessage] = useState("");

  const submit = () => {
    onConfirm({ to, message });
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[550px] rounded-l-lg md:rounded-lg md:mr-3 md:mt-3 md:h-[97vh] flex flex-col">
        <SheetHeader>
          <SheetTitle>Rejection Request</SheetTitle>
        </SheetHeader>
        <hr></hr>
        <div className="flex-1 overflow-y-auto px-5 pt-2 space-y-4">
          <div>
            <label className="text-sm text-gray-600 font-medium">To</label>
            <input
              className="mt-1 w-full px-3 py-2 border rounded-md bg-gray-50"
              value={to}
              readOnly
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 font-medium">Message</label>
            <textarea
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a short approval message or instructions here"
              className="mt-1 w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        <SheetFooter className="border-t pt-4">
          <div className="flex justify-end gap-3 w-full font-medium cursor-pointer">
            <button
              onClick={() => {
                onCancel();
                onOpenChange(false);
              }}
              className="hover:bg-[#FFF8F2] transition  border rounded-lg py-3 px-6 text-gray-700"
            >
              Cancel <i className="fa-solid fa-arrow-turn-down-left pl-1"></i>
            </button>
            <button
              onClick={submit}
              className="rounded-lg py-2 bg-[#F35E27] transition hover:bg-[#e7521c] px-6 text-white cursor-pointer"
            >
              Confirm Rejection{" "}
              <i className="fa-regular fa-circle-check pl-2"></i>
            </button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
