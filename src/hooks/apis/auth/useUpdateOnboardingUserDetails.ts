import { updateOnboardingUserDetails } from '@/api/services/authService';
import useNicknameVerification from '@/hooks/field/useNicknameVerification ';
import { ProfileFormData } from '@/types/authTypes';
import CustomError from '@/utils/error/CustomError';
import { createFormErrorHandler } from '@/utils/error/errorHandler';
import { useMutation } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useGetUserRole from './useGetUserRole';

const useUpdateOnboardingUserDetails = (setError: UseFormSetError<ProfileFormData>) => {
  const navigate = useNavigate();
  const { resetNicknameStatus } = useNicknameVerification();
  const handleProfileError = createFormErrorHandler(setError);
  const { refetch: refetchUserRole } = useGetUserRole({ enabled: false });

  return useMutation({
    mutationFn: updateOnboardingUserDetails,
    onSuccess: async () => {
      await refetchUserRole();
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
