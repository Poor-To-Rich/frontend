import { revertOnboardingUserDetails } from '@/api/services/authService';
import { useMutation } from '@tanstack/react-query';

const useRevertOnboardingUserDetails = (handleModalClose: () => void) => {
  return useMutation({ mutationFn: revertOnboardingUserDetails, onSuccess: handleModalClose });
};

export default useRevertOnboardingUserDetails;
