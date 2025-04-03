import { TickPayload } from '@/types/chartTypes';

interface Props {
  x: number;
  y: number;
  payload: TickPayload;
}

const CustomizedXAxisTick = ({ x, y, payload }: Props) => {
  const { value, index } = payload;

  const firstLine = `${index + 1}주차`;
  const secondLine = `(${value})`;

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} textAnchor="middle" fontSize={14}>
        {firstLine}
      </text>
      <text x={0} y={20} textAnchor="middle" fontSize={10}>
        {secondLine}
      </text>
    </g>
  );
};

export default CustomizedXAxisTick;
