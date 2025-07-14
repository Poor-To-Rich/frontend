import { resetPassword } from '@/api/services/authService';
import { ResetPassword } from '@/types/authTypes';
import { createFormErrorHandler } from '@/utils/error/errorHandler';
import { useMutation } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useResetPassword = (setError: UseFormSetError<ResetPassword>) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: resetPassword,
    onSuccess: data => {
      toast.success(data.message);
      navigate('/login/id', { replace: true });
    },
    onError: createFormErrorHandler(setError),
  });
};

export default useResetPassword;
