// src/pages/Unauthorized.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold">Access Denied</h1>
      <p className="mt-2">You don't have permission to access this page.</p>
      <Link to="/dashboard" className="mt-4 text-[#7a1d56] hover:underline">
        Go to Dashboard
      </Link>
    </div>
  );
};

export default Unauthorized;