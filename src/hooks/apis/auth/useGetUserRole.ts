import { getUserRole } from '@/api/services/authService';
import { useQuery } from '@tanstack/react-query';

const useGetUserRole = () => {
  return useQuery({
    queryKey: ['userRole'],
    queryFn: getUserRole,
  });
};

export default useGetUserRole;
