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
import { CustomIterationEndsType, IterationCycleValue } from '@/types/iterationTypes';
import { transactionSchema } from '@/schemas/transactionSchema';
import CustomIterationModal from './components/modals/custom/CustomIterationModal';
import { useCalenderDateStore } from '@/stores/useCalenderDateStore';
import { getKoreanDay } from '@/utils/date';

const AddEditTransactionPage = () => {
  const [backupCustomIteration, setBackupCustomIteration] = useState<CustomIterationEndsType | null>(null);
  const [type, setType] = useState<IncomeExpenseButtonType>('지출');
  const [costValue, setCostValue] = useState<string>('');
  const { isOpen, openModal, closeModal } = useModal();
  const { isOpen: isDeleteModalOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();
  const { isOpen: isCustomOpen, openModal: openCustom, closeModal: closeCustom } = useModal();
  const { calenderDate, setCalenderDate } = useCalenderDateStore();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageType = queryParams.get('type');
  const transactionDate = queryParams.get('date');
  const transactionId = pageType ? queryParams.get('id') : '';
  const isEditPage = pageType === 'edit';

  const methods = useForm<TransactionFormData>({
    defaultValues: {
      memo: '',
      date: transactionDate!,
      iterationType: 'none',
      customIteration: {
        iterationRule: {
          type: 'weekly',
          daysOfWeek: [getKoreanDay(calenderDate)],
        },
        interval: 1,
        ends: {
          type: 'never',
        },
      },
    },
    resolver: zodResolver(transactionSchema),
    mode: 'onChange',
  });

  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { isValid },
  } = methods;

  const onSubmit = (data: TransactionFormData) => {
    const isIncome = type === '수입';
    const isCustom = data.iterationType === 'custom';
    let formData = (() => {
      const { customIteration, ...formData } = data;
      return isCustom ? data : formData;
    })();

    if (isIncome) {
      const { paymentMethod, ...incomeData } = formData;
      console.log(incomeData);
    } else {
      console.log(formData);
    }
  };

  const handleTypeChange = (value: IncomeExpenseButtonType) => {
    setType(value);
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
    setValue('categoryName', type === '지출' ? EXPENSE_CATEGORIES[0].value : INCOME_CATEGORIES[0].value);
  }, [type]);

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
          <IncomeExpenseButton type={type} onClick={handleTypeChange} />
          <TransactionForm type={type} costValue={costValue} setCostValue={setCostValue} />
          <div className="w-full flex justify-between items-center">
            <RepeatCircleButton openModal={openModal} />
            <PrimaryButton label="저장" type="submit" disabled={!isValid} />
          </div>
          {isOpen && <IterationCycleModal onClose={closeModal} onClick={handleRepeatCircleClick} />}
          {isCustomOpen && backupCustomIteration && (
            <CustomIterationModal
              backUpCustomIteration={backupCustomIteration}
              closeIteration={closeModal}
              closeCustom={closeCustom}
            />
          )}
          {isDeleteModalOpen && <DefaultModal content="해당 내역을 삭제하시겠습니까?" onClose={closeDeleteModal} />}
        </form>
      </FormProvider>
    </div>
  );
};

export default AddEditTransactionPage;
