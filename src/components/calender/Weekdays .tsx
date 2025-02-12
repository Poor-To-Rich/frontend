import clsx from 'clsx';

const Weekdays = () => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return (
    <div className="w-full flex border-b border-strokeGray">
      {days.map(day => (
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
