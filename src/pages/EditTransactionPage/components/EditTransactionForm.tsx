import IncomeExpenseButton from '@/components/button/IncomeExpenseButton';
import { IncomeExpenseType, TransactionFormDataType } from '@/types/transactionTypes';
import RepeatCircleButton from '@/components/button/icon/RepeatCircleButton';
import PrimaryButton from '@/components/button/PrimaryButton';
import useTransactionForm from '@/hooks/transaction/useTransactionForm';
import { useFormContext } from 'react-hook-form';
import useTransactionParams from '@/hooks/transaction/useTransactionParams';
import { useState } from 'react';
import { CustomIterationType, IterationCycleValue } from '@/types/iterationTypes';
import CustomIterationModal from '@/components/modal/custom/CustomIterationModal';
import useModal from '@/hooks/useModal';
import useUpdateTransaction from '@/hooks/apis/transaction/useUpdateTransaction';
import { getFinalData } from '@/utils/form/filterTransactionForm';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import { LOADING_OPTIONS } from '@/constants/options';
import useTransactionDraft from '@/hooks/transaction/useTransactionDraft';
import { hasIterationChanged } from '@/utils/form/hasIterationChanged';
import TransactionFields from '@/components/input/transaction/TransactionFields';
import IterationCycleModal from '@/components/modal/IterationCycleModal';
import clsx from 'clsx';
import { isIOSPWA } from '@/utils/deviceUtils';

interface Props {
  openEdit: () => void;
  initialIterationTypeRef: React.MutableRefObject<string>;
  isIterationModifiedRef: React.MutableRefObject<boolean>;
}

const EditTransactionForm = ({ openEdit, initialIterationTypeRef, isIterationModifiedRef }: Props) => {
  const {
    handleSubmit,
    setValue,
    getValues,
    setError,
    watch,
    formState: { isValid },
  } = useFormContext<TransactionFormDataType>();
  const { transactionId } = useTransactionParams();
  const transactionType = watch('transactionType') as IncomeExpenseType;
  const [backupCustomIteration, setBackupCustomIteration] = useState<CustomIterationType | null>(null);

  const { isOpen, openModal, closeModal } = useModal();
  const { isOpen: isCustomOpen, openModal: openCustom, closeModal: closeCustom } = useModal();

  const { mutate: updateTransaction, isPending: isUpdatePending } = useUpdateTransaction({
    type: transactionType,
    setError,
  });
  const {
    transactionFormData,
    categoryOptions: options,
    isGetTransactionFetching,
    isCategoryPending,
  } = useTransactionForm({
    transactionType,
    initialIterationTypeRef,
  });
  const { hasDraftData } = useTransactionDraft();

  const onSubmit = (data: TransactionFormDataType) => {
    const isIncome = transactionType === '수입';
    const isIterationModified = hasIterationChanged(transactionFormData, data);
    isIterationModifiedRef.current = isIterationModified;

    let body = getFinalData(data, isIncome);

    if (initialIterationTypeRef.current !== 'none') {
      openEdit();
      return;
    }

    body = { ...body, isIterationModified };

    updateTransaction({ id: transactionId!, body });
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

  if (isGetTransactionFetching) {
    return (
      <div className="w-full flex grow items-center justify-center">
        <LoadingSpinner size={30} />
      </div>
    );
  }

  return (
    <form className="flex flex-col w-full grow justify-between py-8 px-5" onSubmit={handleSubmit(onSubmit)}>
      <IncomeExpenseButton
        type={transactionType}
        onClick={(value: IncomeExpenseType) => setValue('transactionType', value, { shouldDirty: true })}
        isEdit
      />
      <TransactionFields type={transactionType} options={isCategoryPending ? LOADING_OPTIONS : options} />
      <div className={clsx(isIOSPWA && 'mb-9', 'w-full flex justify-between items-center')}>
        <RepeatCircleButton openModal={openModal} />
        <PrimaryButton
          data-testid="submit-button"
          label="저장"
          type="submit"
          disabled={!isValid || !hasDraftData}
          isPending={isUpdatePending}
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

export default EditTransactionForm;
