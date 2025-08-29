import HelpIcon from '@/components/icon/HelpIcon';

interface Props {
  onClick?: () => void;
}

const HelpTooltipButton = ({ onClick }: Props) => {
  return (
    <button className="header-item-common" onClick={onClick}>
      <HelpIcon size={30} />
    </button>
  );
};

export default HelpTooltipButton;
