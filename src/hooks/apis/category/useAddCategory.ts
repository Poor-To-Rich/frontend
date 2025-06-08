import { addExpenseCategory, addIncomeCategory } from '@/api/services/categoryService';
import { BaseCategoriesType } from '@/types/categoryTypes';
import { IncomeExpenseType } from '@/types/transactionTypes';
import CustomError from '@/utils/CustomError';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface Props {
  type: IncomeExpenseType;
  setError: UseFormSetError<BaseCategoriesType>;
}

const useAddCategory = ({ type, setError }: Props) => {
  const queryClient = useQueryClient();
  const mutationFn = type === '지출' ? addExpenseCategory : addIncomeCategory;
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (body: BaseCategoriesType) => mutationFn(body),
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: ['customCategories', type],
      });
      queryClient.invalidateQueries({
        queryKey: [`activeCategories`, type],
      });
      toast.success(data.message);
      navigate(-1);
    },
    onError: (error: CustomError) => {
      setError('name', {
        type: 'server',
        message: `${error.message}`,
      });
    },
  });
};

export default useAddCategory;
