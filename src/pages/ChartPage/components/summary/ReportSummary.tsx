import SummaryItem from '@/pages/ChartPage/components/summary/SummaryItem';

const ReportSummary = () => {
  const data = {
    totalExpenseAmount: 124123123,
    totalSavingAmount: 465811513,
  };

  return (
    <div className="w-full flex justify-between px-8 py-4 gap-3.5">
      <SummaryItem title="총액" total={data.totalExpenseAmount} />
      <SummaryItem title="저축" total={data.totalSavingAmount} />
    </div>
  );
};

export default ReportSummary;
