import { updatePassword } from '@/api/services/authService';
import { ChangePasswordData } from '@/types/authTypes';
import { createFormErrorHandler } from '@/utils/error/errorHandler';
import { useMutation } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useUpdatePassword = (setError: UseFormSetError<ChangePasswordData>) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: updatePassword,
    onSuccess: data => {
      toast.success(data.message);
      navigate(-1);
    },
    onError: createFormErrorHandler(setError),
  });
};

export default useUpdatePassword;
