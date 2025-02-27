import RepeatCircleButton from '@/components/button/icon/RepeatCircleButton';
import IncomeExpenseButton from '@/components/button/IncomeExpenseButton';
import PrimaryButton from '@/components/button/PrimaryButton';
import DefaultHeader from '@/components/header/DefaultHeader';
import TransactionForm from '@/pages/AddEditTransactionPage/components/TransactionForm';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { IncomeExpenseButtonType, TransactionFormData } from '@/types/types';
import { baseSchema } from '@/schemas/transactionSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { EXPENSE_CATEGORIES, EXPENSE_METHODS, INCOME_CATEGORIES } from '@/constants/options';

const AddEditTransactionPage = () => {
  const [type, setType] = useState<IncomeExpenseButtonType>('지출');
  const [costValue, setCostValue] = useState<string>('');

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
    },
    resolver: zodResolver(baseSchema),
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

  useEffect(() => {
    setValue('name', type === '지출' ? EXPENSE_CATEGORIES[0].value : INCOME_CATEGORIES[0].value);
  }, [type]);

  return (
    <div className="flex flex-col w-full h-screen">
      <DefaultHeader label="가계부 추가" hasBackButton />
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
          <RepeatCircleButton />
          <PrimaryButton label="저장" type="submit" disabled={!isValid} />
        </div>
      </form>
    </div>
  );
};

export default AddEditTransactionPage;
