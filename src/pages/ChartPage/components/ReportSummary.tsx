import SummaryItem from '@/pages/ChartPage/components/SummaryItem';

interface Props {
  totalAmount: number;
  totalSavingAmount: number;
}

const ReportSummary = ({ totalAmount, totalSavingAmount }: Props) => {
  return (
    <div className="w-full flex justify-between px-8 py-4 gap-3.5">
      <SummaryItem title="총액" total={totalAmount} />
      <SummaryItem title="저축" total={totalSavingAmount} />
    </div>
  );
};

export default ReportSummary;
