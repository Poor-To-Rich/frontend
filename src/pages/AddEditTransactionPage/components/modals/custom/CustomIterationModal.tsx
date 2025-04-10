import IterationEndOptionSelector from './selector/IterationEndOptionSelector';
import PrimaryButton from '@/components/button/PrimaryButton';
import IterationInterval from './IterationInterval';
import DayOfWeekSelector from './selector/DayOfWeekSelector';
import MonthlyOptionSelector from './selector/MonthlyOptionSelector';
import { useFormContext, useWatch } from 'react-hook-form';
import IterationTypeSelector from './selector/IterationTypeSelector';

interface Props {
  closeModal: () => void;
}

const CustomIterationModal = ({ closeModal }: Props) => {
  const { control, setValue } = useFormContext();
  const type = useWatch({ control, name: 'customIteration.type' });

  return (
    <div className="w-[85%] min-h-[350px] bg-white py-10 px-5" onClick={e => e.stopPropagation()}>
      <IterationTypeSelector type={type} setValue={setValue} />
      <div className="flex flex-col gap-10">
        <IterationInterval type={type} />
        {type === 'monthly' && <MonthlyOptionSelector day={16} weekday="두 번째 화요일" />}
        {type === 'weekly' && <DayOfWeekSelector />}
        <IterationEndOptionSelector />
      </div>
      <div className="flex w-full mt-10 justify-around gap-7">
        <PrimaryButton label="취소" onClick={closeModal} />
        <PrimaryButton label="저장" />
      </div>
    </div>
  );
};

export default CustomIterationModal;
