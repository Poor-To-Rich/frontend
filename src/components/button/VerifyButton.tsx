import { VerifyButtonType } from '@/types/types';

interface Props {
  label: VerifyButtonType;
  onClick?: () => void;
}

const VerifyButton = ({ label, onClick, ...rest }: Props & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className="w-fit h-full border border-strokeGray rounded-lg text-md px-3 cursor-pointer whitespace-nowrap"
      onClick={onClick}
      {...rest}>
      {label}
    </button>
  );
};

export default VerifyButton;
