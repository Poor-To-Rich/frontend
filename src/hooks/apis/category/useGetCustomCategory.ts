import { getCustomExpense, getCustomIncome } from '@/api/services/categoryService';
import { IncomeExpenseType } from '@/types/transactionTypes';
import { useQuery } from '@tanstack/react-query';

const useGetCustomCategory = (type: IncomeExpenseType) => {
  const queryFn = type === '지출' ? getCustomExpense : getCustomIncome;
  return useQuery({
    queryKey: ['customCategories', type],
    queryFn: queryFn,
    staleTime: 30 * 60 * 1000,
    gcTime: 40 * 60 * 1000,
  });
};

export default useGetCustomCategory;
