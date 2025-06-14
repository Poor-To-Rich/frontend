import { deleteExpenseTransaction, deleteIncomeTransaction } from '@/api/services/transactionService';
import { useCalenderDateStore } from '@/stores/useCalenderDateStore';
import { useDraftStore } from '@/stores/useDreftStore';
import { DeleteTransactionReq, IncomeExpenseType } from '@/types/transactionTypes';
import invalidateTransactionQueries from '@/utils/invalidateTransactionQueries';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useDeleteTransaction = (type: IncomeExpenseType) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { calenderDate } = useCalenderDateStore();

  const mutationFn = type === '지출' ? deleteExpenseTransaction : deleteIncomeTransaction;

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body?: DeleteTransactionReq }) => mutationFn({ id, body }),
    onSuccess: () => {
      useDraftStore.getState().disableSave();
      invalidateTransactionQueries(queryClient, calenderDate);
      sessionStorage.removeItem('transaction-form-data');
      navigate(-1);
    },
    onError: error => {
      toast.error(error.message);
    },
  });
};

export default useDeleteTransaction;
