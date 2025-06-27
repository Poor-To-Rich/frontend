import { getDailyDetails } from '@/api/services/transactionService';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const useGetDailyDetails = (date: string) => {
  return useQuery({
    queryKey: ['dailyDetails', date],
    queryFn: () => getDailyDetails(date),
    throwOnError: false,
    placeholderData: keepPreviousData,
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
};

export default useGetDailyDetails;
