import { TickPayload } from '@/types/chartTypes';

interface Props {
  x: number;
  y: number;
  payload: TickPayload;
}

const CustomizedXAxisTick = ({ x, y, payload }: Props) => {
  const { index } = payload;

  const firstLine = `${index + 1}주차`;

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={15} textAnchor="middle" fontSize={14}>
        {firstLine}
      </text>
    </g>
  );
};

export default CustomizedXAxisTick;
