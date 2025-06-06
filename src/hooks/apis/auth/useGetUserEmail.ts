import { getUserEmail } from '@/api/services/authService';
import { useQuery } from '@tanstack/react-query';

const useGetUserEmail = () => {
  return useQuery({
    queryKey: ['userEmail'],
    queryFn: getUserEmail,
  });
};

export default useGetUserEmail;
