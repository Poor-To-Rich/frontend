import { updateIncomeTransaction, updateExpenseTransaction } from '@/api/services/transactionService';
import { IncomeExpenseButtonType, TransactionFormDataType } from '@/types/transactionTypes';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useUpdateTransaction = (type: IncomeExpenseButtonType) => {
  const navigate = useNavigate();
  const mutationFn = type === '지출' ? updateExpenseTransaction : updateIncomeTransaction;

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: TransactionFormDataType }) => mutationFn(id, body),
    onSuccess: () => {
      navigate('/');
    },
    onError: error => {
      toast.error(error.message);
    },
  });
};

export default useUpdateTransaction;
