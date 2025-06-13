import { QueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';

const invalidateTransactionQueries = (queryClient: QueryClient, date: Date) => {
  const year = format(date, 'yyyy');
  const yearMonth = format(date, 'yyyy-MM');

  // 월별/일별 데이터 조회관련 쿼리키
  queryClient.refetchQueries({
    queryKey: ['dailyDetails'],
  });
  queryClient.refetchQueries({
    queryKey: ['monthlyTotal', yearMonth],
  });

  // 월별/주별 데이터 조회관련 쿼리키
  queryClient.refetchQueries({
    queryKey: ['yearlySummary', year],
  });
  queryClient.refetchQueries({
    queryKey: ['weeklySummary', yearMonth],
  });
  queryClient.refetchQueries({
    queryKey: ['weeklyDetails', yearMonth],
  });

  // 차트 데이터 조회관련 쿼리키
  queryClient.refetchQueries({
    queryKey: ['barChart', year],
  });
  queryClient.refetchQueries({
    queryKey: ['barChart', yearMonth],
  });
  queryClient.refetchQueries({
    queryKey: ['stackedBarChart', year],
  });
  queryClient.refetchQueries({
    queryKey: ['stackedBarChart', yearMonth],
  });
  queryClient.refetchQueries({
    queryKey: ['totalAndSavings', year],
  });
  queryClient.refetchQueries({
    queryKey: ['totalAndSavings', yearMonth],
  });
};

export default invalidateTransactionQueries;
