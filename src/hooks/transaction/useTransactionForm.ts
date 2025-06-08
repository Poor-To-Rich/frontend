import { useEffect } from 'react';
import { useCalenderDateStore } from '@/stores/useCalenderDateStore';
import useTransactionParams from '@/hooks/transaction/useTransactionParams';
import useGetTransaction from '@/hooks/apis/transaction/useGetTransaction';
import { IncomeExpenseType, TransactionFormDataType } from '@/types/transactionTypes';
import { useFormContext } from 'react-hook-form';
import { useResetCustomIteration } from '@/hooks/useResetCustomIteration';
import { merge } from 'lodash';
import useGetActiveCategory from '@/hooks/apis/category/useGetActiveCategory';
import useFilteredCategories from '@/hooks/category/useFilteredCategories ';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '@/constants/options';

interface Props {
  transactionType?: IncomeExpenseType;
  initialIterationTypeRef: React.MutableRefObject<string>;
}

const useTransactionForm = ({ transactionType, initialIterationTypeRef }: Props) => {
  const { setCalenderDate } = useCalenderDateStore();
  const { reset, setValue } = useFormContext<TransactionFormDataType>();
  const { transactionDate, transactionId, isEditPage } = useTransactionParams();
  const { customIteration } = useResetCustomIteration();
  const isExpense = transactionType === '지출';
  const enabled = Boolean(isEditPage && transactionId && transactionType);

  const { data: transactionFormData, isFetching: isGetTransactionFetching } = useGetTransaction(
    transactionType!,
    transactionId!,
    enabled,
  );
  const { data: activeCategories, isPending: isCategoryPending } = useGetActiveCategory(
    isExpense ? 'expense' : 'income',
  );
  const categories = isExpense ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;
  const { categoryOptions } = useFilteredCategories(categories, transactionFormData, activeCategories, isEditPage);

  useEffect(() => {
    if (transactionDate) setCalenderDate(new Date(transactionDate));
  }, [transactionDate, setCalenderDate]);

  useEffect(() => {
    if (transactionFormData) {
      if (transactionFormData.iterationType !== 'custom') {
        reset({
          ...transactionFormData,
          customIteration,
        });
      } else {
        const merged = merge({}, customIteration, transactionFormData.customIteration);

        reset({ ...transactionFormData, customIteration: merged });
      }
      initialIterationTypeRef.current = transactionFormData.iterationType;
    }
  }, [transactionFormData, initialIterationTypeRef, reset]);

  useEffect(() => {
    if (categoryOptions.length > 0) {
      setValue('categoryName', categoryOptions[0].value);
    }
  }, [categoryOptions, setValue]);

  return {
    categoryOptions,
    isGetTransactionFetching,
    isCategoryPending,
  };
};

export default useTransactionForm;
