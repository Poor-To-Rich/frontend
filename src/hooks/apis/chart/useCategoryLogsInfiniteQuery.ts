import { getCategoryLogs } from '@/api/services/chartService';
import { CategoryDetailsRes } from '@/types/chartTypes';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

const useCategoryLogsInfiniteQuery = (categoryId: string, date: string, isDescending: boolean) => {
  return useInfiniteQuery<CategoryDetailsRes, Error, InfiniteData<CategoryDetailsRes>, string[], string | null>({
    queryKey: ['categoryLogs', categoryId, date, String(isDescending)],
    queryFn: async ({ pageParam = null }) => await getCategoryLogs(categoryId, date, pageParam, isDescending),
    initialPageParam: null,
    getNextPageParam: lastPage => (lastPage.hasNext ? lastPage.nextCursor : undefined),
    enabled: !!categoryId && !!date,
    staleTime: Infinity,
    refetchOnMount: false,
  });
};

export default useCategoryLogsInfiniteQuery;
