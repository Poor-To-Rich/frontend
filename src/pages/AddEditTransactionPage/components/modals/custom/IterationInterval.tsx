import { CustomIterationCycleValue } from '@/types/iterationTypes';
import { TransactionFormData } from '@/types/transactionTypes';
import { useFormContext } from 'react-hook-form';

interface Props {
  type: CustomIterationCycleValue;
}

const IterationInterval = ({ type }: Props) => {
  const { register, setValue } = useFormContext<TransactionFormData>();
  const durationUnit = (() => {
    switch (type) {
      case 'daily':
        return '일';
      case 'weekly':
        return '주';
      case 'monthly':
        return '개월';
      case 'yearly':
        return '년';
    }
  })();

  return (
    <div className="flex gap-3.5">
      <span>반복 주기</span>
      <input
        type="tel"
        inputMode="numeric"
        pattern="[0-9]*"
        min={1}
        max={999}
        maxLength={3}
        defaultValue={1}
        placeholder="1"
        className="w-[40px] text-center focus:outline-none placeholder:text-defaultGrey"
        {...register('customIteration.interval', { valueAsNumber: true })}
        onBlur={e => {
          if (!e.target.value) setValue('customIteration.interval', 1, { shouldValidate: true });
        }}
      />
      <span>{durationUnit}</span>
    </div>
  );
};

export default IterationInterval;
