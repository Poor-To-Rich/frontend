import clsx from 'clsx';

interface Props {
  label: string;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button';
  onClick?: () => void;
}

const PrimaryButton = ({ label, disabled, onClick, type = 'button' }: Props) => {
  return (
    <button
      className={clsx(
        'w-fit min-w-[12rem] h-[3.6rem] rounded-lg text-md cursor-pointer',
        disabled ? 'text-defaultGrey bg-strokeGray' : 'bg-pastelLime text-oliveGreen',
      )}
      disabled={disabled}
      type={type}
      onClick={onClick}>
      {label}
    </button>
  );
};

export default PrimaryButton;
