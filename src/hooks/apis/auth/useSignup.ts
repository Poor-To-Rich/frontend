import { signup } from '@/api/services/authService';
import { SignupFormType } from '@/types/authTypes';
import CustomError from '@/utils/CustomError';
import { useMutation } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface Props {
  setError: UseFormSetError<SignupFormType>;
  fieldStatusMap?: Partial<Record<keyof SignupFormType, (status: { isVerify: boolean; message?: string }) => void>>;
}

const useSignup = ({ setError, fieldStatusMap }: Props) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signup,
    onSuccess: data => {
      navigate('/login', { replace: true, state: { successMessage: data.message } });
    },
    onError: (error: CustomError<{ field: keyof SignupFormType }>) => {
      const field = error.data?.field;

      if (field) {
        setError(field, {
          type: 'server',
          message: error.message,
        });

        const setFieldStatus = fieldStatusMap?.[field];
        if (setFieldStatus) {
          setFieldStatus({ isVerify: false, message: undefined });
        }
      } else toast.error(error.message);
    },
  });
};

export default useSignup;
