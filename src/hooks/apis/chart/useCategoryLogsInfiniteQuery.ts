import { getCategoryLogs } from '@/api/services/chartService';
import { CategoryDetailsRes } from '@/types/chartTypes';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

const useCategoryLogsInfiniteQuery = (categoryId: string, date: string) => {
  return useInfiniteQuery<CategoryDetailsRes, Error, InfiniteData<CategoryDetailsRes>, string[], string | null>({
    queryKey: ['categoryLogs', categoryId, date],
    queryFn: async ({ pageParam = null }) => await getCategoryLogs(categoryId, date, pageParam),
    initialPageParam: null,
    getNextPageParam: lastPage => (lastPage.hasNext ? lastPage.nextCursor : undefined),
    enabled: !!categoryId && !!date,
  });
};

export default useCategoryLogsInfiniteQuery;
