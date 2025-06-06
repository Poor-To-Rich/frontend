import { useHeaderDateStore } from '@/stores/useHeaderDateStore';
import { ReportType } from '@/types/reportTypes';
import { IncomeExpenseType } from '@/types/transactionTypes';
import { format } from 'date-fns';

interface Props {
  currentTransactionType: IncomeExpenseType;
  currentReportType: ReportType;
  differenceAmount: string;
  averageAmount: string;
}

const PeriodSummary = ({ currentTransactionType, currentReportType, differenceAmount, averageAmount }: Props) => {
  const { chartHeaderDate } = useHeaderDateStore();
  return (
    <div className="p-5 mb-10">
      <div className="text-xl">
        {format(chartHeaderDate, currentReportType === '월별' ? 'M' : 'yyyy')}
        {currentReportType === '월별' ? '월' : '년'}에는 {currentReportType === '월별' ? '전월' : '작년'}보다{' '}
        {differenceAmount}
        {currentTransactionType === '지출' ? '썼어요' : '벌었어요'}
      </div>
      <div>
        {currentReportType === '월별' ? '한달' : '일년'}에 평균 {averageAmount}정도{' '}
        {currentTransactionType === '지출' ? '써요' : '벌어요'}
      </div>
    </div>
  );
};

export default PeriodSummary;
