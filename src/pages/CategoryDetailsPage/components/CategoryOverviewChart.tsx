import PeriodSummary from '@/components/summary/PeriodSummary';
import CategoryLineChart from '@/pages/CategoryDetailsPage/components/lineChart/CategoryLineChart';
import CategoryBarChart from '@/pages/CategoryDetailsPage/components/barChart/CategoryBarChart';

interface Props {
  reportType: string;
  transactionType: string;
  isSavings?: boolean;
}

const CategoryOverviewChart = ({ reportType, transactionType, isSavings }: Props) => {
  const periodSummaryData = {
    period: '25.01.01~25.01.31',
    totalAmount: 200000000,
    weeklyBalances: [
      {
        period: '01.01~01.06',
        amount: 900000,
      },
      {
        period: '01.07~01.13',
        amount: 340000,
      },
      {
        period: '01.14~01.20',
        amount: 0,
      },
      {
        period: '01.21~01.27',
        amount: 762000,
      },
      {
        period: '01.28~01.31',
        amount: 120000,
      },
    ],
  };

  return (
    <div className="w-full">
      <PeriodSummary
        period="25.01.01~25.01.31"
        balance={periodSummaryData.totalAmount}
        transactionType={isSavings ? '저축/투자' : transactionType}
      />
      <div className="w-full h-[300px] p-5">
        {reportType === '월별' ? (
          <CategoryLineChart weeklyBalances={periodSummaryData.weeklyBalances} />
        ) : (
          <CategoryBarChart />
        )}
      </div>
    </div>
  );
};

export default CategoryOverviewChart;
