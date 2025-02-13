import { format } from 'date-fns';

export const isSameDate = (today: Date, targetDate: Date) => {
  return (
    today.getFullYear() === targetDate.getFullYear() &&
    today.getMonth() === targetDate.getMonth() &&
    today.getDate() === targetDate.getDate()
  );
};

export const formatDate = (date: Date) => {
  return format(date, 'MM.dd');
};
