import { getYearlySummary } from '@/api/services/reportService';
import { useQuery } from '@tanstack/react-query';

const useGetYearlySummary = (date: string) => {
  return useQuery({
    queryKey: ['yearlySummary', date],
    queryFn: () => getYearlySummary(date),
  });
};

export default useGetYearlySummary;
