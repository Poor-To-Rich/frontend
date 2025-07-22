import { DefaultButtonProps } from '@/types/propsTypes';

const NoticeOptionButton = ({ label, onClick }: DefaultButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full px-10 py-2 rounded-lg text-md whitespace-nowrap cursor-pointer border border-strokeGray bg-white text-defaultGrey">
      {label}
    </button>
  );
};

export default NoticeOptionButton;
