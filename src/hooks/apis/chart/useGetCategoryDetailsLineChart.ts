import { getCategoryDetailsLineChart } from '@/api/services/chartService';
import { useQuery } from '@tanstack/react-query';

const useGetCategoryDetailsLineChart = (categoryId: string, date: string, enabled: boolean) => {
  return useQuery({
    queryKey: ['categoryDetailsLineChart', categoryId, date],
    queryFn: () => getCategoryDetailsLineChart(categoryId, date),
    enabled,
  });
};

export default useGetCategoryDetailsLineChart;
