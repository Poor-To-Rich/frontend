import clsx from 'clsx';
import { CUSTOM_ITERATION_CYCLE } from '@/constants/repeatSchedule';
import { Controller, useFormContext } from 'react-hook-form';
import { CustomIterationCycleValue } from '@/types/iterationTypes';

interface Props {
  type: CustomIterationCycleValue;
}

const IterationTypeSelector = ({ type }: Props) => {
  const { control } = useFormContext();

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
                type === value && 'bg-pastelLime',
                'w-1/5 text-center py-1.5  rounded-3xl cursor-pointer',
              )}
              onClick={() => field.onChange(value)}
              {...field}>
              {label}
            </button>
          ))}
        </div>
      )}
    />
  );
};

export default IterationTypeSelector;
