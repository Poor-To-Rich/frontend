import { QueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';

const invalidateTransactionQueries = (queryClient: QueryClient, date: Date) => {
  const year = format(date, 'yyyy');
  const yearMonth = format(date, 'yyyy-MM');
  const yearMonthDay = format(date, 'yyyy-MM-dd');

  queryClient.invalidateQueries({
    queryKey: ['dailyDetails', yearMonthDay],
  });
  queryClient.invalidateQueries({
    queryKey: ['monthlyTotal', yearMonth],
  });

  queryClient.invalidateQueries({
    queryKey: ['yearlySummary', year],
  });
  queryClient.invalidateQueries({
    queryKey: ['weeklySummary', yearMonth],
  });
};

export default invalidateTransactionQueries;
