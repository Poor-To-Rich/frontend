import clsx from 'clsx';
import { useState } from 'react';

const ChatroomViewModeToggle = () => {
  const [viewMode, setViewMode] = useState<'all' | 'joined'>('all');

  const options: { label: '전체' | '참여중인 채팅방'; value: 'all' | 'joined' }[] = [
    { label: '전체', value: 'all' },
    { label: '참여중인 채팅방', value: 'joined' },
  ];

  return (
    <div className="flex gap-4">
      {options.map(({ label, value }) => (
        <button
          onClick={() => setViewMode(value)}
          className={clsx(
            'px-5 py-2 border text-md rounded-4xl cursor-pointer',
            value === viewMode ? 'border-oliveGreen bg-oliveGreen text-white' : 'border-strokeGray bg-white text-black',
          )}>
          {label}
        </button>
      ))}
    </div>
  );
};

export default ChatroomViewModeToggle;
