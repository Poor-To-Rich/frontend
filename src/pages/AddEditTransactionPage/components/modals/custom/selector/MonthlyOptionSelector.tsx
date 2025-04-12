import { useId } from 'react';
import RadioOption from './RadioOption';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { getKoreanWeek } from '@/utils/date';
import { useCalenderDateStore } from '@/stores/useCalenderDateStore';

const MonthlyOptionSelector = () => {
  const { control } = useFormContext();
  const { calenderDate } = useCalenderDateStore();
  const { mode, day, week, dayOfWeek } = useWatch({ control, name: 'customIteration.iterationRule.monthlyOption' });

  const options = [
    {
      label: `매월 ${day}일`,
      value: 'dayOfMonth',
    },
    {
      label: `매월 ${getKoreanWeek(calenderDate, week)} ${dayOfWeek}요일`,
      value: 'weekdayOfMonth',
    },
  ];

  return (
    <Controller
      name={'customIteration.iterationRule.monthlyOption.mode'}
      control={control}
      render={({ field }) => (
        <div>
          {options.map(({ label, value }) => {
            const radioId = useId();
            return (
              <RadioOption
                key={value}
                checked={mode === value}
                radioId={radioId}
                label={label}
                onChange={() => field.onChange(value)}
              />
            );
          })}
        </div>
      )}
    />
  );
};

export default MonthlyOptionSelector;
