import ModalDimmed from '@/components/modal/ModalDimmed';
import ModalButton from '@/components/button/modal/ModalButton';
import useUpdateTransaction from '@/hooks/apis/transaction/useUpdateTransaction';
import { IncomeExpenseType, IterationActionEnumType, TransactionFormDataType } from '@/types/transactionTypes';
import { useFormContext } from 'react-hook-form';
import useTransactionParams from '@/hooks/transaction/useTransactionParams';
import { getFinalData } from '@/utils/form/filterTransactionForm';
import useDeleteTransaction from '@/hooks/apis/transaction/useDeleteTransaction';
import { useRef } from 'react';
import { getUpdateOptions } from '@/utils/form/getUpdateOptions';

interface Props {
  type: 'delete' | 'edit';
  onClose: () => void;
  isIterationModifiedRef?: React.MutableRefObject<boolean>;
}

const IterationChangeModal = ({ type, onClose, isIterationModifiedRef }: Props) => {
  const {
    handleSubmit,
    setError,
    formState: { dirtyFields },
  } = useFormContext<TransactionFormDataType>();
  const optionRef = useRef<IterationActionEnumType>();
  const isEditType = type === 'edit';
  const isChanged = Object.keys(dirtyFields).length > 0;

  const { transactionId, transactionMode } = useTransactionParams();
  const { content, options } = getUpdateOptions({
    isEditType,
    isIterationModified: Boolean(isIterationModifiedRef?.current),
  });

  const { mutate: updateTransaction, isPending: isUpdatePending } = useUpdateTransaction({
    type: transactionMode as IncomeExpenseType,
    setError: setError,
  });
  const { mutate: deleteTransaction, isPending: isDeletePending } = useDeleteTransaction(
    transactionMode as IncomeExpenseType,
  );

  const onSubmit = (data: TransactionFormDataType, iterationAction: IterationActionEnumType) => {
    optionRef.current = iterationAction;
    const isIncome = transactionMode === '수입';
    const isIterationModified = isIterationModifiedRef?.current;

    if (isEditType) {
      const editBody = getFinalData({ ...data, isIterationModified, iterationAction }, isIncome);

      updateTransaction({
        id: transactionId!,
        body: editBody,
      });
    } else {
      const deleteBody = {
        iterationAction,
      };

      deleteTransaction({
        id: transactionId!,
        body: deleteBody,
      });
    }
  };

  return (
    <ModalDimmed onClose={onClose}>
      <div
        data-testid="iteration-change-modal"
        className="w-[63%]  flex flex-col justify-evenly rounded-lg bg-white"
        onClick={e => e.stopPropagation()}>
        <span className="text-center py-8 text-md">{content}</span>
        <div className="flex flex-col items-center justify-center gap-6 pb-8">
          {options.map(({ label, value }) => (
            <ModalButton
              label={label}
              key={label}
              disabled={isUpdatePending || isDeletePending || (isEditType && !isChanged)}
              isPending={optionRef.current === value && (isUpdatePending || isDeletePending)}
              onClick={() => {
                const iterationAction = value as IterationActionEnumType;
                handleSubmit(data => onSubmit(data, iterationAction))();
              }}
            />
          ))}
        </div>
      </div>
    </ModalDimmed>
  );
};

export default IterationChangeModal;
