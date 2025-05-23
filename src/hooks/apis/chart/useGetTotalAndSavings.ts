import { getExpenseTotalAndSavings, getIncomeTotalAndSavings } from '@/api/services/chartService';
import { IncomeExpenseType } from '@/types/transactionTypes';
import { useQuery } from '@tanstack/react-query';

const useGetTotalAndSavings = (transactionType: IncomeExpenseType, date: string) => {
  const queryFn = transactionType === '지출' ? getExpenseTotalAndSavings : getIncomeTotalAndSavings;
  return useQuery({
    queryKey: ['totalAndSavings', transactionType, date],
    queryFn: () => queryFn(date),
  });
};

export default useGetTotalAndSavings;
