import { updateCategory } from '@/api/services/categoryService';
import { BaseCategoriesType } from '@/types/categoryTypes';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useUpdateCategory = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: BaseCategoriesType }) => updateCategory(id, body),
    onSuccess: data => {
      toast.success(data.message);
      navigate(-1);
    },
    onError: error => {
      toast.error(error.message);
    },
  });
};

export default useUpdateCategory;
