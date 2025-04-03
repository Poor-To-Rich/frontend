import SortDownIcon from '@/components/icon/SortDownIcon';
import SortUpIcon from '@/components/icon/SortUpIcon';

interface Props {
  isDescending: boolean;
  onClick: () => void;
}

const SortingButton = ({ isDescending, onClick }: Props) => {
  return (
    <button onClick={onClick} className="h-full aspect-square cursor-pointer flex items-center justify-center">
      {isDescending ? <SortDownIcon /> : <SortUpIcon />}
    </button>
  );
};

export default SortingButton;
