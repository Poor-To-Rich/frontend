import { useDateStore } from '@/stores/useDateStore';
import { addMonths, addYears, subMonths, subYears } from 'date-fns';

export const useDateControl = () => {
  const { currentDate, setCurrentDate } = useDateStore();

  const prevYearHandler = () => {
    setCurrentDate(subYears(currentDate, 1));
  };

  const nextYearHandler = () => {
    setCurrentDate(addYears(currentDate, 1));
  };

  const prevMonthHandler = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const nextMonthHandler = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  return { prevYearHandler, nextYearHandler, prevMonthHandler, nextMonthHandler };
};
