import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
  console.log('isAdmin:',isAdmin);
 

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
