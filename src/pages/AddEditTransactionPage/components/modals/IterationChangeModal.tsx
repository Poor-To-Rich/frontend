import ModalDimmed from '@/components/modal/ModalDimmed';
import ModalButton from '@/components/button/ModalButton';
import useUpdateTransaction from '@/hooks/apis/transaction/useUpdateTransaction';
import { IncomeExpenseButtonType, IterationActionEnumType, TransactionFormDataType } from '@/types/transactionTypes';
import { useFormContext } from 'react-hook-form';
import useTransactionParams from '@/hooks/transaction/useTransactionParams';
import { getFinalData } from '@/pages/AddEditTransactionPage/utils/filterTransactionForm';
import useDeleteTransaction from '@/hooks/apis/transaction/useDeleteTransaction';

interface Props {
  type: 'delete' | 'edit';
  onClose: () => void;
}

const IterationChangeModal = ({ type, onClose }: Props) => {
  const { handleSubmit } = useFormContext<TransactionFormDataType>();
  const { transactionId, transactionMode } = useTransactionParams();
  const { mutate: updateTransaction, isPending: isUpdatePending } = useUpdateTransaction(
    transactionMode as IncomeExpenseButtonType,
  );
  const { mutate: deleteTransaction, isPending: isDeletePending } = useDeleteTransaction(
    transactionMode as IncomeExpenseButtonType,
  );
  const isEditType = type === 'edit';

  const options = {
    content: isEditType ? '해당 가계부를 편집하시겠습니까?' : '해당 가계부를 삭제하시겠습니까?',
    buttons: [
      {
        label: '이 반복 내역에만 적용',
        value: 'THIS_ONLY',
      },
      {
        label: '이후 반복 내역에도 적용',
        value: 'THIS_AND_FUTURE',
      },
      {
        label: '모든 반복 내역에 적용',
        value: 'ALL',
      },
    ],
  };

  const onSubmit = (data: TransactionFormDataType, iterationAction: IterationActionEnumType) => {
    const isIncome = transactionMode === '수입';
    const body = isEditType ? getFinalData(data, isIncome) : {};
    const requestData = { id: transactionId!, body: { ...body, iterationAction } };

    if (isUpdatePending || isDeletePending) return;

    if (isEditType) {
      updateTransaction(requestData as { id: string; body: TransactionFormDataType });
    } else {
      deleteTransaction(requestData);
    }
  };

  return (
    <ModalDimmed onClose={onClose}>
      <div className="w-[63%]  flex flex-col justify-evenly rounded-lg bg-white" onClick={e => e.stopPropagation()}>
        <span className="text-center py-8 text-md">{options.content}</span>
        <div className="flex flex-col items-center justify-center gap-6 pb-8">
          {options.buttons.map(({ label, value }) => (
            <ModalButton
              label={label}
              key={label}
              onClick={handleSubmit(data => onSubmit(data, value as IterationActionEnumType))}
            />
          ))}
        </div>
      </div>
    </ModalDimmed>
  );
};

export default IterationChangeModal;
