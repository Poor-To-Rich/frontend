import { useAuthStatus } from '@/hooks/useAuthStatus';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const isLogin = useAuthStatus();

  if (isLogin === null) return null;

  return isLogin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
