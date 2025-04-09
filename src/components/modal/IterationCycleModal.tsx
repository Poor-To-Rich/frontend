import ModalDimmed from '@/components/modal/ModalDimmed';
import { ITERATION_CYCLE } from '@/constants/repeatSchedule';
import clsx from 'clsx';
import CheckIcon from '@/components/icon/CheckIcon';
import { CustomIterationType, IterationCycleValue } from '@/types/iterationTypes';
import useModal from '@/hooks/useModal';
import CustomIterationModal from '@/components/modal/CustomIterationModal';

interface Props {
  onClose: () => void;
  onClick: (value: IterationCycleValue) => void;
  iterationType: string;
}

const IterationCycleModal = ({ onClose, onClick, iterationType }: Props) => {
  const { isOpen, openModal, closeModal } = useModal();

  const customIteration: CustomIterationType = {
    type: 'weekly',
    interval: 2,
    daysOfWeek: ['월', '수', '금'],
    ends: {
      type: 'never',
    },
  };

  return (
    <ModalDimmed onClose={onClose}>
      {isOpen ? (
        <CustomIterationModal customIteration={customIteration} />
      ) : (
        <div className="w-[48%] min-w-fit">
          <div className="flex flex-col bg-white" onClick={e => e.stopPropagation()}>
            {ITERATION_CYCLE.map(({ label, value }, index) => (
              <button
                key={value}
                type="button"
                className={clsx(
                  'w-full flex items-center justify-between p-3.5 cursor-pointer',
                  (index !== 0 || index !== ITERATION_CYCLE.length - 1) && 'border-b border-strokeGray',
                )}
                onClick={() => {
                  onClick(value);
                  if (value === 'custom') openModal();
                }}>
                <span>{label}</span>
                {iterationType === value && <CheckIcon />}
              </button>
            ))}
          </div>
          <div className="w-full text-sm text-white p-2.5 text-center">
            반복데이터는 환경설정에서 관리할 수 있습니다.
          </div>
        </div>
      )}
    </ModalDimmed>
  );
};

export default IterationCycleModal;
