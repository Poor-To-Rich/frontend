import { changeEmail } from '@/api/services/authService';
import { useEmailFieldStore } from '@/stores/fields/useEmailFieldStore';
import { EmailChangeData } from '@/types/authTypes';
import CustomError from '@/utils/error/CustomError';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useChangeEmail = (setError: UseFormSetError<EmailChangeData>) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { resetAllEmailStatus } = useEmailFieldStore();

  return useMutation({
    mutationFn: changeEmail,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['userEmail'] });
      toast.success(data.message);
      navigate(-1);
    },
    onError: (error: CustomError<{ field: keyof EmailChangeData }>) => {
      const field = error.data?.field;
      if (field) {
        setError(field, {
          type: 'server',
          message: error.message,
        });
        resetAllEmailStatus();
      } else toast.error(error.message);
    },
  });
};

export default useChangeEmail;
