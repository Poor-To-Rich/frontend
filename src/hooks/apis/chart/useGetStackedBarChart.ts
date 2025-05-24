import { getExpenseStackedBarChart, getIncomeStackedBarChart } from '@/api/services/chartService';
import { IncomeExpenseType } from '@/types/transactionTypes';
import { useQuery } from '@tanstack/react-query';

const useGetStackedBarChart = (transactionType: IncomeExpenseType, date: string) => {
  const queryFn = transactionType === '지출' ? getExpenseStackedBarChart : getIncomeStackedBarChart;

  return useQuery({
    queryKey: ['stackedBarChart', transactionType, date],
    queryFn: () => queryFn(date),
  });
};

export default useGetStackedBarChart;
