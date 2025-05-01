import Weekdays from '@/pages/MainPage/components/calender/Weekdays ';
import DaysContainer from '@/pages/MainPage/components/calender/DaysContainer';
import { useCalenderDateStore } from '@/stores/useCalenderDateStore';
import { useHeaderDateStore } from '@/stores/useHeaderDateStore';
import { TransactionType } from '@/types/transactionTypes';

interface Props {
  transactions: TransactionType[];
}

const Calender = ({ transactions }: Props) => {
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
        transactions={transactions}
      />
    </div>
  );
};

export default Calender;
