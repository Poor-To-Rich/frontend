import PrimaryInput from '@/components/input/PrimaryInput';
import SelectBox from '@/components/input/SelectBox';
import { EXPENSE_CATEGORIES, EXPENSE_METHODS, INCOME_CATEGORIES } from '@/constants/options';
import MemoInput from '@/pages/AddEditTransactionPage/components/MemoInput';
import { IncomeExpenseButtonType, TransactionFormData } from '@/types/types';
import { formatNumber } from '@/utils/number';
import { Control, Controller, FieldErrors } from 'react-hook-form';

interface Props {
  costValue: string;
  setCostValue: React.Dispatch<React.SetStateAction<string>>;
  type: IncomeExpenseButtonType;
  errors: FieldErrors<TransactionFormData>;
  control: Control<TransactionFormData, any>;
}

const TransactionForm = ({ costValue, setCostValue, type, errors, control }: Props) => {
  const handleCostChange = (value: string, onChange: (val: number) => void) => {
    const formattedValue = value.replace(/[^\d]/g, '');
    setCostValue(formatNumber(formattedValue));
    onChange(Number(formattedValue));
  };

  return (
    <div className="flex flex-col flex-grow min-h-0 mt-7 gap-3.5">
      <Controller
        name="date"
        control={control}
        render={({ field }) => <PrimaryInput {...field} label="날짜" isRequired type="date" />}
      />
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <SelectBox
            {...field}
            label="카테고리"
            isRequired
            options={type === '지출' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES}
          />
        )}
      />
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <PrimaryInput {...field} label={`${type}명`} type="text" message={errors.title?.message} />
        )}
      />
      <Controller
        name="cost"
        control={control}
        render={({ field }) => (
          <PrimaryInput
            {...field}
            label="금액"
            isRequired
            type="tel"
            value={costValue}
            onChange={e => handleCostChange(e.target.value, field.onChange)}
            message={errors.cost?.message}
          />
        )}
      />
      {type === '지출' && (
        <Controller
          name="expenseMethod"
          control={control}
          render={({ field }) => <SelectBox {...field} label="지출 수단" isRequired options={EXPENSE_METHODS} />}
        />
      )}
      <Controller name="memo" control={control} render={({ field }) => <MemoInput {...field} />} />
    </div>
  );
};

export default TransactionForm;
