import { checkNicknameDuplication } from '@/api/services/authService';
import { SignupFormType } from '@/types/authTypes';
import { CheckVerifyFieldProps } from '@/types/fieldType';
import { createFormErrorHandler } from '@/utils/error/errorHandler';
import { useMutation } from '@tanstack/react-query';

const useCheckNicknameDuplication = ({
  setError,
  setFieldStatus,
  resetFieldStatus,
}: CheckVerifyFieldProps<SignupFormType>) => {
  return useMutation({
    mutationFn: checkNicknameDuplication,
    onSuccess: data => setFieldStatus({ message: data.message, isVerify: true }),
    onError: createFormErrorHandler(setError, resetFieldStatus, 'nickname'),
  });
};

export default useCheckNicknameDuplication;
