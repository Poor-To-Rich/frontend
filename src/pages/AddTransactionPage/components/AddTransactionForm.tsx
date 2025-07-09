import IncomeExpenseButton from '@/components/button/IncomeExpenseButton';
import { IncomeExpenseType, TransactionFormDataType } from '@/types/transactionTypes';
import RepeatCircleButton from '@/components/button/icon/RepeatCircleButton';
import PrimaryButton from '@/components/button/PrimaryButton';
import useAddTransaction from '@/hooks/apis/transaction/useAddTransaction';
import { useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { CustomIterationType, IterationCycleValue } from '@/types/iterationTypes';
import CustomIterationModal from '@/components/modal/custom/CustomIterationModal';
import useModal from '@/hooks/useModal';
import { getFinalData } from '@/utils/form/filterTransactionForm';
import { LOADING_OPTIONS } from '@/constants/options';
import useTransactionDraft from '@/hooks/transaction/useTransactionDraft';
import useGetActiveCategory from '@/hooks/apis/category/useGetActiveCategory';
import TransactionFields from '@/components/input/transaction/TransactionFields';
import IterationCycleModal from '@/components/modal/IterationCycleModal';
import useFilteredCategories from '@/hooks/category/useFilteredCategories ';
import useTransactionParams from '@/hooks/transaction/useTransactionParams';
import { useCalenderDateStore } from '@/stores/useCalenderDateStore';
import clsx from 'clsx';
import { isIOSPWA } from '@/utils/deviceUtils';

const AddTransactionForm = () => {
  const {
    handleSubmit,
    setValue,
    getValues,
    setError,
    watch,
    formState: { isValid },
  } = useFormContext<TransactionFormDataType>();
  const { transactionDate } = useTransactionParams();
  const { setCalenderDate } = useCalenderDateStore();
  const transactionType = watch('transactionType') as IncomeExpenseType;
  const isExpense = transactionType === '지출';
  const [backupCustomIteration, setBackupCustomIteration] = useState<CustomIterationType | null>(null);

  const { isOpen, openModal, closeModal } = useModal();
  const { isOpen: isCustomOpen, openModal: openCustom, closeModal: closeCustom } = useModal();

  const { mutate: addTransaction, isPending: isAddPending } = useAddTransaction({ type: transactionType, setError });
  const { data: activeCategories, isPending: isCategoryPending } = useGetActiveCategory(
    isExpense ? 'expense' : 'income',
  );
  const { categoryOptions } = useFilteredCategories(activeCategories);
  const { hasDraftData } = useTransactionDraft();

  const onSubmit = (data: TransactionFormDataType) => {
    const isIncome = transactionType === '수입';
    const body = getFinalData(data, isIncome);

    addTransaction(body);
  };

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

  useEffect(() => {
    if (transactionDate) {
      setCalenderDate(new Date(transactionDate));
    }
  }, [transactionDate, setCalenderDate]);

  return (
    <form className="flex flex-col w-full grow justify-between py-8 px-5" onSubmit={handleSubmit(onSubmit)}>
      <IncomeExpenseButton
        type={transactionType}
        onClick={(value: IncomeExpenseType) => setValue('transactionType', value, { shouldDirty: true })}
      />
      <TransactionFields type={transactionType} options={isCategoryPending ? LOADING_OPTIONS : categoryOptions} />
      <div className={clsx(isIOSPWA && 'mb-9', 'w-full flex justify-between items-center')}>
        <RepeatCircleButton openModal={openModal} />
        <PrimaryButton
          data-testid="submit-button"
          label="저장"
          type="submit"
          disabled={!isValid || !hasDraftData}
          isPending={isAddPending}
        />
      </div>
      {isOpen && <IterationCycleModal onClose={closeModal} onClick={handleIterationTypeClick} />}
      {isCustomOpen && backupCustomIteration && (
        <CustomIterationModal
          backUpCustomIteration={backupCustomIteration}
          closeIteration={closeModal}
          closeCustom={closeCustom}
        />
      )}
    </form>
  );
};

export default AddTransactionForm;
