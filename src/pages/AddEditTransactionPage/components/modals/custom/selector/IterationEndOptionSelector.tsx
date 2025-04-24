import { useId } from 'react';
import RadioOption from './RadioOption';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useCalenderDateStore } from '@/stores/useCalenderDateStore';
import { format, addMonths } from 'date-fns';
import { TransactionFormData } from '@/types/transactionTypes';

const IterationEndOptionSelector = () => {
  const { calenderDate } = useCalenderDateStore();
  const { control, register, setValue } = useFormContext<TransactionFormData>();
  const end = useWatch({ control, name: 'customIteration.end' });

  const options = [
    {
      label: '없음',
      value: 'never',
      input: null,
    },
    {
      label: '횟수',
      value: 'after',
      input: (
        <Controller
          name="customIteration.end.count"
          control={control}
          defaultValue={10}
          render={({ field }) => (
            <>
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                defaultValue={10}
                placeholder="10"
                className="w-[40px] text-center  placeholder:text-defaultGrey focus:outline-none"
                value={field.value}
                onChange={e => {
                  const value = e.target.value;

                  if (/^\d*$/.test(value)) {
                    field.onChange(value === '' ? '' : Number(value));
                  }
                }}
                onBlur={e => {
                  if (!e.target.value) {
                    setValue('customIteration.end.count', 10, { shouldValidate: true });
                  }
                }}
              />
              <span>회 반복</span>
            </>
          )}
        />
      ),
    },
    {
      label: '날짜',
      value: 'until',
      input: (
        <>
          <input
            type="date"
            defaultValue={format(addMonths(calenderDate, 2), 'yyyy-MM-dd')}
            min={format(calenderDate, 'yyyy-MM-dd')}
            className="w-fit text-center focus:outline-none"
            {...register('customIteration.end.date')}
          />
        </>
      ),
    },
  ];

  return (
    <Controller
      control={control}
      name={'customIteration.end.type'}
      render={({ field }) => (
        <div className="flex flex-col gap-5">
          <span>반복 종료</span>
          <div>
            {options.map(({ label, value, input }) => {
              const radioId = useId();
              return (
                <RadioOption
                  key={radioId}
                  radioId={radioId}
                  label={label}
                  checked={end.type === value}
                  input={input}
                  onChange={() => field.onChange(value)}
                />
              );
            })}
          </div>
        </div>
      )}
    />
  );
};

export default IterationEndOptionSelector;
