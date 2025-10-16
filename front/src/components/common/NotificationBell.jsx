import { useState, useRef, useEffect } from 'react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"

export default function NotificationBell() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative flex items-center justify-center cursor-pointer">
          <i className="fa-regular fa-bell  hover:text-[#F35E27] transition"></i>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64 bg-white border  rounded-xl shadow-lg overflow-hidden p-0"
      >
        {/* Orange Header */}
        <DropdownMenuLabel className="bg-[#F35E27] text-white font-semibold py-2 px-3">
          Notifications
        </DropdownMenuLabel>
        
        <div className="max-h-60 overflow-y-auto text-sm">
          <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center">
            <i className="fa-solid fa-circle pr-2 text-red-500 text-[8px]"></i>
            New booking request
          </div>
          <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center">
            <i className="fa-solid fa-circle pr-2 text-red-500 text-[8px]"></i>
            Tenant John sent a message
          </div>
        </div>

        <DropdownMenuSeparator className="bg-gray-200" />

        <div className="text-center text-xs p-2 text-[#000000] hover:underline cursor-pointer">
          See Previous Notifications
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}