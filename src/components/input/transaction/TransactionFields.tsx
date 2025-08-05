import PrimaryInput from '@/components/input/PrimaryInput';
import SelectBox from '@/components/input/SelectBox';
import { EXPENSE_METHODS } from '@/constants/options';
import { SelectOptionsType } from '@/types/fieldType';
import { IncomeExpenseType, TransactionFormDataType } from '@/types/transactionTypes';
import { Controller, useFormContext } from 'react-hook-form';
import { useUpdateIterationByDate } from '@/hooks/transaction/useUpdateIterationByDate';
import TextArea from '@/components/input/TextArea';

interface Props {
  type: IncomeExpenseType;
  options: SelectOptionsType[];
}

const TransactionFields = ({ type, options }: Props) => {
  const isExpense = type === '지출';
  const form = useFormContext<TransactionFormDataType>();
  const {
    control,
    register,
    formState: { errors },
  } = form;
  const updateByDate = useUpdateIterationByDate(form);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateByDate(e.target.value);
  };

  return (
    <div className="flex flex-col flex-grow min-h-0 mt-7 gap-3.5">
      <PrimaryInput
        label="날짜"
        data-testid="date-input"
        isRequired
        type="date"
        errorMessage={errors.date?.message}
        {...register('date')}
        onChange={handleDateChange}
      />
      <SelectBox
        label="카테고리"
        data-testid={`${isExpense ? 'expense' : 'income'}-categories-select`}
        isRequired
        options={options}
        type={type}
        hasEditButton
        errorMessage={errors.categoryName?.message}
        {...register('categoryName')}
      />
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
            defaultValue={0}
            label="금액"
            asNumberFormat
            isRequired
            type="tel"
            inputMode="numeric"
            numericFormatProps={{
              value: field.value === 0 ? '' : field.value,
              thousandSeparator: true,
              allowNegative: false,
              onValueChange: values => {
                const floatVal = values.floatValue;

                if (floatVal === field.value) return;

                field.onChange(values.floatValue ?? 0);
              },
              getInputRef: (el: HTMLInputElement | null) => {
                field.ref(el);
              },
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
          <TextArea
            data-testid="memo-input"
            label="메모"
            maxLength={100}
            errorMessage={errors.memo?.message}
            placeholder="메모를 입력해주세요"
            {...field}
          />
        )}
      />
    </div>
  );
};

export default TransactionFields;
