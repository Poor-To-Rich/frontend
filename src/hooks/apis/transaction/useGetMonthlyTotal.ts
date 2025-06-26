import { getMonthlyTotal } from '@/api/services/transactionService';
import { MonthlyTotalTransactionType } from '@/types/transactionTypes';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const useGetMonthlyTotal = (date: string) => {
  return useQuery<MonthlyTotalTransactionType>({
    queryKey: ['monthlyTotal', date],
    queryFn: () => getMonthlyTotal(date),
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
};

export default useGetMonthlyTotal;
