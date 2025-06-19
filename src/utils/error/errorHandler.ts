import { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import CustomError from '@/utils/error/CustomError';
import toast from 'react-hot-toast';

// 폼 데이터의 상태 변경이 필요한 Error 처리 핸들러
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
      } else if (error.statusCode >= 500) {
        toast.error('서버에 문제가 발생했습니다.\n 잠시 후 다시 시도해주세요.');
      } else {
        toast.error(error.message);
      }
    } else {
      toast.error('알 수 없는 오류가 발생했습니다.\n 잠시 후 다시 시도해주세요.');
    }
  };
};

// 단순한 에러 상태 처리 핸들러
export const handleCustomError = (error: unknown, fallback?: (error: CustomError) => void) => {
  if (error instanceof CustomError) {
    if (error.statusCode >= 500) {
      toast.error('서버에 문제가 발생했습니다.\n 잠시 후 다시 시도해주세요.');
    } else {
      fallback?.(error); // 예외적 처리 (ex: setErrorMessage 등)
    }
  } else {
    toast.error('알 수 없는 오류가 발생했습니다.\n 잠시 후 다시 시도해주세요.');
  }
};
