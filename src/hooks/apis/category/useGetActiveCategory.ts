import { getActiveCategory } from '@/api/services/categoryService';
import { useQuery } from '@tanstack/react-query';

const useGetActiveCategory = (type: string) => {
  return useQuery({
    queryKey: [`activeCategories`, type],
    queryFn: () => getActiveCategory(type),
    staleTime: 30 * 60 * 1000,
    gcTime: 40 * 60 * 1000,
  });
};

export default useGetActiveCategory;
