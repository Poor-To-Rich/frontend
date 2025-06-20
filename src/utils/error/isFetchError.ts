import CustomError from '@/utils/error/CustomError';

export const isFetchError = (error: unknown): error is CustomError => {
  return (
    error instanceof CustomError &&
    typeof error.statusCode === 'number' &&
    error.statusCode >= 400 &&
    error.statusCode < 500
  );
};
