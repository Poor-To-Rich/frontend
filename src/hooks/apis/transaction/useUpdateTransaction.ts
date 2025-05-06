import { updateIncomeTransaction, updateExpenseTransaction } from '@/api/services/transactionService';
import { IncomeExpenseButtonType, TransactionFormDataType } from '@/types/transactionTypes';
import { useMutation } from '@tanstack/react-query';

const useUpdateTransaction = (type: IncomeExpenseButtonType) => {
  const mutationFn = type === '지출' ? updateExpenseTransaction : updateIncomeTransaction;
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: TransactionFormDataType }) => mutationFn(id, body),
    onSuccess: () => {},
    onError: () => {},
  });
};

export default useUpdateTransaction;
