import { useId } from 'react';
import RadioOption from './RadioOption';

interface Props {
  day: number;
  weekday: string;
}

const MonthlyOptionSelector = ({ day, weekday }: Props) => {
  const options = [
    {
      label: `매월 ${day}일`,
      value: 'dayOfMonth',
    },
    {
      label: `매월 ${weekday}`,
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
