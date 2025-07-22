import { DefaultButtonProps } from '@/types/propsTypes';
import clsx from 'clsx';

const UtilityButton = ({ label, onClick }: DefaultButtonProps) => {
  const className = clsx(
    'w-fit px-10 py-1.5 whitespace-nowrap cursor-pointer rounded-lg text-md',
    label === '신고하기' ? 'bg-pinkRed text-sunsetRose' : 'border border-strokeGray bg-white text-defaultGrey',
  );

  return (
    <button onClick={onClick} className={className} type="button">
      {label}
    </button>
  );
};

export default UtilityButton;
