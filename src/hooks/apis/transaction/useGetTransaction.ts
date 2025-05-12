import { getExpenseTransaction, getIncomeTransaction } from '@/api/services/transactionService';
import { IncomeExpenseButtonType } from '@/types/transactionTypes';
import { useQuery } from '@tanstack/react-query';

const useGetTransaction = (type: IncomeExpenseButtonType, id: string, enable: boolean) => {
  const queryFn = type === '지출' ? getExpenseTransaction : getIncomeTransaction;

  return useQuery({
    queryKey: [`transaction:${id}`],
    queryFn: () => queryFn(id),
    enabled: enable,
  });
};

export default useGetTransaction;
