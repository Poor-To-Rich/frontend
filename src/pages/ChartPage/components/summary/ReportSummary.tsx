import useGetTotalAndSavings from '@/hooks/apis/chart/useGetTotalAndSavings';
import SummaryItem from '@/pages/ChartPage/components/summary/SummaryItem';
import { useReportTypeStore } from '@/stores/chart/useReportTypeStore';
import { useTransactionReportTypeStore } from '@/stores/chart/useTransactionReportTypeStore';
import { useHeaderDateStore } from '@/stores/useHeaderDateStore';
import { format } from 'date-fns';

const ReportSummary = () => {
  const { chartHeaderDate } = useHeaderDateStore();
  const { currentReportType } = useReportTypeStore();
  const { currentTransactionType } = useTransactionReportTypeStore();

  const date = currentReportType === '연별' ? format(chartHeaderDate, 'yyyy') : format(chartHeaderDate, 'yyyy-MM');

  const { data: totalAndSavings, isFetching } = useGetTotalAndSavings(currentTransactionType, date);

  return (
    <div className="w-full flex justify-between px-8 py-4 gap-3.5">
      {!totalAndSavings || isFetching ? (
        <div>로딩중 ..</div>
      ) : (
        <>
          <SummaryItem title="총액" total={totalAndSavings.totalAmount} />
          <SummaryItem title="저축" total={totalAndSavings.totalSavingsAmount} />
        </>
      )}
    </div>
  );
};

export default ReportSummary;
