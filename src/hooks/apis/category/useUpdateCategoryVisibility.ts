import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCategoryVisibility } from '@/api/services/categoryService';
import { CategoryVisibility, DefaultCategoriesType } from '@/types/categoryTypes';
import toast from 'react-hot-toast';
import { IncomeExpenseType } from '@/types/transactionTypes';
import * as Sentry from '@sentry/react';

interface Props {
  type: IncomeExpenseType;
}

const useUpdateCategoryVisibility = ({ type }: Props) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: CategoryVisibility }) => updateCategoryVisibility(id, body),
    onMutate: async ({ id, body }) => {
      await queryClient.cancelQueries({ queryKey: ['defaultCategories', type] });

      const previousData = queryClient.getQueryData(['defaultCategories', type]);

      queryClient.setQueryData(['defaultCategories', type], (old: DefaultCategoriesType[]) => {
        if (!old) return old;
        return old.map((category: DefaultCategoriesType) =>
          String(category.id) === id ? { ...category, visibility: body.visibility } : category,
        );
      });

      return { previousData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`activeCategories`, type === '수입' ? 'income' : 'expense'],
      });
    },
    onError: (error, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['defaultCategories', type], context.previousData);
      }
      toast.error(error.message);
      Sentry.captureException(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['defaultCategories', type] });
    },
  });
};

export default useUpdateCategoryVisibility;
