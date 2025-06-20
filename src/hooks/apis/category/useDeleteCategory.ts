import { deleteCategory } from '@/api/services/categoryService';
import { IncomeExpenseType } from '@/types/transactionTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const useDeleteCategory = (type: IncomeExpenseType) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: ['customCategories', type],
      });
      queryClient.invalidateQueries({
        queryKey: [`activeCategories`, type === '수입' ? 'income' : 'expense'],
      });
      toast.success(data.message);
    },
  });
};

export default useDeleteCategory;
