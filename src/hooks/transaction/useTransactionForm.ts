import { useEffect } from 'react';
import { useCalenderDateStore } from '@/stores/useCalenderDateStore';
import useTransactionParams from '@/hooks/transaction/useTransactionParams';
import useGetTransaction from '@/hooks/apis/transaction/useGetTransaction';
import { IncomeExpenseType, TransactionFormDataType } from '@/types/transactionTypes';
import { useFormContext } from 'react-hook-form';
import { merge } from 'lodash';
import { useDraftMetaStore } from '@/stores/useDraftMetaStore';

interface Props {
  transactionType?: IncomeExpenseType;
  initialIterationTypeRef: React.MutableRefObject<string>;
}

const useSettingTransactionForm = ({ transactionType, initialIterationTypeRef }: Props) => {
  const { setCalenderDate } = useCalenderDateStore();
  const { reset, getValues } = useFormContext<TransactionFormDataType>();
  const { transactionDate, transactionId } = useTransactionParams();
  const { hasDraftData } = useDraftMetaStore();
  const isExpense = transactionType === '지출';

  const { data: transactionFormData, isFetching: isGetTransactionFetching } = useGetTransaction(
    transactionType!,
    transactionId!,
  );

  useEffect(() => {
    if (transactionDate) setCalenderDate(new Date(transactionDate));
  }, [transactionDate, setCalenderDate]);

  useEffect(() => {
    if (transactionFormData && !hasDraftData) {
      const transactionType = isExpense ? '지출' : '수입';
      const { customIteration: prevCustomIteration } = getValues();

      if (transactionFormData.iterationType !== 'custom') {
        reset(
          {
            ...transactionFormData,
            transactionType,
            customIteration: prevCustomIteration,
          },
          { keepDirty: false, keepDefaultValues: false, keepValues: false },
        );
      } else {
        const merged = merge({}, prevCustomIteration, transactionFormData.customIteration);

        reset(
          { ...transactionFormData, transactionType, customIteration: merged },
          { keepDirty: false, keepDefaultValues: false, keepValues: false },
        );
      }

      initialIterationTypeRef.current = transactionFormData.iterationType;
    }
  }, [hasDraftData, transactionFormData, initialIterationTypeRef, reset]);

  return {
    isExpense,
    transactionFormData,
    isGetTransactionFetching,
  };
};

export default useSettingTransactionForm;
