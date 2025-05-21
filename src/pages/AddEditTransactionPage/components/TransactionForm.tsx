import IncomeExpenseButton from '@/components/button/IncomeExpenseButton';
import { IncomeExpenseType, TransactionFormDataType } from '@/types/transactionTypes';
import TransactionFields from '@/pages/AddEditTransactionPage/components/TransactionFields';
import RepeatCircleButton from '@/components/button/icon/RepeatCircleButton';
import PrimaryButton from '@/components/button/PrimaryButton';
import useTransactionForm from '@/hooks/transaction/useTransactionForm';
import useAddTransaction from '@/hooks/apis/transaction/useAddTransaction';
import { useFormContext } from 'react-hook-form';
import useTransactionParams from '@/hooks/transaction/useTransactionParams';
import { useState } from 'react';
import { CustomIterationType, IterationCycleValue } from '@/types/iterationTypes';
import IterationCycleModal from '@/pages/AddEditTransactionPage/components/modals/IterationCycleModal';
import CustomIterationModal from '@/pages/AddEditTransactionPage/components/modals/custom/CustomIterationModal';
import useModal from '@/hooks/useModal';
import useUpdateTransaction from '@/hooks/apis/transaction/useUpdateTransaction';
import { getFinalData } from '@/pages/AddEditTransactionPage/utils/filterTransactionForm';

interface Props {
  openEdit: () => void;
  initialIterationTypeRef: React.MutableRefObject<string>;
}

const TransactionForm = ({ openEdit, initialIterationTypeRef }: Props) => {
  const {
    handleSubmit,
    setValue,
    getValues,
    setError,
    formState: { isValid },
  } = useFormContext<TransactionFormDataType>();
  const { isEditPage, transactionId, transactionMode } = useTransactionParams();
  const [transactionType, setTransactionType] = useState<IncomeExpenseType>(
    (transactionMode as IncomeExpenseType) || '지출',
  );
  const [backupCustomIteration, setBackupCustomIteration] = useState<CustomIterationType | null>(null);

  const { isOpen, openModal, closeModal } = useModal();
  const { isOpen: isCustomOpen, openModal: openCustom, closeModal: closeCustom } = useModal();

  const { mutate: addTransaction, isPending: isAddPending } = useAddTransaction({ type: transactionType, setError });
  const { mutate: updateTransaction, isPending: isUpdatePending } = useUpdateTransaction({
    type: transactionType,
    setError,
  });
  const { categoryOptions: options, isFetching } = useTransactionForm({ transactionType, initialIterationTypeRef });

  const onSubmit = (data: TransactionFormDataType) => {
    const isIncome = transactionType === '수입';

    const body = getFinalData(data, isIncome);

    if (isEditPage) {
      if (initialIterationTypeRef.current !== 'none') {
        openEdit();
        return;
      }

      updateTransaction({ id: transactionId!, body });
    } else {
      addTransaction(body);
    }
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

  if (isFetching) {
    return <div>로딩중</div>;
  }

  return (
    <form className="flex flex-col w-full h-full justify-between py-8 px-5" onSubmit={handleSubmit(onSubmit)}>
      <IncomeExpenseButton type={transactionType} onClick={(value: IncomeExpenseType) => setTransactionType(value)} />
      <TransactionFields type={transactionType} options={options} />
      <div className="w-full flex justify-between items-center">
        <RepeatCircleButton openModal={openModal} />
        <PrimaryButton
          data-testid="submit-button"
          label="저장"
          type="submit"
          disabled={!isValid}
          isPending={isAddPending || isUpdatePending}
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

export default TransactionForm;
