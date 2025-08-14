import { getWeeklySummary } from '@/api/services/reportService';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const useGetWeeklySummary = (date: string) => {
  return useQuery({
    queryKey: ['weeklySummary', date],
    queryFn: () => getWeeklySummary(date),
    placeholderData: keepPreviousData,
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
};

export default useGetWeeklySummary;
