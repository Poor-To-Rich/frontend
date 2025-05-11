import { CustomIterationCycleValue } from '@/types/iterationTypes';
import { TransactionFormDataType } from '@/types/transactionTypes';
import { Controller, useFormContext } from 'react-hook-form';

interface Props {
  type: CustomIterationCycleValue;
}

const IterationInterval = ({ type }: Props) => {
  const { control, setValue } = useFormContext<TransactionFormDataType>();
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
    <Controller
      control={control}
      name={'customIteration.cycle'}
      render={({ field }) => (
        <div className="flex gap-3.5">
          <span>반복 주기</span>
          <input
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            min={1}
            max={365}
            maxLength={3}
            placeholder="1"
            className="w-[40px] text-center focus:outline-none placeholder:text-defaultGrey"
            value={field.value}
            onChange={e => {
              const value = e.target.value;

              if (/^\d*$/.test(value)) {
                const cycle = Number(value);

                if (cycle > 365) {
                  field.onChange(365);
                } else {
                  field.onChange(value === '' ? '' : cycle);
                }
              }
            }}
            onBlur={e => {
              if (!e.target.value) setValue('customIteration.cycle', 1, { shouldValidate: true });
            }}
          />
          <span>{durationUnit}</span>
        </div>
      )}
    />
  );
};

export default IterationInterval;
