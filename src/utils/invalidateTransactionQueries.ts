import { QueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';

const invalidateTransactionQueries = (queryClient: QueryClient, date: Date) => {
  const year = format(date, 'yyyy');
  const yearMonth = format(date, 'yyyy-MM');

  // 월별/일별 데이터 조회관련 쿼리키
  queryClient.invalidateQueries({
    queryKey: ['dailyDetails'],
  });
  queryClient.invalidateQueries({
    queryKey: ['monthlyTotal', yearMonth],
  });

  // 월별/주별 데이터 조회관련 쿼리키
  queryClient.invalidateQueries({
    queryKey: ['yearlySummary', year],
  });
  queryClient.invalidateQueries({
    queryKey: ['weeklySummary', yearMonth],
  });
  queryClient.invalidateQueries({
    queryKey: ['weeklyDetails', yearMonth],
  });

  // 차트 데이터 조회관련 쿼리키
  queryClient.invalidateQueries({
    queryKey: ['barChart', year],
  });
  queryClient.invalidateQueries({
    queryKey: ['barChart', yearMonth],
  });
  queryClient.invalidateQueries({
    queryKey: ['stackedBarChart', year],
  });
  queryClient.invalidateQueries({
    queryKey: ['stackedBarChart', yearMonth],
  });
  queryClient.invalidateQueries({
    queryKey: ['totalAndSavings', year],
  });
  queryClient.invalidateQueries({
    queryKey: ['totalAndSavings', yearMonth],
  });
};

export default invalidateTransactionQueries;
