import { DAYS } from '@/constants/days';

const DayOfWeekSelector = () => {
  return (
    <div className="flex justify-around">
      {DAYS.map(day => (
        <button key={day} className="w-1/9 aspect-square rounded-full bg-strokeGray">
          {day}
        </button>
      ))}
    </div>
  );
};

export default DayOfWeekSelector;
