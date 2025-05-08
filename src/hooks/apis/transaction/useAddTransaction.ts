import { addExpenseTransaction, addIncomeTransaction } from '@/api/services/transactionService';
import { IncomeExpenseButtonType, TransactionFormDataType } from '@/types/transactionTypes';
import CustomError from '@/utils/CustomError';
import { useMutation } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const useAddTransaction = ({
  type,
  setError,
}: {
  type: IncomeExpenseButtonType;
  setError: UseFormSetError<TransactionFormDataType>;
}) => {
  const mutationFn = type === '지출' ? addExpenseTransaction : addIncomeTransaction;
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (body: TransactionFormDataType) => mutationFn(body),
    onSuccess: () => {
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
