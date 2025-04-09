import RepeatCircleButton from '@/components/button/icon/RepeatCircleButton';
import IncomeExpenseButton from '@/components/button/IncomeExpenseButton';
import PrimaryButton from '@/components/button/PrimaryButton';
import DefaultHeader from '@/components/header/DefaultHeader';
import TransactionForm from '@/pages/AddEditTransactionPage/components/TransactionForm';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { EXPENSE_CATEGORIES, EXPENSE_METHODS, INCOME_CATEGORIES } from '@/constants/options';
import IterationCycleModal from '@/components/modal/IterationCycleModal';
import useModal from '@/hooks/useModal';
import { useLocation } from 'react-router-dom';
import DefaultModal from '@/components/modal/DefaultModal';
import { IncomeExpenseButtonType, TransactionFormData } from '@/types/transactionTypes';
import { IterationCycleValue } from '@/types/iterationTypes';
import { transactionSchema } from '@/schemas/transactionSchema';

const AddEditTransactionPage = () => {
  const [type, setType] = useState<IncomeExpenseButtonType>('지출');
  const [iterationType, setIterationType] = useState<IterationCycleValue>('none');
  const { isOpen, openModal, closeModal } = useModal();
  const { isOpen: isDeleteModalOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();
  const [costValue, setCostValue] = useState<string>('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageType = queryParams.get('type');
  const transactionId = pageType ? queryParams.get('id') : '';
  const isEditPage = pageType === 'edit';

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<TransactionFormData>({
    defaultValues: {
      date: format(new Date(), 'yyyy-MM-dd'), // 수정 필요
      name: EXPENSE_CATEGORIES[0].value,
      title: '',
      cost: 0,
      expenseMethod: EXPENSE_METHODS[0].value,
      memo: '',
      iterationType: 'none',
      customIteration: {
        type: 'daily',
        interval: 1,
        ends: {
          type: 'never',
        },
      },
    },
    resolver: zodResolver(transactionSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: TransactionFormData) => {
    if (type === '수입') {
      const { expenseMethod, ...incomeData } = data;
      console.log(incomeData);
    } else {
      console.log(data);
    }
  };

  const handleTypeChange = (value: IncomeExpenseButtonType) => {
    const { date: currentDate } = getValues();
    setType(value);
    setCostValue('');
    reset();
    setValue('date', currentDate);
  };

  const handleRepeatCircleClick = (value: IterationCycleValue) => {
    setIterationType(value);
    setValue('iterationType', value);
    if (value !== 'custom') closeModal();
  };

  useEffect(() => {
    setValue('name', type === '지출' ? EXPENSE_CATEGORIES[0].value : INCOME_CATEGORIES[0].value);
  }, [type]);

  return (
    <div className="flex flex-col w-full h-screen max-h-fit relative">
      <DefaultHeader
        label={isEditPage ? '가계부 편집' : '가계부 추가'}
        hasBackButton
        hasTrashButton={isEditPage}
        onClick={openDeleteModal}
      />
      <form className="flex flex-col w-full h-full justify-between py-8 px-5" onSubmit={handleSubmit(onSubmit)}>
        <IncomeExpenseButton type={type} onClick={handleTypeChange} />
        <TransactionForm
          costValue={costValue}
          setCostValue={setCostValue}
          type={type}
          control={control}
          errors={errors}
        />
        <div className="w-full flex justify-between items-center">
          <RepeatCircleButton openModal={openModal} />
          <PrimaryButton label="저장" type="submit" disabled={!isValid} />
        </div>
        {isOpen && (
          <IterationCycleModal iterationType={iterationType} onClose={closeModal} onClick={handleRepeatCircleClick} />
        )}
        {isDeleteModalOpen && <DefaultModal content="해당 내역을 삭제하시겠습니까?" onClose={closeDeleteModal} />}
      </form>
    </div>
  );
};

export default AddEditTransactionPage;
