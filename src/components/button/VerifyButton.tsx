import { VerifyButtonType } from '@/types/types';

interface Props {
  label: VerifyButtonType;
  onClick?: () => void;
}

const VerifyButton = ({ label, onClick }: Props) => {
  return (
    <button className="w-fit h-full border border-strokeGray rounded-lg text-md px-3 cursor-pointer" onClick={onClick}>
      {label}
    </button>
  );
};

export default VerifyButton;
