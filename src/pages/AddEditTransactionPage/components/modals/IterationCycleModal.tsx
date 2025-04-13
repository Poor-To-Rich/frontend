import ModalDimmed from '@/components/modal/ModalDimmed';
import { ITERATION_CYCLE } from '@/constants/repeatSchedule';
import clsx from 'clsx';
import CheckIcon from '@/components/icon/CheckIcon';
import { IterationCycleValue } from '@/types/iterationTypes';
import { useFormContext } from 'react-hook-form';
import { TransactionFormData } from '@/types/transactionTypes';

interface Props {
  onClose: () => void;
  onClick: (value: IterationCycleValue) => void;
}

const IterationCycleModal = ({ onClose, onClick }: Props) => {
  const { getValues } = useFormContext<TransactionFormData>();
  const { iterationType } = getValues();

  return (
    <ModalDimmed onClose={onClose}>
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
              }}>
              <span>{label}</span>
              {iterationType === value && <CheckIcon />}
            </button>
          ))}
        </div>
        <div className="w-full text-sm text-white p-2.5 text-center">반복데이터는 환경설정에서 관리할 수 있습니다.</div>
      </div>
    </ModalDimmed>
  );
};

export default IterationCycleModal;
