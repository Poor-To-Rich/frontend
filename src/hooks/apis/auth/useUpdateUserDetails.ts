import { updateUserDetails } from '@/api/services/authService';
import { ProfileFormData } from '@/types/authTypes';
import CustomError from '@/utils/error/CustomError';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useNicknameVerification from '@/hooks/field/useNicknameVerification ';
import { createFormErrorHandler } from '@/utils/error/errorHandler';

const useUpdateUserDetails = (setError: UseFormSetError<ProfileFormData>) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { resetNicknameStatus } = useNicknameVerification();
  const handleProfileError = createFormErrorHandler(setError);

  return useMutation({
    mutationFn: updateUserDetails,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['userDetails'] });
      toast.success(data.message);
      navigate(-1);
    },
    onError: error => {
      if (error instanceof CustomError && error.data?.field === 'nickname') {
        resetNicknameStatus();
      }
      handleProfileError(error);
    },
  });
};

export default useUpdateUserDetails;
