import { format, isSameDay, isValid, lastDayOfMonth, parse } from 'date-fns';
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

export const monthDayFormatter = (date: string | Date) => {
  return format(date, 'MM.dd');
};

export const validateDate = (value: string): boolean => {
  if (!dayRegex.test(value)) {
    return false;
  }

  const parsedDate = parse(value, 'yyyy-MM-dd', new Date());
  return isValid(parsedDate);
};

export const getKoreanDay = (date: Date): DaysOfWeekType => {
  const editableDays = [...DAYS];
  return editableDays[date.getDay()];
};

export const getKoreanWeekOfMonth = (date: Date) => {
  const monthOfLastDay = lastDayOfMonth(date);
  const isLastWeek = monthOfLastDay.getDate() - date.getDate() < 7;
  const day = date.getDate();

  if (isLastWeek) return 0;
  if (day <= 7) return 1;
  if (day <= 14) return 2;
  if (day <= 21) return 3;
  if (day <= 28) return 4;
  return 0;
};

export const getKoreanWeek = (date: Date, week: number) => {
  const lastDateOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const lastWeek = getKoreanWeekOfMonth(lastDateOfMonth);

  const koreanWeek = ['첫째주', '둘째주', '셋째주', '넷째주'];
  return lastWeek === week ? '마지막주' : koreanWeek[week - 1];
};

export const isMonthOfLastDay = (date: Date) => {
  const isEndOfMonth = isSameDay(date, lastDayOfMonth(date));
  return isEndOfMonth;
};
