import { DateTransactionType } from '@/types/transactionTypes';
import { clsx } from 'clsx';
import { addDays, differenceInCalendarDays, endOfMonth, endOfWeek, startOfMonth, startOfWeek } from 'date-fns';
import DayWithData from '@/pages/MainPage/components/calender/DayWithData';
import { isSameDate } from '@/utils/date';

interface Props {
  activeDate: Date;
  handleDateClick: (date: Date) => void;
  currentDay: Date;
  transactions: DateTransactionType[];
}

const DaysContainer = ({ activeDate, handleDateClick, currentDay, transactions }: Props) => {
  const monthStartDate = startOfMonth(currentDay); // 현재 달의 시작 일과 요일
  const monthEndDate = endOfMonth(currentDay); // 현재 달의 마지막 일과 요일
  const weekStartDate = startOfWeek(monthStartDate); // 현재 달의 시작 날짜가 포함된 주의 시작 날짜
  const weekEndDate = endOfWeek(monthEndDate); // 현재 달의 마지막 날짜가 포함된 주의 마지막 날짜
  const today = new Date();

  console.log(weekStartDate, weekEndDate);

  const datesOfCurrentMonth = (() => {
    const monthDays = [];
    let day = weekStartDate;

    while (differenceInCalendarDays(weekEndDate, day) >= 0) {
      monthDays.push(day);
      day = addDays(day, 1);
    }

    return monthDays;
  })();

  return (
    <div className="grid grid-cols-7 w-full h-full">
      {datesOfCurrentMonth.map((day, index) => {
        const isToday = isSameDate(today, day);
        const isActive = isSameDate(activeDate, day);

        return (
          <button key={index} onClick={() => handleDateClick(day)} className="cursor-pointer">
            <div
              className={clsx(
                'flex flex-col flex-1 aspect-square items-center text-[1.2rem] ',
                currentDay.getMonth() !== day.getMonth() && 'text-defaultGrey',
                isActive && 'bg-vanillaCream',
                isToday && 'bg-pastelLime',
              )}>
              <span
                className={clsx(
                  (isActive || isToday) && 'font-bold',
                  isToday && (isActive ? 'text-black' : 'text-oliveGreen'),
                )}>
                {day.getDate()}
              </span>
              <DayWithData transactions={transactions} targetDate={day} />
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default DaysContainer;
