interface CustomXAxisTickProps {
  x: number;
  y: number;
  payload: {
    value: string;
    [key: string]: any;
  };
  onClickTick: (period: string) => void;
  currentReportType: string;
}

const CustomXAxisTick = ({ x, y, payload, onClickTick, currentReportType }: CustomXAxisTickProps) => {
  const period = payload.value;

  const formatted = currentReportType === '월별' ? `${period.slice(-2)}월` : `${period.slice(0, 4)}`;

  return (
    <text
      x={x}
      y={y}
      dy={16}
      textAnchor="middle"
      fill="#000"
      className="cursor-pointer"
      onClick={() => onClickTick(period)}>
      {formatted}
    </text>
  );
};

export default CustomXAxisTick;
