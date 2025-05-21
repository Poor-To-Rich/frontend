import DefaultHeader from '@/components/header/DefaultHeader';
import { FormProvider, useForm } from 'react-hook-form';
import useModal from '@/hooks/useModal';
import TransactionForm from '@/pages/AddEditTransactionPage/components/TransactionForm';
import { IncomeExpenseType, TransactionFormDataType } from '@/types/transactionTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { transactionSchema } from '@/schemas/transactionSchema';
import useTransactionParams from '@/hooks/transaction/useTransactionParams';
import IterationChangeModal from '@/pages/AddEditTransactionPage/components/modals/IterationChangeModal';
import DefaultModal from '@/components/modal/DefaultModal';
import { useRef } from 'react';
import useDeleteTransaction from '@/hooks/apis/transaction/useDeleteTransaction';

const AddEditTransactionPage = () => {
  const { transactionId, transactionDate, transactionMode, isEditPage } = useTransactionParams();
  const { isOpen: isDeleteModalOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();
  const { isOpen: isEditOpen, openModal: openEdit, closeModal: closeEdit } = useModal();
  const { mutate: deleteTransaction, isPending } = useDeleteTransaction(transactionMode! as IncomeExpenseType);

  const methods = useForm<TransactionFormDataType>({
    defaultValues: {
      cost: 0,
      memo: '',
      date: transactionDate!,
      iterationType: 'none',
    },
    resolver: zodResolver(transactionSchema),
    mode: 'onChange',
  });

  const initialIterationTypeRef = useRef(methods.getValues('iterationType'));

  const handleDelete = () => {
    deleteTransaction({ id: transactionId! });
  };

  return (
    <div className="flex flex-col w-full h-screen max-h-fit relative">
      <DefaultHeader
        label={isEditPage ? '가계부 편집' : '가계부 추가'}
        hasBackButton
        hasTrashButton={isEditPage}
        onClick={openDeleteModal}
      />
      <FormProvider {...methods}>
        <TransactionForm openEdit={openEdit} initialIterationTypeRef={initialIterationTypeRef} />
        {isDeleteModalOpen &&
          (initialIterationTypeRef.current === 'none' ? (
            <DefaultModal
              data-testid="delete-confirm-modal"
              content="해당 내역을 삭제하시겠습니까?"
              isPending={isPending}
              onClose={closeDeleteModal}
              onClick={methods.handleSubmit(handleDelete)}
            />
          ) : (
            <IterationChangeModal type="delete" onClose={closeDeleteModal} />
          ))}
        {isEditOpen && initialIterationTypeRef.current !== 'none' && (
          <IterationChangeModal type="edit" onClose={closeEdit} />
        )}
      </FormProvider>
    </div>
  );
};

export default AddEditTransactionPage;
