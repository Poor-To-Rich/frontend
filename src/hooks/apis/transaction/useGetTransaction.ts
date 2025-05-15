import { getExpenseTransaction, getIncomeTransaction } from '@/api/services/transactionService';
import { IncomeExpenseType } from '@/types/transactionTypes';
import { useQuery } from '@tanstack/react-query';

const useGetTransaction = (type: IncomeExpenseType, id: string, enable: boolean) => {
  const queryFn = type === '지출' ? getExpenseTransaction : getIncomeTransaction;

  return useQuery({
    queryKey: ['transaction', type, id],
    queryFn: () => queryFn(id),
    enabled: enable,
  });
};

export default useGetTransaction;
