import { useState, useEffect } from 'react';
import { useCalenderDateStore } from '@/stores/useCalenderDateStore';
import { getKoreanDay, getKoreanWeekOfMonth } from '@/utils/date';
import { getDate } from 'date-fns';
import { EndType } from '@/types/transactionTypes';

export const useResetCustomIteration = () => {
  const { calenderDate } = useCalenderDateStore();
  const [iterationRuleDefaults, setIterationRuleDefaults] = useState(() => calculateIterationDefaults(calenderDate));
  const end: EndType = { type: 'never' };

  useEffect(() => {
    const newIterationDefaults = calculateIterationDefaults(calenderDate);
    setIterationRuleDefaults(newIterationDefaults);
  }, [calenderDate]);

  return {
    customIteration: {
      iterationRule: iterationRuleDefaults,
      interval: 1,
      end: end,
    },
  };
};

const calculateIterationDefaults = (calenderDate: Date) => {
  const koreanDay = getKoreanDay(calenderDate);

  return {
    type: 'daily',
    daysOfWeek: [koreanDay],
    monthlyOption: {
      mode: 'dayOfMonth',
      day: getDate(calenderDate),
      week: getKoreanWeekOfMonth(calenderDate),
      dayOfWeek: koreanDay,
    },
  } as const;
};
