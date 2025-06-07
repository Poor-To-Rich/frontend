import { getActiveCategory } from '@/api/services/categoryService';
import { useQuery } from '@tanstack/react-query';

const useGetActiveCategory = (type: string) => {
  return useQuery({
    queryKey: [`activeCategories`, type],
    queryFn: () => getActiveCategory(type),
  });
};

export default useGetActiveCategory;
