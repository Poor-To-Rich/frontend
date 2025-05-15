import { getDefaultExpense, getDefaultIncome } from '@/api/services/categoryService';
import { IncomeExpenseType } from '@/types/transactionTypes';
import { useQuery } from '@tanstack/react-query';

const useGetDefaultCategory = (type: IncomeExpenseType) => {
  const queryFn = type === '지출' ? getDefaultExpense : getDefaultIncome;
  return useQuery({
    queryKey: [`defaultCategory`, type],
    queryFn: queryFn,
  });
};

export default useGetDefaultCategory;
