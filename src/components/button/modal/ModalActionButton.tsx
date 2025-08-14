import { DefaultButtonProps } from '@/types/propsTypes';

const ModalActionButton = ({ label, onClick, type = 'button' }: DefaultButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full py-2 px-4 rounded-lg text-md bg-lightBlue text-oceanBlue cursor-pointer`}>
      {label}
    </button>
  );
};

export default ModalActionButton;
