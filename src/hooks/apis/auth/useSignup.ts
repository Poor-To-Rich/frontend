import { signup } from '@/api/services/authService';
import { SignupFormType } from '@/types/authTypes';
import { CheckVerifyFieldProps } from '@/types/fieldType';
import CustomError from '@/utils/CustomError';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useSignup = ({ setError }: Pick<CheckVerifyFieldProps, 'setError'>) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signup,
    onSuccess: data => {
      navigate('/login', { replace: true, state: { successMessage: data.message } });
    },
    onError: (error: CustomError<{ field: keyof SignupFormType }>) => {
      if (error.data)
        setError(error.data.field, {
          type: 'server',
          message: error.message,
        });
      else toast.error(error.message);
    },
  });
};

export default useSignup;
