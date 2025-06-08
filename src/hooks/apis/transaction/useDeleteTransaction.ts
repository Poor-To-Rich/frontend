import { deleteExpenseTransaction, deleteIncomeTransaction } from '@/api/services/transactionService';
import { useCalenderDateStore } from '@/stores/useCalenderDateStore';
import { DeleteTransactionReq, IncomeExpenseType } from '@/types/transactionTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useDeleteTransaction = (type: IncomeExpenseType) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const date = useCalenderDateStore().calenderDate;
  const mutationFn = type === '지출' ? deleteExpenseTransaction : deleteIncomeTransaction;

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body?: DeleteTransactionReq }) => mutationFn({ id, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['dailyDetails', format(date, 'yyyy-MM-dd')],
      });
      queryClient.invalidateQueries({
        queryKey: ['monthlyTotal', format(date, 'yyyy-MM')],
      });
      navigate('/');
    },
    onError: error => {
      toast.error(error.message);
    },
  });
};

export default useDeleteTransaction;
