import { DefaultButtonProps } from '@/types/propsTypes';
import clsx from 'clsx';

const UtilityButton = ({ label, className, onClick }: DefaultButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'px-10 py-1.5 whitespace-nowrap cursor-pointer rounded-lg text-md',
        label === '신고하기' ? 'bg-pinkRed text-sunsetRose' : 'border border-strokeGray bg-white text-defaultGrey',
        className,
      )}
      type="button">
      {label}
    </button>
  );
};

export default UtilityButton;
