// 404 Not Found page component
// Displays when user navigates to a non-existent route

import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-2xl mb-4">Page Not Found</h2>
        <Link to="/" className="text-blue-600 underline">Back to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;