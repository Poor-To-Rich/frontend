import RepeatCircleButton from '@/components/button/icon/RepeatCircleButton';
import IncomeExpenseButton from '@/components/button/IncomeExpenseButton';
import PrimaryButton from '@/components/button/PrimaryButton';
import DefaultHeader from '@/components/header/DefaultHeader';
import TransactionForm from '@/pages/AddEditTransactionPage/components/TransactionForm';
import { FormProvider, useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import IterationCycleModal from '@/pages/AddEditTransactionPage/components/modals/IterationCycleModal';
import useModal from '@/hooks/useModal';
import { useLocation } from 'react-router-dom';
import DefaultModal from '@/components/modal/DefaultModal';
import { IncomeExpenseButtonType, TransactionFormDataType } from '@/types/transactionTypes';
import { CustomIterationType, IterationCycleValue } from '@/types/iterationTypes';
import { transactionSchema } from '@/schemas/transactionSchema';
import CustomIterationModal from './components/modals/custom/CustomIterationModal';
import { useCalenderDateStore } from '@/stores/useCalenderDateStore';
import { useIterationRuleDefaults } from '@/hooks/useIterationRuleDefaults';
import IterationChangeModal from '@/components/modal/IterationChangeModal';
import useAddTransaction from '@/hooks/apis/transaction/useAddTransaction';

const AddEditTransactionPage = () => {
  const [backupCustomIteration, setBackupCustomIteration] = useState<CustomIterationType | null>(null);
  const [transactionType, setTransactionType] = useState<IncomeExpenseButtonType>('지출');
  const { isOpen, openModal, closeModal } = useModal();
  const { isOpen: isDeleteModalOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();
  const { isOpen: isCustomOpen, openModal: openCustom, closeModal: closeCustom } = useModal();
  const { isOpen: isEditOpen, openModal: openEdit, closeModal: closeEdit } = useModal();
  const { setCalenderDate } = useCalenderDateStore();
  const { iterationRuleDefaults } = useIterationRuleDefaults();
  const { mutate: addTransaction, isPending } = useAddTransaction(transactionType);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageType = queryParams.get('type');
  const transactionDate = queryParams.get('date');
  const transactionId = pageType ? queryParams.get('id') : '';
  const isEditPage = pageType === 'edit';

  const methods = useForm<TransactionFormDataType>({
    defaultValues: {
      memo: '',
      date: transactionDate!,
      iterationType: 'none',
    },
    resolver: zodResolver(transactionSchema),
    mode: 'onChange',
  });

  const {
    reset,
    handleSubmit,
    setValue,
    getValues,
    formState: { isValid },
  } = methods;

  const initialIterationTypeRef = useRef(getValues('iterationType'));

  const onSubmit = (data: TransactionFormDataType) => {
    const isIncome = transactionType === '수입';
    const isCustom = data.iterationType === 'custom';

    let formData = (() => {
      const { customIteration, ...formData } = data;
      return isCustom ? data : formData;
    })();

    if (isEditPage && initialIterationTypeRef.current !== 'none') openEdit();
    else {
      if (isIncome) {
        const { paymentMethod, ...incomeData } = formData;
        addTransaction(incomeData);
      } else {
        addTransaction(formData);
      }
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

  useEffect(() => {
    if (!iterationRuleDefaults) return;
    const prevValues = getValues();

    reset({
      ...prevValues,
      customIteration: {
        iterationRule: iterationRuleDefaults,
        interval: 1,
        end: {
          type: 'never',
        },
      },
    });
  }, [iterationRuleDefaults]);

  useEffect(() => {
    if (transactionDate) setCalenderDate(new Date(transactionDate));
  }, []);

  return (
    <div className="flex flex-col w-full h-screen max-h-fit relative">
      <DefaultHeader
        label={isEditPage ? '가계부 편집' : '가계부 추가'}
        hasBackButton
        hasTrashButton={isEditPage}
        onClick={openDeleteModal}
      />
      <FormProvider {...methods}>
        <form className="flex flex-col w-full h-full justify-between py-8 px-5" onSubmit={handleSubmit(onSubmit)}>
          <IncomeExpenseButton
            type={transactionType}
            onClick={(value: IncomeExpenseButtonType) => setTransactionType(value)}
          />
          <TransactionForm type={transactionType} />
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
          {isDeleteModalOpen &&
            (initialIterationTypeRef.current === 'none' ? (
              <DefaultModal content="해당 내역을 삭제하시겠습니까?" onClose={closeDeleteModal} />
            ) : (
              <IterationChangeModal type="delete" onClose={closeDeleteModal} />
            ))}
          {isEditOpen && initialIterationTypeRef.current !== 'none' && (
            <IterationChangeModal type="edit" onClose={closeEdit} />
          )}
        </form>
      </FormProvider>
    </div>
  );
};

export default AddEditTransactionPage;
