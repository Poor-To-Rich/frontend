import { getYearlySummary } from '@/api/services/reportService';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const useGetYearlySummary = (date: string) => {
  return useQuery({
    queryKey: ['yearlySummary', date],
    queryFn: () => getYearlySummary(date),
    placeholderData: keepPreviousData,
  });
};

export default useGetYearlySummary;
