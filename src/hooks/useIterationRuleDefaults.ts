import { useState, useEffect } from 'react';
import { useCalenderDateStore } from '@/stores/useCalenderDateStore';
import { getKoreanDay, getKoreanWeekOfMonth } from '@/utils/date';
import { getDate } from 'date-fns';

export const useIterationRuleDefaults = () => {
  const { calenderDate } = useCalenderDateStore();
  const [iterationRuleDefaults, setIterationRuleDefaults] = useState(() => calculateIterationDefaults(calenderDate));

  useEffect(() => {
    const newIterationDefaults = calculateIterationDefaults(calenderDate);
    setIterationRuleDefaults(newIterationDefaults);
  }, [calenderDate]);

  return { iterationRuleDefaults };
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
