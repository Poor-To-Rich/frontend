import { getUserRole } from '@/api/services/authService';
import { useQuery } from '@tanstack/react-query';

const useGetUserRole = (options = {}) => {
  return useQuery({
    queryKey: ['userRole'],
    queryFn: getUserRole,
    staleTime: Infinity,
    gcTime: Infinity,
    ...options,
  });
};

export default useGetUserRole;
