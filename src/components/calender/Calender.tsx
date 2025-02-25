import Weekdays from '@/components/calender/Weekdays ';
import DaysContainer from '@/components/calender/DaysContainer';
import { useState } from 'react';

const Calender = () => {
  const [activeDate, setActiveDate] = useState<Date>();

  const handleDateClick = (date: Date) => {
    setActiveDate(date);
  };

  return (
    <div className="w-full bg-white flex flex-col gap-2.5 p-1.5 my-5">
      <Weekdays />
      <DaysContainer
        activeDate={activeDate}
        currentDay={new Date()}
        handleDateClick={handleDateClick}
        transactions={[
          {
            date: new Date('2025-02-12'),
            incomesAmount: 150001216546824424,
            expenseAmount: 30000,
          },
          {
            date: new Date('2025-02-18'),
            incomesAmount: 15000,
            expenseAmount: 30000,
          },
          {
            date: new Date('2025-02-28'),
            incomesAmount: 15000,
            expenseAmount: 30000,
          },
        ]}
      />
    </div>
  );
};

export default Calender;
