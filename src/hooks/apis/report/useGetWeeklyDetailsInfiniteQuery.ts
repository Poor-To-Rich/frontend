import { getWeeklyDetails } from '@/api/services/reportService';
import { WeeklyDetailsSummaryType } from '@/types/reportTypes';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

const useGetWeeklyDetailsInfiniteQuery = (date: string, week: string) => {
  return useInfiniteQuery<
    WeeklyDetailsSummaryType,
    Error,
    InfiniteData<WeeklyDetailsSummaryType>,
    string[],
    string | null
  >({
    queryKey: ['weeklyDetails', date, week],
    queryFn: async ({ pageParam = null }) => await getWeeklyDetails(date, week, pageParam),
    initialPageParam: null,
    getNextPageParam: lastPage => (lastPage.hasNext ? lastPage.nextCursor : undefined),
    enabled: !!week && !!date,
  });
};

export default useGetWeeklyDetailsInfiniteQuery;
