import { DAYS } from '@/constants/days';
import clsx from 'clsx';
import { Controller, useFormContext } from 'react-hook-form';

const DayOfWeekSelector = () => {
  const { control } = useFormContext();

  return (
    <Controller
      name="customIteration.iterationRule.daysOfWeek"
      control={control}
      render={({ field }) => {
        const { value, onChange } = field;

        const toggleDay = (day: string) => {
          if (value.includes(day)) {
            onChange(value.filter((d: string) => d !== day));
          } else {
            onChange([...value, day]);
          }
        };

        return (
          <div className="flex justify-around">
            {DAYS.map(day => (
              <button
                type="button"
                key={day}
                onClick={() => toggleDay(day)}
                className={clsx(
                  value.includes(day) ? 'bg-pastelLime' : 'bg-strokeGray',
                  'w-1/9 aspect-square rounded-full cursor-pointer',
                )}>
                {day}
              </button>
            ))}
          </div>
        );
      }}
    />
  );
};

export default DayOfWeekSelector;
