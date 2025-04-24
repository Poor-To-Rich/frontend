import clsx from 'clsx';
import LoadingSpinner from '@/components/loading/LoadingSpinner';

interface Props {
  label: string;
  isPending?: boolean;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button';
  onClick?: () => void;
}

const PrimaryButton = ({ label, isPending, disabled, onClick, type = 'button' }: Props) => {
  return (
    <button
      className={clsx(
        'w-fit min-w-[12rem] h-[3.6rem] flex justify-center items-center rounded-lg text-md cursor-pointer relative',
        disabled ? 'text-defaultGrey bg-strokeGray' : 'bg-pastelLime text-oliveGreen',
      )}
      disabled={disabled}
      type={type}
      onClick={onClick}>
      {isPending ? <LoadingSpinner size={20} /> : label}
    </button>
  );
};

export default PrimaryButton;
