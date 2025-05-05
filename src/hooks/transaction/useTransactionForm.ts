import { useEffect } from 'react';
import { useCalenderDateStore } from '@/stores/useCalenderDateStore';
import useTransactionParams from '@/hooks/transaction/useTransactionParams';
import useGetTransaction from '@/hooks/apis/transaction/useGetTransaction';
import { IncomeExpenseButtonType, TransactionFormDataType } from '@/types/transactionTypes';
import { useFormContext } from 'react-hook-form';
import { useResetCustomIteration } from '@/hooks/useResetCustomIteration';

interface Props {
  transactionType: IncomeExpenseButtonType;
  initialIterationTypeRef: React.MutableRefObject<string>;
}

const useTransactionForm = ({ transactionType, initialIterationTypeRef }: Props) => {
  const { setCalenderDate } = useCalenderDateStore();
  const { reset } = useFormContext<TransactionFormDataType>();
  const { transactionDate, transactionId, isEditPage } = useTransactionParams();
  const { customIteration } = useResetCustomIteration();
  const { data } = isEditPage && transactionId ? useGetTransaction(transactionType, transactionId!) : { data: null };

  useEffect(() => {
    if (transactionDate) setCalenderDate(new Date(transactionDate));
  }, []);

  useEffect(() => {
    if (data) {
      if (data.iterationType !== 'custom') {
        reset({
          ...data,
          customIteration,
        });
      } else reset(data);
      initialIterationTypeRef.current = data.iterationType;
    }
  }, [data]);

  return;
};

export default useTransactionForm;
