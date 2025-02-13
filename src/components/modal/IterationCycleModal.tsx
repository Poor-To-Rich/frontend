import ModalDimmed from '@/components/modal/ModalDimmed';
import { ITERATION_CYCLE } from '@/constants/repeatSchedule';
import clsx from 'clsx';
import CheckIcon from '@/components/icon/CheckIcon';

interface Props {
  onClose?: () => void;
  iterationType: string;
}

const IterationCycleModal = ({ onClose, iterationType }: Props) => {
  return (
    <ModalDimmed onClose={onClose}>
      <div className="w-[48%] min-w-fit">
        <div className="flex flex-col bg-white" onClick={e => e.stopPropagation()}>
          {ITERATION_CYCLE.map((cycle, index) => (
            <button
              key={cycle}
              className={clsx(
                'w-full flex items-center justify-between p-3.5',
                (index !== 0 || index !== ITERATION_CYCLE.length - 1) && 'border-b border-strokeGray',
              )}>
              <span>{cycle}</span>
              {iterationType === cycle && <CheckIcon />}
            </button>
          ))}
        </div>
        <div className="w-full text-sm text-white p-2.5 text-center">반복데이터는 환경설정에서 관리할 수 있습니다.</div>
      </div>
    </ModalDimmed>
  );
};

export default IterationCycleModal;
