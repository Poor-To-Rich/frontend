interface Props {
  period: string;
  balance: number;
}

const PeriodReport = ({ period, balance }: Props) => {
  return (
    <div className="w-full h-[9rem] bg-pastelLime flex flex-col justify-center gap-2 pl-9">
      <div className="flex gap-2 items-end">
        <span className="text-22">구간 지출 금액</span>
        <span className="text-md">({period})</span>
      </div>
      <span className="text-xl font-semibold">{balance.toLocaleString()}원</span>
    </div>
  );
};

export default PeriodReport;
