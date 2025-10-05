import { revertOnboardingUserDetails } from '@/api/services/authService';
import { useMutation } from '@tanstack/react-query';

const useRevertOnboardingUserDetails = (handleAuthRevert: () => void) => {
  return useMutation({ mutationFn: revertOnboardingUserDetails, onSuccess: handleAuthRevert });
};

export default useRevertOnboardingUserDetails;
