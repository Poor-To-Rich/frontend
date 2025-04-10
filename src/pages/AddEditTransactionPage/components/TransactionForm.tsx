import PrimaryInput from '@/components/input/PrimaryInput';
import SelectBox from '@/components/input/SelectBox';
import { EXPENSE_CATEGORIES, EXPENSE_METHODS, INCOME_CATEGORIES } from '@/constants/options';
import MemoInput from '@/pages/AddEditTransactionPage/components/MemoInput';
import { IncomeExpenseButtonType } from '@/types/transactionTypes';
import { formatNumber } from '@/utils/number';
import { Controller, useFormContext } from 'react-hook-form';

interface Props {
  type: IncomeExpenseButtonType;
  costValue: string;
  setCostValue: React.Dispatch<React.SetStateAction<string>>;
}

const TransactionForm = ({ type, costValue, setCostValue }: Props) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const handleCostChange = (value: string, onChange: (value: number | string) => void) => {
    const formattedValue = value.replace(/[^\d]/g, '');
    setCostValue(formatNumber(formattedValue));
    onChange(Number(formattedValue));
  };

  return (
    <div className="flex flex-col flex-grow min-h-0 mt-7 gap-3.5">
      <PrimaryInput label="날짜" isRequired type="date" message={errors.date?.message} {...register('date')} />
      <SelectBox
        label="카테고리"
        isRequired
        options={type === '지출' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES}
        type={type}
        hasEditButton
        {...register('categoryName')}
      />
      <PrimaryInput label={`${type}명`} type="text" message={errors.title?.message} {...register('title')} />
      <Controller
        name="cost"
        control={control}
        render={({ field }) => (
          <PrimaryInput
            label="금액"
            isRequired
            type="tel"
            inputMode="numeric"
            value={formatNumber(costValue)}
            onChange={e => {
              handleCostChange(e.target.value, field.onChange);
            }}
            message={errors.cost?.message}
          />
        )}
      />
      {type === '지출' && (
        <SelectBox label="지출 수단" isRequired options={EXPENSE_METHODS} {...register('paymentMethod')} />
      )}
      <Controller name="memo" render={({ field }) => <MemoInput {...field} />} />
    </div>
  );
};

export default TransactionForm;
