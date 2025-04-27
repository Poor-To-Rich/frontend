import { signup } from '@/api/authService';
import { SignupFormType } from '@/types/authTypes';
import { CheckVerifyFieldProps } from '@/types/propsTypes';
import CustomError from '@/utils/CustomError';
import { useMutation } from '@tanstack/react-query';
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
    },
  });
};

export default useSignup;
