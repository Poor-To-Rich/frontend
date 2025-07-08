import { updateCategory } from '@/api/services/categoryService';
import { BaseCategoriesType } from '@/types/categoryTypes';
import { IncomeExpenseType } from '@/types/transactionTypes';
import { createFormErrorHandler } from '@/utils/error/errorHandler';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useUpdateCategory = (type: IncomeExpenseType, setError: UseFormSetError<BaseCategoriesType>) => {
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
    onError: createFormErrorHandler(setError),
  });
};

export default useUpdateCategory;
