import { addExpense, addIncome } from '@/api/services/transactionService';
import { IncomeExpenseButtonType, TransactionFormDataType } from '@/types/transactionTypes';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useAddTransaction = (type: IncomeExpenseButtonType) => {
  const mutationFn = type === '지출' ? addExpense : addIncome;
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (body: TransactionFormDataType) => mutationFn(body),
    onSuccess: () => {
      navigate('/');
    },
    onError: error => {
      toast.error(error.message);
    },
  });
};

export default useAddTransaction;
