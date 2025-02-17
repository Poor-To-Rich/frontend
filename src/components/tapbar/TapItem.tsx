import { TapBarType } from '@/types/types';
import clsx from 'clsx';

interface Props {
  currentTap: TapBarType;
  targetTap: TapBarType;
  icon: React.ReactNode;
  onClick: (value: TapBarType) => void;
}

const TapItem = ({ currentTap, targetTap, icon, onClick }: Props) => {
  return (
    <button
      onClick={() => onClick(targetTap)}
      className={clsx(
        currentTap === targetTap ? 'text-oliveGreen' : 'text-black',
        'flex items-center justify-center h-full aspect-square',
      )}>
      {icon}
    </button>
  );
};

export default TapItem;
