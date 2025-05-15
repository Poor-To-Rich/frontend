import { getCategory } from '@/api/services/categoryService';
import { useQuery } from '@tanstack/react-query';

const useGetCategory = (id: string, enabled: boolean) => {
  return useQuery({
    queryKey: [`${id}-category`],
    queryFn: () => getCategory(id),
    enabled: enabled,
  });
};

export default useGetCategory;
