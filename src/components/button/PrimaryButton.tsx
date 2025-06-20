import { clsx } from 'clsx';
import LoadingSpinner from '@/components/loading/LoadingSpinner';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  color?: string;
  isPending?: boolean;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button';
  onClick?: () => void;
}

const PrimaryButton = ({ label, color, isPending, disabled, onClick, type = 'button', ...rest }: Props) => {
  return (
    <button
      className={clsx(
        'w-fit min-w-[12rem] h-[3.6rem] flex justify-center items-center rounded-lg text-md cursor-pointer relative',
        disabled ? 'text-defaultGrey bg-strokeGray' : color ? color : 'bg-pastelLime text-oliveGreen',
      )}
      disabled={isPending || disabled}
      type={type}
      onClick={onClick}
      {...rest}>
      {isPending ? <LoadingSpinner size={20} /> : label}
    </button>
  );
};

export default PrimaryButton;
