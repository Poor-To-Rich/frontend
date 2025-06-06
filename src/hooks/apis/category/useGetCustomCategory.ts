import { getCustomExpense, getCustomIncome } from '@/api/services/categoryService';
import { IncomeExpenseType } from '@/types/transactionTypes';
import { useQuery } from '@tanstack/react-query';

const useGetCustomCategory = (type: IncomeExpenseType) => {
  const queryFn = type === '지출' ? getCustomExpense : getCustomIncome;
  return useQuery({
    queryKey: ['customCategory', type],
    queryFn: queryFn,
  });
};

export default useGetCustomCategory;
