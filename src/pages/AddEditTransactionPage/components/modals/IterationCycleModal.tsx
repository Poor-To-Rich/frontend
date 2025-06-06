import ModalDimmed from '@/components/modal/ModalDimmed';
import { ITERATION_CYCLE } from '@/constants/repeatSchedule';
import { clsx } from 'clsx';
import CheckIcon from '@/components/icon/CheckIcon';
import { IterationCycleValue } from '@/types/iterationTypes';
import { useFormContext } from 'react-hook-form';
import { TransactionFormDataType } from '@/types/transactionTypes';
import { isMonthOfLastDay } from '@/utils/date';
import { useCalenderDateStore } from '@/stores/useCalenderDateStore';
import { useResetCustomIteration } from '@/hooks/useResetCustomIteration';
import { useEffect } from 'react';
import { merge } from 'lodash';

interface Props {
  onClose: () => void;
  onClick: (value: IterationCycleValue) => void;
}

const IterationCycleModal = ({ onClose, onClick }: Props) => {
  const { calenderDate } = useCalenderDateStore();
  const { customIteration } = useResetCustomIteration();
  const { getValues, setValue } = useFormContext<TransactionFormDataType>();
  const { iterationType, customIteration: prevCustomIteration } = getValues();
  const isEndOfMonth = isMonthOfLastDay(calenderDate);

  const FILTERED_ITERATION_CYCLE = isEndOfMonth
    ? ITERATION_CYCLE
    : ITERATION_CYCLE.filter(item => item.value !== 'endOfMonth');

  useEffect(() => {
    const merged = merge({}, customIteration, prevCustomIteration);

    setValue('customIteration', merged);
  }, []);

  return (
    <ModalDimmed onClose={onClose}>
      <div className="w-[48%] min-w-fit" data-testid="iteration-cycle-modal">
        <div className="flex flex-col bg-white" onClick={e => e.stopPropagation()}>
          {FILTERED_ITERATION_CYCLE.map(({ label, value }, index) => (
            <button
              key={value}
              data-testid={`${value}-button`}
              type="button"
              className={clsx(
                'w-full flex items-center justify-between p-3.5 cursor-pointer',
                (index !== 0 || index !== FILTERED_ITERATION_CYCLE.length - 1) && 'border-b border-strokeGray',
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
