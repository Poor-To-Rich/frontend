import { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import CustomError from '@/utils/CustomError';
import toast from 'react-hot-toast';

export const createFormErrorHandler = <T extends FieldValues, E = unknown>(
  setError: UseFormSetError<T>,
  resetStatus?: () => void,
  overrideField?: Path<T>,
  overrideMessage?: (error: CustomError<E>) => string,
) => {
  return (error: unknown) => {
    if (error instanceof CustomError) {
      const field = overrideField ?? (error.data?.field as Path<T> | undefined);
      const message = overrideMessage ? overrideMessage(error) : error.message;

      if (field) {
        setError(field, {
          type: 'server',
          message,
        });

        resetStatus?.();
      } else {
        toast.error(error.message);
      }
    } else {
      toast.error('서버 오류가 발생했습니다.');
    }
  };
};
