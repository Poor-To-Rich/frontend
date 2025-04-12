import { useId } from 'react';
import RadioOption from './RadioOption';
import { useCalenderDateStore } from '@/stores/useCalenderDateStore';
import { getDate } from 'date-fns';

const MonthlyOptionSelector = () => {
  const { calenderDate } = useCalenderDateStore();
  const options = [
    {
      label: `매월 ${getDate(calenderDate)}일`,
      value: 'dayOfMonth',
    },
    {
      label: `매월 `,
      value: 'weekdayOfMonth',
    },
  ];

  return (
    <div>
      {options.map(({ label, value }) => {
        const radioId = useId();
        return <RadioOption checked={false} radioId={radioId} label={label} value={value} key={value} />;
      })}
    </div>
  );
};

export default MonthlyOptionSelector;
