import useGetTotalAndSavings from '@/hooks/apis/chart/useGetTotalAndSavings';
import useFormattedReportDate from '@/hooks/chart/useFormattedReportDate';
import SummaryItem from '@/pages/ChartPage/components/summary/SummaryItem';
import { useTransactionReportTypeStore } from '@/stores/chart/useTransactionReportTypeStore';
import { handleClickCategoryChart } from '@/pages/ChartPage/utils/handleClickCategoryChart';
import { useNavigate } from 'react-router-dom';
import { useReportTypeStore } from '@/stores/chart/useReportTypeStore';

const ReportSummary = () => {
  const navigate = useNavigate();
  const { currentReportType } = useReportTypeStore();
  const { currentTransactionType } = useTransactionReportTypeStore();
  const formattedDate = useFormattedReportDate();
  const { data: totalAndSavings, isFetching } = useGetTotalAndSavings(currentTransactionType, formattedDate);

  const categoryName = '저축/투자';
  return (
    <div className="w-full flex justify-between px-8 py-4 gap-3.5">
      {!totalAndSavings || isFetching ? (
        <div>로딩중 ..</div>
      ) : (
        <>
          <SummaryItem title="총액" total={totalAndSavings.totalAmount} />
          <SummaryItem
            title="저축/투자"
            total={totalAndSavings.totalSaving}
            onClick={() =>
              handleClickCategoryChart(
                navigate,
                totalAndSavings.savingCategoryId,
                categoryName,
                currentTransactionType,
                currentReportType,
                formattedDate,
                true,
              )
            }
          />
        </>
      )}
    </div>
  );
};

export default ReportSummary;
