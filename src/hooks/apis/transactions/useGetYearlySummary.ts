import { getYearlySummary } from '@/api/services/reportService';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const useGetYearlySummary = (date: string) => {
  return useQuery({
    queryKey: ['yearlySummary', date],
    queryFn: () => getYearlySummary(date),
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
};

export default useGetYearlySummary;
