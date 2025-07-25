import CheckedCircleIcon from '@/components/icon/CheckedCircleIcon';
import DefaultCircleIcon from '@/components/icon/DefaultCircleIcon';
import clsx from 'clsx';

interface Props {
  isChecked?: boolean;
  onClick?: () => void;
  className?: string;
}

const CircleCheckBox = ({ isChecked, onClick, className }: Props) => {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={isChecked}
      onClick={onClick}
      className={clsx('flex items-center gap-2 cursor-pointer', className)}>
      {isChecked ? <CheckedCircleIcon /> : <DefaultCircleIcon />}
    </button>
  );
};

export default CircleCheckBox;
