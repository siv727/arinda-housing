import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

function Switch({ className, ...props }) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        // Track (outer part)
        "peer inline-flex h-[30px] w-[52px] shrink-0 items-center rounded-full border border-transparent shadow-sm transition-all outline-none",
        "data-[state=checked]:bg-orange-500 data-[state=unchecked]:bg-gray-300",
        "focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(

          "pointer-events-none block h-[22px] w-[22px] rounded-full bg-white shadow-md ring-0 transition-transform",

          "data-[state=checked]:translate-x-[22px] data-[state=unchecked]:translate-x-[4px]"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
