import { getDailyDetails } from '@/api/services/transactionService';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const useGetDailyDetails = (date: string) => {
  return useQuery({
    queryKey: ['dailyDetails', date],
    queryFn: () => getDailyDetails(date),
    placeholderData: keepPreviousData,
  });
};

export default useGetDailyDetails;
