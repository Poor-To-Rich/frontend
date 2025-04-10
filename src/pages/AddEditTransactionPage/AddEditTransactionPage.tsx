import RepeatCircleButton from '@/components/button/icon/RepeatCircleButton';
import IncomeExpenseButton from '@/components/button/IncomeExpenseButton';
import PrimaryButton from '@/components/button/PrimaryButton';
import DefaultHeader from '@/components/header/DefaultHeader';
import TransactionForm from '@/pages/AddEditTransactionPage/components/TransactionForm';
import { FormProvider, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '@/constants/options';
import IterationCycleModal from '@/pages/AddEditTransactionPage/components/modals/IterationCycleModal';
import useModal from '@/hooks/useModal';
import { useLocation } from 'react-router-dom';
import DefaultModal from '@/components/modal/DefaultModal';
import { IncomeExpenseButtonType, TransactionFormData } from '@/types/transactionTypes';
import { IterationCycleValue } from '@/types/iterationTypes';
import { transactionSchema } from '@/schemas/transactionSchema';

const AddEditTransactionPage = () => {
  const [type, setType] = useState<IncomeExpenseButtonType>('지출');
  const [costValue, setCostValue] = useState<string>('');
  const { isOpen, openModal, closeModal } = useModal();
  const { isOpen: isDeleteModalOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageType = queryParams.get('type');
  const transactionId = pageType ? queryParams.get('id') : '';
  const isEditPage = pageType === 'edit';

  const methods = useForm<TransactionFormData>({
    defaultValues: {
      memo: '',
      iterationType: 'custom',
      customIteration: {
        type: 'daily',
        interval: 2,
        daysOfWeek: ['월', '수', '금'],
        ends: {
          type: 'after',
          count: 20,
        },
      },
    },
    resolver: zodResolver(transactionSchema),
    mode: 'onChange',
  });

  const {
    handleSubmit,
    setValue,
    formState: { isValid, errors },
  } = methods;

  console.log(errors);

  const onSubmit = (data: TransactionFormData) => {
    if (type === '수입') {
      const { paymentMethod, ...incomeData } = data;
      console.log(incomeData);
    } else {
      console.log(data);
    }
  };

  const handleTypeChange = (value: IncomeExpenseButtonType) => {
    setType(value);
  };

  const handleRepeatCircleClick = (value: IterationCycleValue) => {
    setValue('iterationType', value);
    if (value !== 'custom') closeModal();
  };

  useEffect(() => {
    setValue('categoryName', type === '지출' ? EXPENSE_CATEGORIES[0].value : INCOME_CATEGORIES[0].value);
  }, [type]);

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
          <IncomeExpenseButton type={type} onClick={handleTypeChange} />
          <TransactionForm type={type} costValue={costValue} setCostValue={setCostValue} />
          <div className="w-full flex justify-between items-center">
            <RepeatCircleButton openModal={openModal} />
            <PrimaryButton label="저장" type="submit" disabled={!isValid} />
          </div>
          {isOpen && <IterationCycleModal onClose={closeModal} onClick={handleRepeatCircleClick} />}
          {isDeleteModalOpen && <DefaultModal content="해당 내역을 삭제하시겠습니까?" onClose={closeDeleteModal} />}
        </form>
      </FormProvider>
    </div>
  );
};

export default AddEditTransactionPage;
