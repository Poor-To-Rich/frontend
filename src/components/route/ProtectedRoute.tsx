import { refreshToken } from '@/api/authService';
import { tokenManager } from '@/utils/tokenManager';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const [isLogin, setIsLogin] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const token = tokenManager.getToken();

      if (!token) {
        try {
          await refreshToken();
        } catch (error) {
          setIsLogin(false);
          return;
        }
      }

      setIsLogin(true);
    })();
  }, []);

  if (isLogin === null) return null;

  return isLogin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
