import { format, addMonths, getDate } from 'date-fns';
import { merge } from 'lodash';
import { getKoreanDay, getKoreanWeekOfMonth } from '@/utils/date';
import { TransactionFormDataType } from '@/types/transactionTypes';
import { useHeaderDateStore } from '@/stores/useHeaderDateStore';
import { useCalenderDateStore } from '@/stores/useCalenderDateStore';
import { UseFormReturn } from 'react-hook-form';
import { useResetCustomIteration } from '@/hooks/useResetCustomIteration';

export const useUpdateIterationByDate = (form: UseFormReturn<TransactionFormDataType>) => {
  const { getValues, setValue } = form;
  const { customIteration } = useResetCustomIteration();
  const { setMainHeaderDate } = useHeaderDateStore();
  const { setCalenderDate } = useCalenderDateStore();

  const updateByDate = (dateString: string) => {
    if (!dateString) {
      setValue('date', '', { shouldValidate: true });
      return;
    }

    const currentDate = new Date(dateString);
    const formattedDate = format(currentDate, 'yyyy-MM-dd');
    const koreanDay = getKoreanDay(currentDate);

    setCalenderDate(currentDate);
    setMainHeaderDate(currentDate);

    const prevCustomIteration = getValues().customIteration;
    const newDaysOfWeek =
      prevCustomIteration?.iterationRule.type === 'weekly' ? prevCustomIteration.iterationRule.daysOfWeek : [koreanDay];

    const newCustomIteration = {
      end: {
        date: format(addMonths(currentDate, 2), 'yyyy-MM-dd'),
      },
      iterationRule: {
        monthlyOption: {
          day: getDate(currentDate),
          week: getKoreanWeekOfMonth(currentDate),
          dayOfWeek: koreanDay,
        },
        daysOfWeek: [...newDaysOfWeek],
      },
    };

    const merged = prevCustomIteration
      ? merge({}, prevCustomIteration, newCustomIteration)
      : merge({}, customIteration, newCustomIteration);

    setValue('date', formattedDate, { shouldDirty: true, shouldValidate: true });
    setValue('customIteration', merged, { shouldDirty: true });
  };

  return updateByDate;
};
