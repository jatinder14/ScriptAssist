import React from 'react';
import { useAuthStore } from '../state/authStore';
import { Navigate } from 'react-router-dom';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/access-restricted" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;