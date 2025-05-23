import { getWeeklyDetails } from '@/api/services/reportService';
import { useQuery } from '@tanstack/react-query';

const useGetWeeklyDetailsSummary = (date: string, week: string) => {
  return useQuery({
    queryKey: ['weeklyDetails', date, week],
    queryFn: () => getWeeklyDetails(date, week),
  });
};

export default useGetWeeklyDetailsSummary;
