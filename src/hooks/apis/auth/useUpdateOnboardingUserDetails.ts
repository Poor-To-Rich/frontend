import { updateOnboardingUserDetails } from '@/api/services/authService';
import useNicknameVerification from '@/hooks/field/useNicknameVerification ';
import { OnboardingFormType } from '@/types/authTypes';
import CustomError from '@/utils/error/CustomError';
import { createFormErrorHandler } from '@/utils/error/errorHandler';
import { useMutation } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const useUpdateOnboardingUserDetails = (setError: UseFormSetError<OnboardingFormType>) => {
  const navigate = useNavigate();
  const { resetNicknameStatus } = useNicknameVerification();
  const handleProfileError = createFormErrorHandler(setError);

  return useMutation({
    mutationFn: updateOnboardingUserDetails,
    onSuccess: () => {
      navigate('/');
    },
    onError: error => {
      if (error instanceof CustomError && error.data?.field === 'nickname') {
        resetNicknameStatus();
      }
      handleProfileError(error);
    },
  });
};

export default useUpdateOnboardingUserDetails;
