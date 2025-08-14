import clsx from 'clsx';

interface Props {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

const LabelButton = ({ label, disabled, onClick }: Props) => {
  return (
    <button
      className={clsx(disabled ? 'text-defaultGrey' : 'text-black', 'header-item-common')}
      disabled={disabled}
      onClick={onClick}>
      {label}
    </button>
  );
};

export default LabelButton;
