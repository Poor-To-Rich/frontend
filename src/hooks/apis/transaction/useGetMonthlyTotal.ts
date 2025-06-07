import { getMonthlyTotal } from '@/api/services/transactionService';
import { MonthlyTotalTransactionType } from '@/types/transactionTypes';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const useGetMonthlyTotal = (date: string) => {
  return useQuery<MonthlyTotalTransactionType>({
    queryKey: ['monthlyTotal', date],
    queryFn: () => getMonthlyTotal(date),
    placeholderData: keepPreviousData,
  });
};

export default useGetMonthlyTotal;
