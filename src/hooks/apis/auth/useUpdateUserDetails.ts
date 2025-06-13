import { updateUserDetails } from '@/api/services/authService';
import { ProfileFormData } from '@/types/authTypes';
import CustomError from '@/utils/CustomError';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useUpdateUserDetails = (setError: UseFormSetError<ProfileFormData>) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserDetails,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['userDetails'] });
      toast.success(data.message);
      navigate(-1);
    },
    onError: (error: CustomError<{ field: keyof ProfileFormData }>) => {
      if (error.data)
        setError(error.data.field, {
          type: 'server',
          message: error.message,
        });
      else toast.error(error.message);
    },
  });
};

export default useUpdateUserDetails;
