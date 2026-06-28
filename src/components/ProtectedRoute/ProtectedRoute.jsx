import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute component that only renders children if user is authenticated
 * Otherwise redirects to login page
 * @param {Object} props
 * @param {boolean} props.user - The authenticated user object
 * @param {React.ReactNode} props.children - Component to render if authenticated
 * @returns {JSX.Element}
 */
const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
