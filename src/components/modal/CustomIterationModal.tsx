import { CUSTOM_ITERATION_CYCLE } from '@/constants/repeatSchedule';
import { CustomIterationType } from '@/types/iterationTypes';
import clsx from 'clsx';

interface Props {
  customIteration: CustomIterationType;
}

const CustomIterationModal = ({ customIteration }: Props) => {
  return (
    <div className="w-[80%] min-h-[300px] bg-white">
      <div>
        {CUSTOM_ITERATION_CYCLE.map(({ label, value }) => (
          <span key={value} className={clsx('text-lg')}>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CustomIterationModal;
