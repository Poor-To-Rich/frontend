import { useAuthStatus } from '@/hooks/useAuthStatus';
import { Navigate, Outlet } from 'react-router-dom';

const RedirectIfLoggedInRoute = () => {
  const isLogin = useAuthStatus();

  if (isLogin === null) return null;

  return isLogin ? <Navigate to="/" replace /> : <Outlet />;
};

export default RedirectIfLoggedInRoute;
