import clsx from 'clsx';
import { useState } from 'react';

const ChatroomSortOptions = () => {
  const [sortOption, setSortOption] = useState<'likes' | 'createdAt' | 'popularity'>('createdAt');

  const options: { label: '인기순' | '최근 생성순' | '좋아요순'; value: 'likes' | 'createdAt' | 'popularity' }[] = [
    { label: '인기순', value: 'popularity' },
    { label: '최근 생성순', value: 'createdAt' },
    { label: '좋아요순', value: 'likes' },
  ];

  return (
    <div className="flex gap-5">
      {options.map(({ label, value }) => (
        <button
          onClick={() => setSortOption(value)}
          className={clsx('py-2 text-md cursor-pointer', value === sortOption ? 'text-black' : 'text-defaultGrey')}>
          {label}
        </button>
      ))}
    </div>
  );
};

export default ChatroomSortOptions;
