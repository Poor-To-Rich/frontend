import DefaultHeader from '@/components/header/DefaultHeader';
import { FormProvider, useForm } from 'react-hook-form';
import useModal from '@/hooks/useModal';
import TransactionForm from '@/pages/EditTransactionPage/components/TransactionForm';
import { IncomeExpenseType, TransactionFormDataType } from '@/types/transactionTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { transactionSchema } from '@/schemas/transactionSchema';
import useTransactionParams from '@/hooks/transaction/useTransactionParams';
import IterationChangeModal from '@/pages/EditTransactionPage/components/modals/IterationChangeModal';
import DefaultModal from '@/components/modal/DefaultModal';
import { useRef } from 'react';
import useDeleteTransaction from '@/hooks/apis/transaction/useDeleteTransaction';
import { useCalenderDateStore } from '@/stores/useCalenderDateStore';
import PageErrorBoundary from '@/components/error/PageErrorBoundary';
import FetchErrorBoundary from '@/components/error/FetchErrorBoundary';

const EditTransactionPage = () => {
  const { setCalenderDate } = useCalenderDateStore();
  const { transactionId, transactionDate, transactionMode } = useTransactionParams();
  const { isOpen: isDeleteModalOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();
  const { isOpen: isEditOpen, openModal: openEdit, closeModal: closeEdit } = useModal();
  const { mutate: deleteTransaction, isPending } = useDeleteTransaction(transactionMode! as IncomeExpenseType);

  const methods = useForm<TransactionFormDataType>({
    defaultValues: {
      cost: 0,
      memo: '',
      date: transactionDate!,
      transactionType: (transactionMode as IncomeExpenseType) || '지출',
      iterationType: 'none',
    },
    resolver: zodResolver(transactionSchema),
    shouldUnregister: false,
    mode: 'onChange',
  });

  const isIterationModifiedRef = useRef<boolean>(false);
  const initialIterationTypeRef = useRef(methods.getValues('iterationType'));
  const dateRef = useRef(methods.getValues('date'));

  const handleDelete = () => {
    deleteTransaction({ id: transactionId!, body: {} });
  };

  const resetCalenderDate = () => {
    setCalenderDate(new Date(dateRef.current));
  };

  return (
    <div className="flex flex-col w-full min-h-screen max-h-fit relative">
      <DefaultHeader
        label={'가계부 편집'}
        hasBackButton
        hasTrashButton
        onClick={openDeleteModal}
        resetCalenderDate={resetCalenderDate}
      />
      <PageErrorBoundary>
        <FetchErrorBoundary>
          <FormProvider {...methods}>
            <TransactionForm
              openEdit={openEdit}
              initialIterationTypeRef={initialIterationTypeRef}
              isIterationModifiedRef={isIterationModifiedRef}
            />
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
              <IterationChangeModal type="edit" onClose={closeEdit} isIterationModifiedRef={isIterationModifiedRef} />
            )}
          </FormProvider>
        </FetchErrorBoundary>
      </PageErrorBoundary>
    </div>
  );
};

export default EditTransactionPage;
