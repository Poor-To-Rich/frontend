import { getUserDetails } from '@/api/services/authService';
import { useQuery } from '@tanstack/react-query';

const useGetUserDetails = () => {
  return useQuery({
    queryKey: ['userDetails'],
    queryFn: getUserDetails,
  });
};

export default useGetUserDetails;
