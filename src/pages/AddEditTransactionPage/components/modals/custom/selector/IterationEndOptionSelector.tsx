import { useId } from 'react';
import RadioOption from './RadioOption';
import { useFormContext, useWatch } from 'react-hook-form';
import { CustomIterationEndsType } from '@/types/iterationTypes';

const IterationEndOptionSelector = () => {
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
            className="w-[40px] text-center text-defaultGrey focus:outline-none"
            {...register('customIteration.ends.count')}
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
            className="w-fit text-center text-defaultGrey focus:outline-none"
            {...register('customIteration.ends.date')}
          />
        </>
      ),
    },
  ];

  const handleRadioChange = (value: string) => {
    setValue('customIteration.ends.type', value);

    if (value === 'never') {
      setValue('customIteration.ends.count', undefined);
      setValue('customIteration.ends.date', undefined);
    } else if (value === 'after') {
      setValue('customIteration.ends.date', undefined);
    } else if (value === 'until') {
      setValue('customIteration.ends.count', undefined);
    }
  };

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
              onChange={() => handleRadioChange(value)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default IterationEndOptionSelector;
