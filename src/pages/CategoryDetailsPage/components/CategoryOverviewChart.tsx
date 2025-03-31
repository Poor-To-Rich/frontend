import PeriodSummary from '@/components/summary/PeriodSummary';
import CategoryLineChart from '@/pages/CategoryDetailsPage/components/lineChart/CategoryLineChart';
import CategoryBarChart from '@/pages/CategoryDetailsPage/components/barChart/CategoryBarChart';

interface Props {
  type: string;
}

const CategoryOverviewChart = ({ type }: Props) => {
  const periodSummaryData = {
    totalBalance: 200000000,
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
        amount: 230000,
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
    <div>
      <PeriodSummary period="01.01~01.31" balance={periodSummaryData.totalBalance} type={type || ' '} />
      <div className="w-full h-[300px] p-5">
        <CategoryLineChart weeklyBalances={periodSummaryData.weeklyBalances} />
        <CategoryBarChart />
      </div>
    </div>
  );
};

export default CategoryOverviewChart;
