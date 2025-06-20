import { updateIncomeTransaction, updateExpenseTransaction } from '@/api/services/transactionService';
import { useCalenderDateStore } from '@/stores/useCalenderDateStore';
import { useDraftStore } from '@/stores/useDraftStore';
import { IncomeExpenseType, TransactionFormDataType } from '@/types/transactionTypes';
import { createFormErrorHandler } from '@/utils/error/errorHandler';
import invalidateTransactionQueries from '@/utils/invalidateTransactionQueries';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const useUpdateTransaction = ({
  type,
  setError,
}: {
  type: IncomeExpenseType;
  setError: UseFormSetError<TransactionFormDataType>;
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { calenderDate } = useCalenderDateStore();
  const mutationFn = type === '지출' ? updateExpenseTransaction : updateIncomeTransaction;

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: TransactionFormDataType }) => mutationFn(id, body),
    onSuccess: data => {
      useDraftStore.getState().disableSave();
      invalidateTransactionQueries(queryClient, calenderDate, data.data?.categoryId);
      sessionStorage.removeItem('transaction-form-data');
      navigate(-1);
    },
    onError: createFormErrorHandler(setError),
  });
};

export default useUpdateTransaction;
