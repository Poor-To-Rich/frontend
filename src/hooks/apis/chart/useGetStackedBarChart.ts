import { getExpenseStackedBarChart, getIncomeStackedBarChart } from '@/api/services/chartService';
import { IncomeExpenseType } from '@/types/transactionTypes';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const useGetStackedBarChart = (transactionType: IncomeExpenseType, date: string) => {
  const queryFn = transactionType === '지출' ? getExpenseStackedBarChart : getIncomeStackedBarChart;

  return useQuery({
    queryKey: ['stackedBarChart', date, transactionType],
    queryFn: () => queryFn(date),
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
};

export default useGetStackedBarChart;
