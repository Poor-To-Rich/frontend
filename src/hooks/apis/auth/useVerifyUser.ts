import { findUserForPassword } from '@/api/services/authService';
import { useEmailFieldStore } from '@/stores/fields/useEmailFieldStore';
import { FindUserForPassword } from '@/types/authTypes';
import CustomError from '@/utils/error/CustomError';
import { createFormErrorHandler } from '@/utils/error/errorHandler';
import { useMutation } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';

const useVerifyUser = (
  setError: UseFormSetError<FindUserForPassword>,
  setStep: React.Dispatch<React.SetStateAction<'verifyUser' | 'resetPassword'>>,
) => {
  const { resetAllEmailStatus } = useEmailFieldStore();

  return useMutation({
    mutationFn: findUserForPassword,
    onSuccess: () => {
      setStep('resetPassword');
    },
    onError: (error: CustomError) => {
      const status = error.statusCode;
      if (status !== 404) {
        createFormErrorHandler(setError, resetAllEmailStatus)(error);
      }
    },
  });
};

export default useVerifyUser;
