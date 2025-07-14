import { findUsername } from '@/api/services/authService';
import { useEmailFieldStore } from '@/stores/fields/useEmailFieldStore';
import { FindUsernameReq } from '@/types/authTypes';
import CustomError from '@/utils/error/CustomError';
import { createFormErrorHandler } from '@/utils/error/errorHandler';
import { useMutation } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';

const useFindUsername = (setError: UseFormSetError<FindUsernameReq>) => {
  const { resetAllEmailStatus } = useEmailFieldStore();

  return useMutation({
    mutationFn: findUsername,
    onError: (error: CustomError) => {
      const status = error.statusCode;
      if (status !== 404) {
        createFormErrorHandler(setError, resetAllEmailStatus)(error);
      }
    },
  });
};

export default useFindUsername;
