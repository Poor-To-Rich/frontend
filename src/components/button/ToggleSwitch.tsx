import useUpdateCategoryVisibility from '@/hooks/apis/category/useUpdateCategoryVisibility';
import { IncomeExpenseType } from '@/types/transactionTypes';
import { clsx } from 'clsx';

interface Props {
  id: string;
  visibility: boolean;
  type: IncomeExpenseType;
}

const ToggleSwitch = ({ id, visibility, type }: Props) => {
  const { mutate: updateVisibility } = useUpdateCategoryVisibility({ type });

  const handleToggleClick = () => {
    updateVisibility({ id, body: { visibility: !visibility } });
  };

  return (
    <button
      className={clsx(
        'w-[5.3rem] h-[2.5rem] rounded-4xl relative cursor-pointer',
        visibility ? 'bg-oliveGreen' : 'bg-strokeGray',
      )}
      onClick={handleToggleClick}>
      <div
        className={clsx(
          'w-[1.6rem] aspect-square rounded-full absolute top-1/2 -translate-y-1/2 bg-white',
          visibility ? 'right-2' : 'left-2',
        )}
      />
    </button>
  );
};

export default ToggleSwitch;
