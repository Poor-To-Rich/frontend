import { addExpenseCategory, addIncomeCategory } from '@/api/services/categoryService';
import { BaseCategoriesType } from '@/types/categoryTypes';
import { IncomeExpenseType } from '@/types/transactionTypes';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useAddCategory = (type: IncomeExpenseType) => {
  const mutationFn = type === '지출' ? addExpenseCategory : addIncomeCategory;
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (body: BaseCategoriesType) => mutationFn(body),
    onSuccess: data => {
      toast.success(data.message);
      navigate(`/categories?type=${type}`, { replace: true });
    },
    onError: error => {
      toast.error(error.message);
    },
  });
};

export default useAddCategory;
