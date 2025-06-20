import { verifyEmailCode } from '@/api/services/authService';
import { EmailRes, SignupFormType } from '@/types/authTypes';
import { CheckVerifyFieldProps } from '@/types/fieldType';
import CustomError from '@/utils/error/CustomError';
import { createFormErrorHandler } from '@/utils/error/errorHandler';
import { useMutation } from '@tanstack/react-query';

const useVerifyEmail = ({ setError, setFieldStatus, resetFieldStatus }: CheckVerifyFieldProps<SignupFormType>) => {
  return useMutation({
    mutationFn: verifyEmailCode,
    onSuccess: async data => {
      setFieldStatus({ message: `${data.message}`, isVerify: true });
    },
    onError: createFormErrorHandler(
      setError,
      resetFieldStatus,
      'verificationCode',
      (error: CustomError<EmailRes>) =>
        `${error.message}${error.data?.notificationMessage ? `\n(${error.data.notificationMessage})` : ''}`,
    ),
  });
};

export default useVerifyEmail;
