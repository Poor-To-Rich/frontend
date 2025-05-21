import { getMonthlyTotal } from '@/api/services/transactionService';
import { useQuery } from '@tanstack/react-query';

const useGetMonthlyTotal = (date: string) => {
  return useQuery({
    queryKey: ['monthlyTotal', date],
    queryFn: () => getMonthlyTotal(date),
  });
};

export default useGetMonthlyTotal;
