import useTransactionForm from '@/hooks/transaction/useTransactionForm';
import useTransactionParams from '@/hooks/transaction/useTransactionParams';
import useUpdateTransaction from '@/hooks/apis/transaction/useUpdateTransaction';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import { LOADING_OPTIONS } from '@/constants/options';
import { hasIterationChanged } from '@/utils/form/hasIterationChanged';
import { useTransactionFormLogic } from '@/hooks/transaction/useTransactionFormLogic';
import TransactionFormContent from '@/components/form/TransactionFormContent';
import { TransactionFormDataType, IncomeExpenseType } from '@/types/transactionTypes';

interface Props {
  openEdit: () => void;
  initialIterationTypeRef: React.MutableRefObject<string>;
  isIterationModifiedRef: React.MutableRefObject<boolean>;
}

const EditTransactionForm = ({ openEdit, initialIterationTypeRef, isIterationModifiedRef }: Props) => {
  const { transactionId } = useTransactionParams();

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

  const onSubmit = (data: TransactionFormDataType) => {
    const isIterationModified = hasIterationChanged(transactionFormData, data);
    isIterationModifiedRef.current = isIterationModified;

    let body = getFormData(data);

    if (initialIterationTypeRef.current !== 'none') {
      openEdit();
      return;
    }

    body = { ...body, isIterationModified };
    updateTransaction({ id: transactionId!, body });
  };

  const handleTransactionTypeChange = (value: IncomeExpenseType) => {
    setValue('transactionType', value, { shouldDirty: true });
  };

  if (isGetTransactionFetching) {
    return (
      <div className="w-full flex grow items-center justify-center">
        <LoadingSpinner size={30} />
      </div>
    );
  }

  return (
    <TransactionFormContent
      transactionType={transactionType}
      options={isCategoryPending ? LOADING_OPTIONS : options}
      isValid={isValid}
      hasDraftData={hasDraftData}
      isPending={isUpdatePending}
      isEdit={true}
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

export default EditTransactionForm;
