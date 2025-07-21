import useGetTotalAndSavings from '@/hooks/apis/chart/useGetTotalAndSavings';
import useFormattedReportDate from '@/hooks/chart/useFormattedReportDate';
import SummaryItem from '@/pages/ChartPage/components/summary/SummaryItem';
import { useTransactionReportTypeStore } from '@/stores/chart/useTransactionReportTypeStore';
import { handleClickCategoryChart } from '@/pages/ChartPage/utils/handleClickCategoryChart';
import { useNavigate } from 'react-router-dom';
import { useReportTypeStore } from '@/stores/chart/useReportTypeStore';
import { handleFetchError } from '@/utils/error/handleFetchError';

const ReportSummary = () => {
  const navigate = useNavigate();
  const { currentReportType } = useReportTypeStore();
  const { currentTransactionType } = useTransactionReportTypeStore();
  const formattedDate = useFormattedReportDate();
  const {
    data: totalAndSavings,
    isPending,
    isError,
    error,
  } = useGetTotalAndSavings(currentTransactionType, formattedDate);

  const categoryName = '저축/투자';

  if (isError && error) {
    return handleFetchError(error);
  }

  return (
    <div className="w-full flex justify-between px-8 py-4 gap-3.5">
      <>
        <SummaryItem title="총액" isPending={isPending} total={isPending ? 0 : totalAndSavings?.totalAmount} />
        <SummaryItem
          title="저축/투자"
          isPending={isPending}
          total={totalAndSavings?.totalSaving}
          onClick={() => {
            if (!isPending && totalAndSavings)
              handleClickCategoryChart(
                navigate,
                totalAndSavings.savingCategoryId,
                categoryName,
                currentTransactionType,
                currentReportType,
                formattedDate,
                true,
              );
          }}
        />
      </>
    </div>
  );
};

export default ReportSummary;
