import { useEffect } from 'react';
import useAddTransaction from '@/hooks/apis/transaction/useAddTransaction';
import useGetActiveCategory from '@/hooks/apis/category/useGetActiveCategory';
import useFilteredCategories from '@/hooks/category/useFilteredCategories ';
import useTransactionParams from '@/hooks/transaction/useTransactionParams';
import { useCalenderDateStore } from '@/stores/useCalenderDateStore';
import { LOADING_OPTIONS } from '@/constants/options';
import { useTransactionFormLogic } from '@/hooks/transaction/useTransactionFormLogic';
import TransactionFormContent from '@/components/form/TransactionFormContent';
import { IncomeExpenseType, TransactionFormDataType } from '@/types/transactionTypes';

const AddTransactionForm = () => {
  const { transactionDate } = useTransactionParams();
  const { setCalenderDate } = useCalenderDateStore();

  const {
    handleSubmit,
    setValue,
    setError,
    transactionType,
    isValid,
    backupCustomIteration,
    isOpen,
    openModal,
    closeModal,
    isCustomOpen,
    closeCustom,
    hasDraftData,
    handleIterationTypeClick,
    getFormData,
  } = useTransactionFormLogic();

  const isExpense = transactionType === '지출';
  const { mutate: addTransaction, isPending: isAddPending } = useAddTransaction({
    type: transactionType,
    setError,
  });
  const { data: activeCategories, isPending: isCategoryPending } = useGetActiveCategory(
    isExpense ? 'expense' : 'income',
  );
  const { categoryOptions } = useFilteredCategories(activeCategories);

  const onSubmit = (data: TransactionFormDataType) => {
    const body = getFormData(data);
    addTransaction(body);
  };

  const handleTransactionTypeChange = (value: IncomeExpenseType) => {
    setValue('transactionType', value, { shouldDirty: true });
  };

  useEffect(() => {
    if (transactionDate) {
      setCalenderDate(new Date(transactionDate));
    }
  }, [transactionDate, setCalenderDate]);

  return (
    <TransactionFormContent
      transactionType={transactionType}
      options={isCategoryPending ? LOADING_OPTIONS : categoryOptions}
      isValid={isValid}
      hasDraftData={hasDraftData}
      isPending={isAddPending}
      onTransactionTypeChange={handleTransactionTypeChange}
      onSubmit={handleSubmit(onSubmit)}
      isOpen={isOpen}
      openModal={openModal}
      closeModal={closeModal}
      isCustomOpen={isCustomOpen}
      closeCustom={closeCustom}
      backupCustomIteration={backupCustomIteration}
      handleIterationTypeClick={handleIterationTypeClick}
    />
  );
};

export default AddTransactionForm;
