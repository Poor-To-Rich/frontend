import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import PlusButton from '@/components/button/icon/PlusButton';
import TrashButton from '@/components/button/icon/TrashButton';
import { useDraftStore } from '@/stores/useDraftStore';
import clsx from 'clsx';
import { useLocation, useNavigate } from 'react-router-dom';

interface Props {
  label?: string;
  bgColor?: string;
  hasBackButton?: boolean;
  hasPlusButton?: boolean;
  hasTrashButton?: boolean;
  resetCalenderDate?: () => void;
  onClick?: () => void;
}

const DefaultHeader = ({
  label,
  bgColor,
  hasBackButton,
  hasPlusButton,
  hasTrashButton,
  resetCalenderDate,
  onClick,
}: Props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { disableSave } = useDraftStore();

  const handleBackClick = () => {
    if ((pathname === '/add-transaction' || pathname === '/edit-transaction') && resetCalenderDate) {
      disableSave();
      sessionStorage.removeItem('transaction-form-data');
      resetCalenderDate();
    }
    navigate(-1);
  };

  return (
    <header className={clsx(bgColor, 'header-common')}>
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
