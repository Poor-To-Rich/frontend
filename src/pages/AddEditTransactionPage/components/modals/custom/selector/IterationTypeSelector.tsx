import clsx from 'clsx';
import { CUSTOM_ITERATION_CYCLE } from '@/constants/repeatSchedule';
import { FieldValues, UseFormSetValue } from 'react-hook-form';
import { CustomIterationCycleValue } from '@/types/iterationTypes';

interface Props {
  type: CustomIterationCycleValue;
  setValue: UseFormSetValue<FieldValues>;
}

const IterationTypeSelector = ({ type, setValue }: Props) => {
  return (
    <div className="flex justify-around mb-8">
      {CUSTOM_ITERATION_CYCLE.map(({ label, value }) => (
        <span
          key={value}
          className={clsx(type === value && 'bg-pastelLime', 'w-1/5 text-center py-1.5  rounded-3xl cursor-pointer')}
          onClick={() => setValue('customIteration.type', value, { shouldValidate: true })}>
          {label}
        </span>
      ))}
    </div>
  );
};

export default IterationTypeSelector;
