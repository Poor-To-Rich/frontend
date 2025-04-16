import { sendEmailCode } from '@/api/authService';
import { CheckVerifyFieldProps } from '@/types/propsTypes';
import { useMutation } from '@tanstack/react-query';

const useEmailSend = ({ setError, setFieldStatus }: CheckVerifyFieldProps) => {
  return useMutation({
    mutationFn: sendEmailCode,
    onSuccess: data => setFieldStatus({ message: data.message, isVerify: true }),
    onError: error =>
      setError('email', {
        type: 'server',
        message: error.message,
      }),
  });
};

export default useEmailSend;
