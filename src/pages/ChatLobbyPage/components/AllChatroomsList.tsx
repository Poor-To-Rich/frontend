import { ChatroomSortOptionValue } from '@/types/chatTypes';
import PublicChatroomItem from '@/components/chatroom/chat/PublicChatroomItem';
import useInfiniteScroll from '@/hooks/scroll/useInfiniteScroll';
import useAllChatroomsInfiniteQuery from '@/hooks/apis/chat/useAllChatroomsInfiniteQuery';
import { useRef } from 'react';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import { ALL_CHATROOM_SCROLL_KEY } from '@/constants/storageKeys';
import { useScrollRestore } from '@/hooks/scroll/useScrollRestore';

interface Props {
  sortOption: ChatroomSortOptionValue;
}

const AllChatroomsList = ({ sortOption }: Props) => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isPending, isSuccess } =
    useAllChatroomsInfiniteQuery(sortOption);

  const observerRef = useRef<HTMLLIElement | null>(null);
  const allChatrooms = data?.pages?.flatMap(page => page.chatrooms) || [];
  const isEmpty = allChatrooms?.length === 0;

  useInfiniteScroll({ observerRef, hasNextPage, isFetchingNextPage, fetchNextPage });
  useScrollRestore({
    storageKey: ALL_CHATROOM_SCROLL_KEY,
    isSuccess,
    isFetchingNextPage,
  });

  if (isPending || !data) {
    return (
      <div className="w-full flex flex-grow justify-center items-center">
        <LoadingSpinner size={30} />
      </div>
    );
  }

  return (
    <ul className="flex-grow flex flex-col gap-2.5 p-5">
      {isEmpty ? (
        <li className="flex-grow flex items-center justify-center text-defaultGrey">채팅방이 없습니다</li>
      ) : (
        allChatrooms.map(chatroom => (
          <li key={chatroom.chatroomId}>
            <PublicChatroomItem {...chatroom} />
          </li>
        ))
      )}
      {!isEmpty && hasNextPage && <li ref={observerRef} className="h-4" />}
    </ul>
  );
};

export default AllChatroomsList;
