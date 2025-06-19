import { checkUsernameDuplication } from '@/api/services/authService';
import { SignupFormType } from '@/types/authTypes';
import { CheckVerifyFieldProps } from '@/types/fieldType';
import { createFormErrorHandler } from '@/utils/errorHandler';
import { useMutation } from '@tanstack/react-query';

const useCheckUsernameDuplication = ({
  setError,
  setFieldStatus,
  resetFieldStatus,
}: CheckVerifyFieldProps<SignupFormType>) => {
  return useMutation({
    mutationFn: checkUsernameDuplication,
    onSuccess: data => {
      setFieldStatus({ message: data.message, isVerify: true });
    },
    onError: createFormErrorHandler(setError, resetFieldStatus, 'username'),
  });
};

export default useCheckUsernameDuplication;
