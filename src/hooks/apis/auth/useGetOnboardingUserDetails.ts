import { getOnboardingUserDetails } from '@/api/services/authService';
import { useQuery } from '@tanstack/react-query';

const useGetOnboardingUserDetails = () => {
  return useQuery({
    queryKey: ['onboardingUserDetails'],
    queryFn: getOnboardingUserDetails,
  });
};

export default useGetOnboardingUserDetails;
