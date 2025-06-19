import { updateIncomeTransaction, updateExpenseTransaction } from '@/api/services/transactionService';
import { useCalenderDateStore } from '@/stores/useCalenderDateStore';
import { useDraftStore } from '@/stores/useDraftStore';
import { IncomeExpenseType, TransactionFormDataType } from '@/types/transactionTypes';
import CustomError from '@/utils/CustomError';
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
    onError: (error: CustomError<{ field: keyof TransactionFormDataType }>) => {
      if (error.data)
        setError(error.data.field, {
          type: 'server',
          message: error.message,
        });
    },
  });
};

export default useUpdateTransaction;
