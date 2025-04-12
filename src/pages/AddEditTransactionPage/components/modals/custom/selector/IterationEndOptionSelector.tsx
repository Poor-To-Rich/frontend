import { useId } from 'react';
import RadioOption from './RadioOption';
import { useFormContext, useWatch } from 'react-hook-form';
import { CustomIterationEndsType } from '@/types/iterationTypes';
import { useCalenderDateStore } from '@/stores/useCalenderDateStore';
import { format, addMonths } from 'date-fns';

const IterationEndOptionSelector = () => {
  const { calenderDate } = useCalenderDateStore();
  const { control, register, setValue } = useFormContext();
  const ends: CustomIterationEndsType = useWatch({ control, name: 'customIteration.ends' });

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
        <>
          <input
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            defaultValue={10}
            placeholder="10"
            className="w-[40px] text-center  placeholder:text-defaultGrey focus:outline-none"
            {...register('customIteration.ends.count', { valueAsNumber: true })}
            onBlur={e => {
              if (!e.target.value) {
                setValue('customIteration.ends.count', 10, { shouldValidate: true });
              }
            }}
          />
          <span>회 반복</span>
        </>
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
            {...register('customIteration.ends.date')}
          />
        </>
      ),
    },
  ];

  return (
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
              checked={ends.type === value}
              input={input}
              value={value}
              onChange={() => setValue('customIteration.ends.type', value)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default IterationEndOptionSelector;
