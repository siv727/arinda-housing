import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '@/api/authApi';

/**
 * ProtectedRoute - Prevents unauthenticated users from accessing protected pages
 * @param {Object} props
 * @param {React.ReactNode} props.children - The component to render if authenticated
 * @param {string} props.allowedRole - Required role (LANDLORD or STUDENT)
 * @returns {React.ReactNode}
 */
export default function ProtectedRoute({ children, allowedRole }) {
  const authenticated = isAuthenticated();
  const userRole = getUserRole();

  // If not authenticated, redirect to login
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated but wrong role, redirect to appropriate dashboard
  if (allowedRole && userRole !== allowedRole) {
    if (userRole === 'LANDLORD') {
      return <Navigate to="/landlord/dashboard" replace />;
    } else {
      return <Navigate to="/tenant/listings" replace />;
    }
  }

  // User is authenticated and has correct role
  return children;
}
