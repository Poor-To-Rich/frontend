import { getWeeklySummary } from '@/api/services/reportService';
import { useQuery } from '@tanstack/react-query';

const useGetWeeklySummary = (date: string) => {
  return useQuery({
    queryKey: ['weeklySummary', date],
    queryFn: () => getWeeklySummary(date),
  });
};

export default useGetWeeklySummary;
