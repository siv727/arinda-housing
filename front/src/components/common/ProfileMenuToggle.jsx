import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";

export default function ProfileMenuToggle() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <img
          src="/path/to/avatar.jpg"
          alt="Profile"
          className="h-8 w-8 rounded-full border cursor-pointer ring-2 ring-transparent hover:ring-[#F35E27] transition"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-50 bg-white border rounded-xl shadow-lg p-2"
      >

        <DropdownMenuItem asChild>
          <a
            href="/tenant/settings"
            className="block w-full px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
          >
            <i class="fa-regular fa-circle-user w-4"></i>
            Profile
          </a>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1 bg-gray-300 mx-2" />

        <DropdownMenuItem asChild>
          <a
            href="/"
            className="block w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 font-semibold cursor-pointer"
          >
            Logout
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}