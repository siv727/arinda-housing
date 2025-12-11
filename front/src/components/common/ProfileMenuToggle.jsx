import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { logout } from "@/api/authApi";

export default function ProfileMenuToggle() {
  const navigate = useNavigate();

  // Get user role from localStorage
  let userRole = localStorage.getItem('userRole');

  // If role not in localStorage, try to decode from JWT token
  if (!userRole) {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        // JWT might have role in different formats, check both
        userRole = payload.role || payload.authorities?.[0]?.replace('ROLE_', '');
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    }
  }

  // Determine settings route based on role
  const settingsRoute = userRole === 'LANDLORD' ? '/landlord/settings' : '/tenant/settings';

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
            href={settingsRoute}
            className="block w-full px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
          >
            <i className="fa-regular fa-circle-user w-4"></i>
            Profile
          </a>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1 bg-gray-300 mx-2" />

        <DropdownMenuItem onClick={handleLogout}>
          <button
            className="block w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 font-semibold cursor-pointer text-left"
          >
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}