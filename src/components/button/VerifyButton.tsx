import { VerifyButtonType } from '@/types/fieldType';
import LoadingSpinner from '@/components/loading/LoadingSpinner';

interface Props {
  label: VerifyButtonType;
  isPending?: boolean;
  onClick?: () => void;
}

const VerifyButton = ({
  label,
  isPending,
  onClick,
  ...rest
}: Props & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className="w-fit h-full border border-strokeGray rounded-lg text-md px-3 cursor-pointer whitespace-nowrap relative"
      disabled={isPending}
      onClick={onClick}
      {...rest}>
      <span className={isPending ? 'invisible' : 'visible'}>{label}</span>
      {isPending && (
        <span className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner color="#000000" size={15} />
        </span>
      )}
    </button>
  );
};

export default VerifyButton;
