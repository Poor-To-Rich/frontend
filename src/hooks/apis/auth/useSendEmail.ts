import { sendEmailCode } from '@/api/services/authService';
import { EmailRes } from '@/types/authTypes';
import { CheckVerifyFieldProps } from '@/types/fieldType';
import CustomError from '@/utils/CustomError';
import { useMutation } from '@tanstack/react-query';

const useSendEmail = ({ setError, setFieldStatus }: CheckVerifyFieldProps) => {
  return useMutation({
    mutationFn: sendEmailCode,
    onSuccess: async data => {
      setFieldStatus({ message: `${data.message}\n(${data.data?.notificationMessage})`, isVerify: true });
    },
    onError: (error: CustomError<EmailRes>) =>
      setError('email', {
        type: 'server',
        message: `${error.message}${error.data?.notificationMessage ? `\n(${error.data.notificationMessage})` : ''}`,
      }),
  });
};

export default useSendEmail;
