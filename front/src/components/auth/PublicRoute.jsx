import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '@/api/authApi';

/**
 * PublicRoute - Prevents authenticated users from accessing login/register pages
 * Redirects them to their appropriate dashboard
 * @param {Object} props
 * @param {React.ReactNode} props.children - The component to render if not authenticated
 * @returns {React.ReactNode}
 */
export default function PublicRoute({ children }) {
  const authenticated = isAuthenticated();
  const userRole = getUserRole();

  // If authenticated, redirect to appropriate dashboard
  if (authenticated) {
    if (userRole === 'LANDLORD') {
      return <Navigate to="/landlord/dashboard" replace />;
    } else {
      return <Navigate to="/tenant/listings" replace />;
    }
  }

  // User is not authenticated, show login/register page
  return children;
}
