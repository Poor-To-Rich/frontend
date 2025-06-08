import { addExpenseTransaction, addIncomeTransaction } from '@/api/services/transactionService';
import { useCalenderDateStore } from '@/stores/useCalenderDateStore';
import { IncomeExpenseType, TransactionFormDataType } from '@/types/transactionTypes';
import CustomError from '@/utils/CustomError';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { UseFormSetError } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface Props {
  type: IncomeExpenseType;
  setError: UseFormSetError<TransactionFormDataType>;
}

const useAddTransaction = ({ type, setError }: Props) => {
  const queryClient = useQueryClient();
  const date = useCalenderDateStore().calenderDate;
  const mutationFn = type === '지출' ? addExpenseTransaction : addIncomeTransaction;
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (body: TransactionFormDataType) => mutationFn(body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['dailyDetails', format(date, 'yyyy-MM-dd')],
      });
      queryClient.invalidateQueries({
        queryKey: ['monthlyTotal', format(date, 'yyyy-MM')],
      });
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
