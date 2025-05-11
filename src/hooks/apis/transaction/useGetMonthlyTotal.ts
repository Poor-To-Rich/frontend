import { getMonthlyTotal } from '@/api/services/transactionService';
import { useQuery } from '@tanstack/react-query';

const useGetMonthlyTotal = (date: string) => {
  return useQuery({
    queryKey: [`${date} monthlyTotal`],
    queryFn: () => getMonthlyTotal(date),
  });
};

export default useGetMonthlyTotal;
