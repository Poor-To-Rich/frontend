import { useId } from 'react';
import RadioOption from './RadioOption';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { getKoreanWeek, isMonthOfLastDay } from '@/utils/date';
import { useCalenderDateStore } from '@/stores/useCalenderDateStore';

const MonthlyOptionSelector = () => {
  const { control } = useFormContext();
  const { calenderDate } = useCalenderDateStore();
  const { mode, day, week, dayOfWeek } = useWatch({ control, name: 'customIteration.iterationRule.monthlyOption' });
  const isEndOfMonth = isMonthOfLastDay(calenderDate);
  const baseId = useId();

  const baseOptions = [
    {
      label: `매월 ${day}일`,
      value: 'dayOfMonth',
    },
    {
      label: `매월 ${getKoreanWeek(calenderDate, week)} ${dayOfWeek}요일`,
      value: 'weekdayOfMonth',
    },
  ];

  const options = isEndOfMonth ? [...baseOptions, { label: '매월 말일', value: 'endOfMonth' }] : baseOptions;

  return (
    <Controller
      name={'customIteration.iterationRule.monthlyOption.mode'}
      control={control}
      render={({ field }) => (
        <div data-testid="monthly-option-selector">
          {options.map(({ label, value }, index) => {
            const radioId = `${baseId}-${index}`;
            return (
              <RadioOption
                data-testid={value}
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
