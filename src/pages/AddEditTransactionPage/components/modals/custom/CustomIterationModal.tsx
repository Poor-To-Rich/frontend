import IterationEndOptionSelector from './selector/IterationEndOptionSelector';
import PrimaryButton from '@/components/button/PrimaryButton';
import IterationInterval from './IterationInterval';
import DayOfWeekSelector from './selector/DayOfWeekSelector';
import MonthlyOptionSelector from './selector/MonthlyOptionSelector';
import { useFormContext, useWatch } from 'react-hook-form';
import IterationTypeSelector from './selector/IterationTypeSelector';
import ModalDimmed from '@/components/modal/ModalDimmed';
import { CustomIterationType } from '@/types/iterationTypes';

interface Props {
  closeIteration: () => void;
  closeCustom: () => void;
  backUpCustomIteration: CustomIterationType;
}

const CustomIterationModal = ({ closeIteration, closeCustom, backUpCustomIteration }: Props) => {
  const { control, setValue } = useFormContext();
  const type = useWatch({ control, name: 'customIteration.iterationRule.type' });

  const handleCancel = () => {
    setValue('customIteration', backUpCustomIteration);
    closeCustom();
  };

  const handleSave = () => {
    setValue('iterationType', 'custom');
    closeIteration();
    closeCustom();
  };

  return (
    <ModalDimmed>
      <div className="w-[85%] min-h-[350px] bg-white py-10 px-5" onClick={e => e.stopPropagation()}>
        <IterationTypeSelector type={type} />
        <div className="flex flex-col gap-10">
          <IterationInterval type={type} />
          {type === 'weekly' && <DayOfWeekSelector />}
          {type === 'monthly' && <MonthlyOptionSelector />}
          <IterationEndOptionSelector />
        </div>
        <div className="flex w-full mt-10 justify-around gap-7">
          <PrimaryButton label="취소" onClick={handleCancel} />
          <PrimaryButton label="저장" onClick={handleSave} />
        </div>
      </div>
    </ModalDimmed>
  );
};

export default CustomIterationModal;
