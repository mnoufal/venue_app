import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '/src/context/Auth';

const ProtectedRoute = ({ roles = [] }) => {
  const { currentUser, isAuthenticated, loading } = useAuth();
  
  // Show loading indicator while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7a1d56]"></div>
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  // Check if role-based access is restricted
  if (roles.length > 0 && !roles.includes(currentUser.role)) {
    // Redirect to unauthorized page or dashboard
    return <Navigate to="/unauthorized" replace />;
  }
  
  // Render the protected content
  return <Outlet />;
};

export default ProtectedRoute;