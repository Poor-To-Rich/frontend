import { useMutation } from '@tanstack/react-query';
import { updateCategoryVisibility } from '@/api/services/categoryService';
import { CategoryVisibility } from '@/types/categoryTypes';
import toast from 'react-hot-toast';

const useUpdateCategoryVisibility = () => {
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: CategoryVisibility }) => updateCategoryVisibility(id, body),
    onError: error => {
      toast.error(error.message);
    },
  });
};

export default useUpdateCategoryVisibility;
