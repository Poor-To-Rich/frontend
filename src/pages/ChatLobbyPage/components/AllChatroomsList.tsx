import { ChatroomSortOptionValue } from '@/types/chatTypes';
import PublicChatroomItem from '@/components/chatroom/chat/PublicChatroomItem';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useAllChatroomsInfiniteQuery from '@/hooks/apis/chat/useAllChatroomsInfiniteQuery';
import { useRef } from 'react';

interface Props {
  sortOption: ChatroomSortOptionValue;
}

const AllChatroomsList = ({ sortOption }: Props) => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useAllChatroomsInfiniteQuery(sortOption);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const allChatrooms = data?.pages?.flatMap(page => page.chatrooms) || [];
  const isEmpty = allChatrooms?.length === 0;

  useInfiniteScroll({ observerRef, hasNextPage, isFetchingNextPage, fetchNextPage });

  return (
    <div className="flex-grow flex flex-col gap-2.5 pt-5">
      {allChatrooms.map(chatroom => (
        <PublicChatroomItem key={chatroom.chatroomId} {...chatroom} />
      ))}
      {!isEmpty && hasNextPage && <div ref={observerRef} className="h-4" />}
    </div>
  );
};

export default AllChatroomsList;
