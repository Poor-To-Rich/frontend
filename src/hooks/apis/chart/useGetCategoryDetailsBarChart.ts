import { getCategoryDetailsBarChart } from '@/api/services/chartService';
import { useQuery } from '@tanstack/react-query';

const useGetCategoryDetailsBarChart = (categoryId: string, date: string, enabled: boolean) => {
  return useQuery({
    queryKey: ['categoryDetailsBarChart', categoryId, date],
    queryFn: () => getCategoryDetailsBarChart(categoryId, date),
    enabled,
  });
};

export default useGetCategoryDetailsBarChart;
