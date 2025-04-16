import { verifyEmailCode } from '@/api/authService';
import { CheckVerifyFieldProps } from '@/types/propsTypes';
import { useMutation } from '@tanstack/react-query';

const useVerifyEmail = ({ setError, setFieldStatus }: CheckVerifyFieldProps) => {
  return useMutation({
    mutationFn: verifyEmailCode,
    onSuccess: data => setFieldStatus({ message: data.message, isVerify: true }),
    onError: error =>
      setError('verificationCode', {
        type: 'server',
        message: error.message,
      }),
  });
};

export default useVerifyEmail;
