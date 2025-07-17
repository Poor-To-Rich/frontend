import { getUserRole } from '@/api/services/authService';
import { useQuery } from '@tanstack/react-query';

const useGetUserRole = (options = {}) => {
  return useQuery({
    queryKey: ['userRole'],
    queryFn: getUserRole,
    ...options,
  });
};

export default useGetUserRole;
