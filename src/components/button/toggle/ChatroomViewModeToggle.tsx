import { ChatroomViewModeValue } from '@/types/chatTypes';
import clsx from 'clsx';

interface Props {
  viewMode: ChatroomViewModeValue;
  onClick: (value: ChatroomViewModeValue) => void;
}

const ChatroomViewModeToggle = ({ viewMode, onClick }: Props) => {
  const options: { label: '전체' | '참여중인 채팅방'; value: ChatroomViewModeValue }[] = [
    { label: '전체', value: 'all' },
    { label: '참여중인 채팅방', value: 'joined' },
  ];

  return (
    <div className="flex gap-4">
      {options.map(({ label, value }) => (
        <button
          onClick={() => onClick(value)}
          className={clsx(
            'px-5 py-1 border text-md rounded-4xl cursor-pointer',
            value === viewMode ? 'border-oliveGreen bg-oliveGreen text-white' : 'border-strokeGray bg-white text-black',
          )}>
          {label}
        </button>
      ))}
    </div>
  );
};

export default ChatroomViewModeToggle;
