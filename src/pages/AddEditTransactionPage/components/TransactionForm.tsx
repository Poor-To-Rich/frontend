import IncomeExpenseButton from '@/components/button/IncomeExpenseButton';
import { IncomeExpenseButtonType, TransactionFormDataType } from '@/types/transactionTypes';
import TransactionInputs from './TransactionInputs';
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
import { useTransactionTypeStore } from '@/stores/transaction/useTransactionTypeStore';
import { getFinalData } from '@/pages/AddEditTransactionPage/utils/filterFormData';

interface Props {
  openEdit: () => void;
  initialIterationTypeRef: React.MutableRefObject<string>;
}

const TransactionForm = ({ openEdit, initialIterationTypeRef }: Props) => {
  const { isEditPage, transactionId } = useTransactionParams();
  const { transactionType, setTransactionType } = useTransactionTypeStore();
  const [backupCustomIteration, setBackupCustomIteration] = useState<CustomIterationType | null>(null);

  const { isOpen, openModal, closeModal } = useModal();
  const { isOpen: isCustomOpen, openModal: openCustom, closeModal: closeCustom } = useModal();

  const { mutate: addTransaction, isPending } = useAddTransaction(transactionType);
  const { mutate: updateTransaction } = useUpdateTransaction(transactionType);
  useTransactionForm({ transactionType, initialIterationTypeRef });

  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { isValid },
  } = useFormContext<TransactionFormDataType>();

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

  const handleRepeatCircleClick = (value: IterationCycleValue) => {
    if (value !== 'custom') {
      setValue('iterationType', value);
      closeModal();
    } else {
      const current = JSON.parse(JSON.stringify(getValues('customIteration')));
      setBackupCustomIteration(current);
      openCustom();
    }
  };

  return (
    <form className="flex flex-col w-full h-full justify-between py-8 px-5" onSubmit={handleSubmit(onSubmit)}>
      <IncomeExpenseButton
        type={transactionType}
        onClick={(value: IncomeExpenseButtonType) => setTransactionType(value)}
      />
      <TransactionInputs type={transactionType} />
      <div className="w-full flex justify-between items-center">
        <RepeatCircleButton openModal={openModal} />
        <PrimaryButton label="저장" type="submit" disabled={!isValid} isPending={isPending} />
      </div>
      {isOpen && <IterationCycleModal onClose={closeModal} onClick={handleRepeatCircleClick} />}
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
