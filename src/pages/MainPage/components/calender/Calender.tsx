import Weekdays from '@/pages/MainPage/components/calender/Weekdays ';
import DaysContainer from '@/pages/MainPage/components/calender/DaysContainer';
import { useCalenderDateStore } from '@/stores/useCalenderDateStore';
import { useHeaderDateStore } from '@/stores/useHeaderDateStore';

const Calender = () => {
  const { mainHeaderDate } = useHeaderDateStore();
  const { calenderDate, setCalenderDate } = useCalenderDateStore();
  const handleDateClick = (date: Date) => {
    setCalenderDate(date);
  };

  return (
    <div className="w-full bg-white flex flex-col gap-2.5 p-1.5 my-5">
      <Weekdays />
      <DaysContainer
        activeDate={calenderDate}
        currentDay={mainHeaderDate}
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
