import { getUserDetails } from '@/api/services/authService';
import { useQuery } from '@tanstack/react-query';

const useGetUserDetails = () => {
  return useQuery({
    queryKey: ['userDetails'],
    queryFn: getUserDetails,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export default useGetUserDetails;
