import { getDefaultExpense, getDefaultIncome } from '@/api/services/categoryService';
import { IncomeExpenseType } from '@/types/transactionTypes';
import { useQuery } from '@tanstack/react-query';

const useGetDefaultCategory = (type: IncomeExpenseType) => {
  const queryFn = type === '지출' ? getDefaultExpense : getDefaultIncome;
  return useQuery({
    queryKey: [`defaultCategories`, type],
    queryFn: queryFn,
    staleTime: 30 * 60 * 1000,
    gcTime: 40 * 60 * 1000,
  });
};

export default useGetDefaultCategory;
