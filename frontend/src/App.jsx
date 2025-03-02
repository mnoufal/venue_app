import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/auth'
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Unauthorized from './pages/Unauthorized';

// Import roles constants
const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  GROUP_ADMIN: 'GROUP_ADMIN',
  FRANCHISE_ADMIN: 'FRANCHISE_ADMIN',
  CUSTOMER: 'CUSTOMER'
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected routes for all authenticated users */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<div>Profile Page (To be implemented)</div>} />
            <Route path="/bookings" element={<div>My Bookings (To be implemented)</div>} />
          </Route>
          
          {/* Admin routes */}
          <Route element={<ProtectedRoute roles={[ROLES.SUPER_ADMIN, ROLES.GROUP_ADMIN]} />}>
            <Route path="/admin/groups" element={<div>Venue Groups Management (To be implemented)</div>} />
          </Route>
          
          {/* Group admin routes */}
          <Route element={<ProtectedRoute roles={[ROLES.GROUP_ADMIN, ROLES.FRANCHISE_ADMIN]} />}>
            <Route path="/admin/franchises" element={<div>Franchises Management (To be implemented)</div>} />
          </Route>
          
          {/* Franchise admin routes */}
          <Route element={<ProtectedRoute roles={[ROLES.FRANCHISE_ADMIN]} />}>
            <Route path="/admin/spaces" element={<div>Spaces Management (To be implemented)</div>} />
          </Route>
          
          {/* Error routes */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;