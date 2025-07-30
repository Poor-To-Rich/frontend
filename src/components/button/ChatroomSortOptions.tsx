import { ChatroomSortOptionValue } from '@/types/chatTypes';
import clsx from 'clsx';

interface Props {
  sortOption: ChatroomSortOptionValue;
  onClick: (value: ChatroomSortOptionValue) => void;
}

const ChatroomSortOptions = ({ sortOption, onClick }: Props) => {
  const options: { label: '인기순' | '최근 생성순' | '좋아요순'; value: ChatroomSortOptionValue }[] = [
    { label: '인기순', value: 'popularity' },
    { label: '최근 생성순', value: 'createdAt' },
    { label: '좋아요순', value: 'likes' },
  ];

  return (
    <div className="flex gap-5 mx-7">
      {options.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => onClick(value)}
          className={clsx('py-2 text-md cursor-pointer', value === sortOption ? 'text-black' : 'text-defaultGrey')}>
          {label}
        </button>
      ))}
    </div>
  );
};

export default ChatroomSortOptions;
