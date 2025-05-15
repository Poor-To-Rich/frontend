import PrimaryInput from '@/components/input/PrimaryInput';
import SelectBox from '@/components/input/SelectBox';
import { EXPENSE_CATEGORIES, EXPENSE_METHODS, INCOME_CATEGORIES } from '@/constants/options';
import MemoInput from '@/pages/AddEditTransactionPage/components/MemoInput';
import { useCalenderDateStore } from '@/stores/useCalenderDateStore';
import { useHeaderDateStore } from '@/stores/useHeaderDateStore';
import { IncomeExpenseType, TransactionFormDataType } from '@/types/transactionTypes';
import { getKoreanDay, getKoreanWeekOfMonth } from '@/utils/date';
import { formatNumber } from '@/utils/number';
import { addMonths, format, getDate } from 'date-fns';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import CategorySelectBox from './CategorySelectBox';

interface Props {
  type: IncomeExpenseType;
}

const TransactionFields = ({ type }: Props) => {
  const isExpense = type === '지출';
  const { setMainHeaderDate } = useHeaderDateStore();
  const { setCalenderDate } = useCalenderDateStore();
  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = useFormContext<TransactionFormDataType>();

  const handleCostChange = (value: string, onChange: (value: number | string) => void) => {
    const formattedValue = value.replace(/[^\d]/g, '');
    onChange(Number(formattedValue));
  };

  useEffect(() => {
    setValue('categoryName', isExpense ? EXPENSE_CATEGORIES[0].value : INCOME_CATEGORIES[0].value);
  }, [type]);

  return (
    <div className="flex flex-col flex-grow min-h-0 mt-7 gap-3.5">
      <PrimaryInput
        label="날짜"
        data-testid="date-input"
        isRequired
        type="date"
        errorMessage={errors.date?.message}
        {...register('date')}
        onChange={e => {
          const currentDate = new Date(e.target.value);
          const koreanDay = getKoreanDay(currentDate);

          register('date').onChange(e);

          setCalenderDate(currentDate);
          setMainHeaderDate(currentDate);
          setValue('customIteration.end.date', format(addMonths(currentDate, 2), 'yyyy-MM-dd'));
          setValue('customIteration.iterationRule.daysOfWeek', [koreanDay]);
          setValue('customIteration.iterationRule.monthlyOption.day', getDate(currentDate));
          setValue('customIteration.iterationRule.monthlyOption.week', getKoreanWeekOfMonth(currentDate));
          setValue('customIteration.iterationRule.monthlyOption.dayOfWeek', koreanDay);
        }}
      />
      <CategorySelectBox isExpense={isExpense} type={type} />
      <PrimaryInput
        label={`${type}명`}
        data-testid={`${isExpense ? 'expense' : 'income'}-title-input`}
        type="text"
        errorMessage={errors.title?.message}
        maxLength={15}
        {...register('title')}
      />
      <Controller
        name="cost"
        control={control}
        render={({ field }) => (
          <PrimaryInput
            data-testid="cost-input"
            label="금액"
            isRequired
            type="tel"
            inputMode="numeric"
            value={formatNumber(field.value === 0 ? '' : field.value)}
            onChange={e => {
              handleCostChange(e.target.value, field.onChange);
            }}
            errorMessage={errors.cost?.message}
          />
        )}
      />
      {isExpense && (
        <SelectBox
          data-testid="expense-method-select"
          label="지출 수단"
          isRequired
          options={EXPENSE_METHODS}
          {...register('paymentMethod')}
        />
      )}
      <Controller
        name="memo"
        render={({ field }) => (
          <MemoInput data-testid="memo-input" maxLength={100} errorMessage={errors.memo?.message} {...field} />
        )}
      />
    </div>
  );
};

export default TransactionFields;
