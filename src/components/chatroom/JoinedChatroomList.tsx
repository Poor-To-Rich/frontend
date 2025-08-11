import JoinedChatroomItem from '@/components/chatroom/chat/JoinedChatroomItem';
import useJoinedChatroomsInfiniteQuery from '@/hooks/apis/chat/useJoinedChatroomsInfiniteQuery';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  isEditMode?: boolean;
  selectedChatrooms?: { id: number; isHost: boolean }[];
}

const JoinedChatroomList = ({ isEditMode, selectedChatrooms }: Props) => {
  const navigate = useNavigate();
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useJoinedChatroomsInfiniteQuery();

  const observerRef = useRef<HTMLDivElement | null>(null);
  const joinedChatrooms = data?.pages?.flatMap(page => page.chatrooms) || [];
  const isEmpty = joinedChatrooms?.length === 0;

  useInfiniteScroll({ observerRef, hasNextPage, isFetchingNextPage, fetchNextPage });

  return (
    <div className="flex flex-col flex-grow gap-5 px-7 py-4">
      {isEmpty ? (
        <div className="flex-grow flex items-center justify-center text-defaultGrey">참여중인 채팅방이 없습니다</div>
      ) : (
        joinedChatrooms.map(chatroom => (
          <JoinedChatroomItem
            key={chatroom.chatroomId}
            {...chatroom}
            isEditMode={isEditMode}
            isChecked={selectedChatrooms?.some(room => room.id === chatroom.chatroomId)}
            onClick={() => navigate(`/chat/chatroom/${chatroom.chatroomId}`)}
          />
        ))
      )}

      {!isEmpty && hasNextPage && <div ref={observerRef} className="h-4" />}
    </div>
  );
};

export default JoinedChatroomList;
