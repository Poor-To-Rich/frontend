import { getExpenseTransaction, getIncomeTransaction } from '@/api/services/transactionService';
import { IncomeExpenseButtonType } from '@/types/transactionTypes';
import { useQuery } from '@tanstack/react-query';

const useGetTransaction = (type: IncomeExpenseButtonType, id: string) => {
  const queryFn = type === '지출' ? getExpenseTransaction : getIncomeTransaction;

  return useQuery({
    queryKey: [`transaction:${id}`],
    queryFn: () => queryFn(id),
  });
};

export default useGetTransaction;
