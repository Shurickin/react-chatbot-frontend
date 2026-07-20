import { Navigate } from 'react-router';

// This protects your chat from unauthenticated users
export default function ProtectedRoute({ children, isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}