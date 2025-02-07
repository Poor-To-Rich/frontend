import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import PlusButton from '@/components/button/icon/PlusButton';
import TrashButton from '@/components/button/icon/TrashButton';

interface Props {
  label: string;
  hasBackButton?: boolean;
  hasPlusButton?: boolean;
  hasTrashButton?: boolean;
}

const DefaultHeader = ({ label, hasBackButton, hasPlusButton, hasTrashButton }: Props) => {
  return (
    <header className="header-common">
      {hasBackButton && (
        <span className="absolute left-0 h-full aspect-square">
          <LeftArrowButton />
        </span>
      )}
      <span>{label}</span>
      {hasPlusButton && (
        <span className="absolute right-0 h-full aspect-square">
          <PlusButton />
        </span>
      )}
      {hasTrashButton && (
        <span className="absolute right-0 h-full aspect-square">
          <TrashButton />
        </span>
      )}
    </header>
  );
};

export default DefaultHeader;
