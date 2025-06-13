import { getExpenseBarChart, getIncomeBarChart } from '@/api/services/chartService';
import { IncomeExpenseType } from '@/types/transactionTypes';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const useGetBarChart = (transactionType: IncomeExpenseType, date: string) => {
  const queryFn = transactionType === '지출' ? getExpenseBarChart : getIncomeBarChart;

  return useQuery({
    queryKey: ['barChart', date, transactionType],
    queryFn: () => queryFn(date),
    placeholderData: keepPreviousData,
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
};

export default useGetBarChart;
