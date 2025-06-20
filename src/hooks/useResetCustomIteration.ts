import { useCalenderDateStore } from '@/stores/useCalenderDateStore';
import { getKoreanDay, getKoreanWeekOfMonth } from '@/utils/date';
import { getDate } from 'date-fns';
import { EndType } from '@/types/transactionTypes';
import { useMemo } from 'react';

export const useResetCustomIteration = () => {
  const { calenderDate } = useCalenderDateStore();
  const end: EndType = { type: 'never' };

  const iterationRuleDefaults = useMemo(() => calculateIterationDefaults(calenderDate), [calenderDate]);

  return {
    customIteration: {
      iterationRule: iterationRuleDefaults,
      cycle: 1,
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
