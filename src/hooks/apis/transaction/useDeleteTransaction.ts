import { deleteExpenseTransaction, deleteIncomeTransaction } from '@/api/services/transactionService';
import { DeleteTransactionReq, IncomeExpenseType } from '@/types/transactionTypes';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useDeleteTransaction = (type: IncomeExpenseType) => {
  const navigate = useNavigate();
  const mutationFn = type === '지출' ? deleteExpenseTransaction : deleteIncomeTransaction;

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body?: DeleteTransactionReq }) => mutationFn({ id, body }),
    onSuccess: () => {
      navigate('/');
    },
    onError: error => {
      toast.error(error.message);
    },
  });
};

export default useDeleteTransaction;
