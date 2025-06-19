import { sendEmailCode } from '@/api/services/authService';
import { EmailRes, SignupFormType } from '@/types/authTypes';
import { CheckVerifyFieldProps } from '@/types/fieldType';
import CustomError from '@/utils/error/CustomError';
import { createFormErrorHandler } from '@/utils/error/errorHandler';
import { useMutation } from '@tanstack/react-query';

const useSendEmail = ({ setError, setFieldStatus, resetFieldStatus }: CheckVerifyFieldProps<SignupFormType>) => {
  return useMutation({
    mutationFn: sendEmailCode,
    onSuccess: async data => {
      setFieldStatus({ message: `${data.message}\n(${data.data?.notificationMessage})`, isVerify: true });
    },
    onError: createFormErrorHandler(
      setError,
      resetFieldStatus,
      'email',
      (error: CustomError<EmailRes>) =>
        `${error.message}${error.data?.notificationMessage ? `\n(${error.data.notificationMessage})` : ''}`,
    ),
  });
};

export default useSendEmail;
