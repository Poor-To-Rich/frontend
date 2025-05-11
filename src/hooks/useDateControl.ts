import { addMonths, addYears, subMonths, subYears } from 'date-fns';

interface Props {
  headerDate: Date;
  setHeaderDate: (date: Date) => void;
}

export const useDateControl = ({ headerDate, setHeaderDate }: Props) => {
  const prevYearHandler = () => {
    setHeaderDate(subYears(headerDate, 1));
  };

  const nextYearHandler = () => {
    setHeaderDate(addYears(headerDate, 1));
  };

  const prevMonthHandler = () => {
    setHeaderDate(subMonths(headerDate, 1));
  };

  const nextMonthHandler = () => {
    setHeaderDate(addMonths(headerDate, 1));
  };

  return { prevYearHandler, nextYearHandler, prevMonthHandler, nextMonthHandler };
};
