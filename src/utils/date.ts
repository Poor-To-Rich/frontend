import { format, isValid, parse } from 'date-fns';
import { dayRegex } from './regex';
import { DAYS } from '@/constants/days';
import { DaysOfWeekType } from '@/types/iterationTypes';

export const isSameDate = (today: Date, targetDate: Date) => {
  return (
    today.getFullYear() === targetDate.getFullYear() &&
    today.getMonth() === targetDate.getMonth() &&
    today.getDate() === targetDate.getDate()
  );
};

export const monthDayFormatter = (date: Date) => {
  return format(date, 'MM.dd');
};

export const validateDate = (value: string): boolean => {
  if (!dayRegex.test(value)) {
    return false;
  }
  const parsedDate = parse(value, 'yyyy.MM.dd', new Date());
  return isValid(parsedDate);
};

export const getKoreanDay = (date: Date): DaysOfWeekType => {
  return DAYS[date.getDay()];
};

// export const getKoreanWeekday = (date: Date) => {

// }
