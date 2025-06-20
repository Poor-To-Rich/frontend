import { changeEmail } from '@/api/services/authService';
import { useEmailFieldStore } from '@/stores/fields/useEmailFieldStore';
import { EmailChangeData } from '@/types/authTypes';
import { createFormErrorHandler } from '@/utils/error/errorHandler';
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
    onError: createFormErrorHandler(setError, resetAllEmailStatus),
  });
};

export default useChangeEmail;
