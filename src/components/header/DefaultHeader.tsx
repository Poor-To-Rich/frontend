import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import PlusButton from '@/components/button/icon/PlusButton';
import TrashButton from '@/components/button/icon/TrashButton';
import { useNavigate } from 'react-router-dom';

interface Props {
  label: string;
  hasBackButton?: boolean;
  hasPlusButton?: boolean;
  hasTrashButton?: boolean;
  onClick?: () => void;
}

const DefaultHeader = ({ label, hasBackButton, hasPlusButton, hasTrashButton, onClick }: Props) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <header className="header-common">
      {hasBackButton && (
        <span className="absolute left-0 h-full aspect-square">
          <LeftArrowButton onClick={handleBackClick} />
        </span>
      )}
      <span>{label}</span>
      {hasPlusButton && (
        <span className="absolute right-0 h-full aspect-square">
          <PlusButton onClick={onClick} />
        </span>
      )}
      {hasTrashButton && (
        <span className="absolute right-0 h-full aspect-square">
          <TrashButton onClick={onClick} />
        </span>
      )}
    </header>
  );
};

export default DefaultHeader;
