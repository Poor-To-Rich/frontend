import { updateCategory } from '@/api/services/categoryService';
import { BaseCategoriesType } from '@/types/categoryTypes';
import { IncomeExpenseType } from '@/types/transactionTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useUpdateCategory = (type: IncomeExpenseType) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: BaseCategoriesType }) => updateCategory(id, body),
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: ['customCategories', type],
      });
      queryClient.invalidateQueries({
        queryKey: [`activeCategories`, type === '수입' ? 'income' : 'expense'],
      });
      toast.success(data.message);
      navigate(-1);
    },
  });
};

export default useUpdateCategory;
