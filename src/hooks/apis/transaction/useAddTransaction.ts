import { addExpenseTransaction, addIncomeTransaction } from '@/api/services/transactionService';
import { useCalenderDateStore } from '@/stores/useCalenderDateStore';
import { useDraftStore } from '@/stores/useDraftStore';
import { IncomeExpenseType, TransactionFormDataType } from '@/types/transactionTypes';
import CustomError from '@/utils/CustomError';
import invalidateTransactionQueries from '@/utils/invalidateTransactionQueries';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface Props {
  type: IncomeExpenseType;
  setError: UseFormSetError<TransactionFormDataType>;
}

const useAddTransaction = ({ type, setError }: Props) => {
  const queryClient = useQueryClient();
  const { calenderDate } = useCalenderDateStore();

  const mutationFn = type === '지출' ? addExpenseTransaction : addIncomeTransaction;
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (body: TransactionFormDataType) => mutationFn(body),
    onSuccess: data => {
      useDraftStore.getState().disableSave();
      invalidateTransactionQueries(queryClient, calenderDate, data.data?.categoryId);
      sessionStorage.setItem('selected-id', String(data.data?.id));
      sessionStorage.removeItem('transaction-form-data');
      navigate('/');
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

export default useAddTransaction;
