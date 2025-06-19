import { QueryClient } from '@tanstack/react-query';
import CustomError from '@/utils/error/CustomError';
import { toast } from 'react-hot-toast';

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (error: unknown) => {
        if (error instanceof CustomError) {
          if (error.statusCode >= 500) {
            toast.error('서버에 문제가 발생했습니다.\n 잠시 후 다시 시도해주세요.');
          } else {
            toast.error(error.message);
          }
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error('알 수 없는 오류가 발생했습니다.\n 잠시 후 다시 시도해주세요.');
        }
      },
    },
  },
});
