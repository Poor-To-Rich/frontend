import { QueryClient } from '@tanstack/react-query';
import CustomError from '@/utils/CustomError';
import { toast } from 'react-hot-toast';

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (error: unknown) => {
        if (error instanceof CustomError) {
          toast.error(error.message);
        } else {
          toast.error('서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
        }
      },
    },
  },
});
