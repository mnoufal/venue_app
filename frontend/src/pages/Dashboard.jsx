// src/pages/Dashboard.jsx
import React from 'react';
import { useAuth } from '/src/context/Auth';

const Dashboard = () => {
  const { currentUser } = useAuth();
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2">Welcome, {currentUser.name}!</p>
      <p>Role: {currentUser.role}</p>
    </div>
  );
};

export default Dashboard;