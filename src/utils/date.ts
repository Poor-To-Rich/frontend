import { format, isValid, parse } from 'date-fns';
import { dayRegex } from './regex';

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

export const validateDate = (value: string): boolean => {
  if (!dayRegex.test(value)) {
    return false;
  }
  const parsedDate = parse(value, 'yyyy.MM.dd', new Date());
  return isValid(parsedDate);
};
