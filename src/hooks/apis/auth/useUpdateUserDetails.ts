import { updateUserDetails } from '@/api/services/authService';
import { ProfileFormData } from '@/types/authTypes';
import CustomError from '@/utils/error/CustomError';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useNicknameVerification from '@/hooks/field/useNicknameVerification ';

const useUpdateUserDetails = (setError: UseFormSetError<ProfileFormData>) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { resetNicknameStatus } = useNicknameVerification();

  return useMutation({
    mutationFn: updateUserDetails,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['userDetails'] });
      toast.success(data.message);
      navigate(-1);
    },
    onError: (error: CustomError<{ field: keyof ProfileFormData }>) => {
      const field = error.data?.field;

      if (field) {
        if (field === 'nickname') {
          resetNicknameStatus();
        }
        setError(field, {
          type: 'server',
          message: error.message,
        });
      } else toast.error(error.message);
    },
  });
};

export default useUpdateUserDetails;
