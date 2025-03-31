interface Props {
  period: string;
  balance: number;
  type: string;
}

const PeriodSummary = ({ period, balance, type }: Props) => {
  return (
    <div className="w-full h-[9rem] bg-pastelLime flex flex-col justify-center gap-2 px-9">
      <div className="flex gap-2 items-end">
        <span className="text-22">구간 {type} 금액</span>
        <span className="text-md">({period})</span>
      </div>
      <span className="text-xl font-semibold truncate">{balance.toLocaleString()}원</span>
    </div>
  );
};

export default PeriodSummary;
