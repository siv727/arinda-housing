import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export default function ApprovalSheet({
  open,
  onOpenChange,
  to = "",
  onConfirm = () => {},
  onCancel = () => {},
}) {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files?.[0] ?? null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0] ?? null;
    if (droppedFile) {
      setFile(droppedFile);
    }
  };
  // --- End Drag and Drop ---

  const submit = () => {
    onConfirm({ to, message, file });
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[550px] rounded-l-lg md:rounded-lg md:mr-3 md:mt-3 md:h-[97vh] flex flex-col">
        <SheetHeader>
          <SheetTitle>Approval Request</SheetTitle>
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

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 font-semibold">
              Upload Files
            </label>

            <label
              htmlFor="file-upload"
              className={`
                mt-1 p-6 flex flex-col items-center justify-center 
                rounded-lg border-dashed border-2 cursor-pointer
                transition-colors
                ${
                  isDragging
                    ? "bg-orange-50 border-orange-400"
                    : "bg-gray-50 border-gray-300"
                }
              `}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                onChange={handleFileChange}
              />

              <i className="fa-solid fa-cloud-arrow-up text-3xl text-gray-400"></i>
              <span className="mt-2 text-sm text-gray-600">
                Drop a file to add, or{" "}
                <span className="font-medium text-[#F35E27]">Choose File</span>
              </span>
              <span className="mt-1 text-xs text-gray-500">
                PDF, PNG, JPG, or DOCX
              </span>
            </label>

            {file && (
              <div class="mt-4">
                <div className="text-sm text-gray-600 font-semibold">
                  Uploaded Files
                </div>
                <div className="mt-1 px-4 py-3 border rounded-lg bg-gray-50">
                  <div class="flex justify-between items-center">
                    <div class="flex flex-row items-center space-x-4">
                      <i class="fa-regular fa-file"></i>
                      <div class="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">
                          {file.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatBytes(file.size)}
                        </span>
                      </div>
                    </div>

                    <div class = "text text-gray-500 hover:text-gray-600 cursor-pointer transition p-2 rounded-full w-9 h-9 items-center flex justify-center hover:bg-gray-200" onClick={() => setFile(null)}>
                        <i class="fa-regular fa-trash-can"></i>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <SheetFooter className="border-t pt-4">
          <div className="flex justify-end gap-3 w-full font-medium cursor-pointer">
            <button
              onClick={() => {
                onCancel();
                onOpenChange(false);
              }}
              className="hover:bg-[#FFF8F2] transition  border rounded-lg py-3 px-6 text-gray-700 cursor-pointer"
            >
              Cancel <i className="fa-solid fa-arrow-turn-down-left pl-1"></i>
            </button>
            <button
              onClick={submit}
              className="rounded-lg py-2 bg-[#F35E27] transition hover:bg-[#e7521c] px-6 text-white cursor-pointer"
            >
              Send Offer{" "}
              <i className="fa-regular fa-circle-check pl-2"></i>
            </button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
