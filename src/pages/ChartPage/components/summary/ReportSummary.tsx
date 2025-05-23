import useGetTotalAndSavings from '@/hooks/apis/chart/useGetTotalAndSavings';
import useFormattedReportDate from '@/hooks/chart/useFormattedReportDate';
import SummaryItem from '@/pages/ChartPage/components/summary/SummaryItem';
import { useTransactionReportTypeStore } from '@/stores/chart/useTransactionReportTypeStore';

const ReportSummary = () => {
  const { currentTransactionType } = useTransactionReportTypeStore();
  const formattedDate = useFormattedReportDate();

  const { data: totalAndSavings, isFetching } = useGetTotalAndSavings(currentTransactionType, formattedDate);

  return (
    <div className="w-full flex justify-between px-8 py-4 gap-3.5">
      {!totalAndSavings || isFetching ? (
        <div>로딩중 ..</div>
      ) : (
        <>
          <SummaryItem title="총액" total={totalAndSavings.totalAmount} />
          <SummaryItem title="저축/투자" total={totalAndSavings.totalSavingsAmount} />
        </>
      )}
    </div>
  );
};

export default ReportSummary;
