import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import { TransactionFormDataType, IncomeExpenseType } from '@/types/transactionTypes';
import { CustomIterationType, IterationCycleValue } from '@/types/iterationTypes';
import useModal from '@/hooks/useModal';
import useTransactionDraft from '@/hooks/transaction/useTransactionDraft';
import { getFinalData } from '@/utils/form/filterTransactionForm';

export const useTransactionFormLogic = () => {
  const {
    handleSubmit,
    setValue,
    getValues,
    setError,
    watch,
    formState: { isValid },
  } = useFormContext<TransactionFormDataType>();

  const transactionType = watch('transactionType') as IncomeExpenseType;
  const [backupCustomIteration, setBackupCustomIteration] = useState<CustomIterationType | null>(null);

  const { isOpen, openModal, closeModal } = useModal();
  const { isOpen: isCustomOpen, openModal: openCustom, closeModal: closeCustom } = useModal();
  const { hasDraftData } = useTransactionDraft();

  const handleIterationTypeClick = (value: IterationCycleValue) => {
    if (value !== 'custom') {
      setValue('iterationType', value, { shouldDirty: true });
      closeModal();
    } else {
      const current = JSON.parse(JSON.stringify(getValues('customIteration')));
      setBackupCustomIteration(current);
      openCustom();
    }
  };

  const getFormData = (data: TransactionFormDataType) => {
    const isIncome = transactionType === '수입';
    return getFinalData(data, isIncome);
  };

  return {
    handleSubmit,
    setValue,
    getValues,
    setError,
    transactionType,
    isValid,
    backupCustomIteration,
    setBackupCustomIteration,
    isOpen,
    openModal,
    closeModal,
    isCustomOpen,
    openCustom,
    closeCustom,
    hasDraftData,
    handleIterationTypeClick,
    getFormData,
  };
};
