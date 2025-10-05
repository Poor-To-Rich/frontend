import useGetUserRole from '@/hooks/apis/auth/useGetUserRole';
import { useAuthStatus } from '@/hooks/useAuthStatus';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
  const isLogin = useAuthStatus();
  const { data: userRole, isLoading: isUserRoleLoading } = useGetUserRole({ enabled: isLogin === true });
  const location = useLocation();

  if (isLogin === null || isUserRoleLoading) return null;

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  const isOnboardingRoute = location.pathname === '/onboarding/profile';

  if ((userRole === 'PENDING' || userRole === 'KAKAO_EXISTING_USER_PENDING') && !isOnboardingRoute) {
    return <Navigate to="/onboarding/profile" state={{ userRole: userRole }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
