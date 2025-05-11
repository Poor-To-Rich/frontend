import { verifyEmailCode } from '@/api/services/authService';
import { EmailRes } from '@/types/authTypes';
import { CheckVerifyFieldProps } from '@/types/fieldType';
import CustomError from '@/utils/CustomError';
import { useMutation } from '@tanstack/react-query';

const useVerifyEmail = ({ setError, setFieldStatus }: CheckVerifyFieldProps) => {
  return useMutation({
    mutationFn: verifyEmailCode,
    onSuccess: async data => {
      setFieldStatus({ message: `${data.message}`, isVerify: true });
    },
    onError: (error: CustomError<EmailRes>) =>
      setError('verificationCode', {
        type: 'server',
        message: `${error.message}${error.data?.notificationMessage ? `\n(${error.data.notificationMessage})` : ''}`,
      }),
  });
};

export default useVerifyEmail;
