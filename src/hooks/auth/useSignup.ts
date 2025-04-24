import { signup } from '@/api/authService';
import { SignupFormType } from '@/types/authTypes';
import { CheckVerifyFieldProps } from '@/types/propsTypes';
import CustomError from '@/utils/CustomError';
import { useMutation } from '@tanstack/react-query';

const useSignup = ({ setError }: Pick<CheckVerifyFieldProps, 'setError'>) => {
  return useMutation({
    mutationFn: signup,
    onSuccess: data => {
      console.log(data);
      window.location.href = '/login';
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
