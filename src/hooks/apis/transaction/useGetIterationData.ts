import { getIterationExpense, getIterationIncome } from '@/api/services/transactionService';
import { IncomeExpenseType } from '@/types/transactionTypes';
import { useQuery } from '@tanstack/react-query';

const useGetIterationData = (type: IncomeExpenseType) => {
  const queryFn = type === '지출' ? getIterationExpense : getIterationIncome;
  return useQuery({
    queryKey: ['iterationData', type],
    queryFn: queryFn,
  });
};

export default useGetIterationData;
