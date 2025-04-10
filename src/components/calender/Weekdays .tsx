import { DAYS } from '@/constants/days';
import clsx from 'clsx';

const Weekdays = () => {
  return (
    <div className="w-full flex border-b border-strokeGray">
      {DAYS.map(day => (
        <span
          key={day}
          className={clsx(
            'text-md flex-1 text-center pb-2.5',
            day === '일' && 'text-sunsetRose',
            day === '토' && 'text-oceanBlue',
          )}>
          {day}
        </span>
      ))}
    </div>
  );
};

export default Weekdays;
