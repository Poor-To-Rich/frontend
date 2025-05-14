import { refreshToken } from '@/api/services/authService';
import { tokenManager } from '@/utils/tokenManager';
import { useState, useEffect } from 'react';

export const useAuthStatus = () => {
  const [isLogin, setIsLogin] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const token = tokenManager.getToken();

      if (!token) {
        try {
          await refreshToken();
        } catch {
          setIsLogin(false);
          return;
        }
      }

      setIsLogin(true);
    })();
  }, []);

  return isLogin;
};
