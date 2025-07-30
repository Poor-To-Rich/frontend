import JoinedChatroomItem from '@/components/chatroom/chat/JoinedChatroomItem';
import useJoinedChatroomsInfiniteQuery from '@/hooks/apis/chat/useJoinedChatroomsInfiniteQuery';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useRef } from 'react';

const JoinedChatroomList = () => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useJoinedChatroomsInfiniteQuery();

  const observerRef = useRef<HTMLDivElement | null>(null);
  const joinedChatrooms = data?.pages?.flatMap(page => page.chatrooms) || [];
  const isEmpty = joinedChatrooms?.length === 0;

  useInfiniteScroll({ observerRef, hasNextPage, isFetchingNextPage, fetchNextPage });

  return (
    <div className="flex-grow flex flex-col gap-5 pt-7">
      {joinedChatrooms.map(chatroom => (
        <JoinedChatroomItem {...chatroom} />
      ))}
      {!isEmpty && hasNextPage && <div ref={observerRef} className="h-4" />}
    </div>
  );
};

export default JoinedChatroomList;
