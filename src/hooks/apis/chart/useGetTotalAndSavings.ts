import { getExpenseTotalAndSavings, getIncomeTotalAndSavings } from '@/api/services/chartService';
import { IncomeExpenseType } from '@/types/transactionTypes';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const useGetTotalAndSavings = (transactionType: IncomeExpenseType, date: string) => {
  const queryFn = transactionType === '지출' ? getExpenseTotalAndSavings : getIncomeTotalAndSavings;

  return useQuery({
    queryKey: ['totalAndSavings', date, transactionType],
    queryFn: () => queryFn(date),
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
};

export default useGetTotalAndSavings;
