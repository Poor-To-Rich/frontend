import { getDailyDetails } from '@/api/services/transactionService';
import { useQuery } from '@tanstack/react-query';

const useGetDailyDetails = (date: string) => {
  return useQuery({
    queryKey: ['dailyDetails', date],
    queryFn: () => getDailyDetails(date),
  });
};

export default useGetDailyDetails;
