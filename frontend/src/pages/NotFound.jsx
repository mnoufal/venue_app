// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-2 text-xl">Page not found</p>
      <Link to="/" className="mt-4 text-[#7a1d56] hover:underline">
        Go back to home
      </Link>
    </div>
  );
};

export default NotFound;