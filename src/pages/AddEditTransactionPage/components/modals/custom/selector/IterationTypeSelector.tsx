import { clsx } from 'clsx';
import { CUSTOM_ITERATION_CYCLE } from '@/constants/repeatSchedule';
import { Controller, useFormContext } from 'react-hook-form';
import { TransactionFormData } from '@/types/transactionTypes';

const IterationTypeSelector = () => {
  const { control } = useFormContext<TransactionFormData>();

  return (
    <Controller
      control={control}
      name={'customIteration.iterationRule.type'}
      render={({ field }) => (
        <div className="flex justify-around mb-8">
          {CUSTOM_ITERATION_CYCLE.map(({ label, value }) => (
            <button
              type="button"
              key={value}
              className={clsx(
                field.value === value && 'bg-pastelLime',
                'w-1/5 text-center py-1.5  rounded-3xl cursor-pointer',
              )}
              onClick={() => field.onChange(value)}>
              {label}
            </button>
          ))}
        </div>
      )}
    />
  );
};

export default IterationTypeSelector;
