import { getExpenseTransaction, getIncomeTransaction } from '@/api/services/transactionService';
import { IncomeExpenseType } from '@/types/transactionTypes';
import { useQuery } from '@tanstack/react-query';

const useGetTransaction = (type: IncomeExpenseType, id: string, enabled: boolean) => {
  const queryFn = type === '지출' ? getExpenseTransaction : getIncomeTransaction;

  return useQuery({
    queryKey: ['transaction', type, id],
    queryFn: () => queryFn(id),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    enabled: enabled,
  });
};

export default useGetTransaction;
