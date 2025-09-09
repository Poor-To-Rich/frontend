import JoinedChatroomItem from '@/components/chatroom/chat/JoinedChatroomItem';
import useJoinedChatroomsInfiniteQuery from '@/hooks/apis/chat/useJoinedChatroomsInfiniteQuery';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { joinedChatroomsQueryKey } from '@/constants/queryKeys';
import { JoinedChatroomsRes } from '@/types/chatTypes';

interface Props {
  isEditMode?: boolean;
  selectedChatrooms?: { id: number; isHost: boolean }[];
  handleSelectChatroom?: (id: number, isHost: boolean) => void;
}

const JoinedChatroomList = ({ isEditMode, selectedChatrooms, handleSelectChatroom }: Props) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const observerRef = useRef<HTMLLIElement | null>(null);

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isPending } = useJoinedChatroomsInfiniteQuery();

  const joinedChatrooms = data?.pages?.flatMap(page => page.chatrooms) || [];
  const isEmpty = joinedChatrooms?.length === 0;

  const handleEnterChatroom = (chatroomId: number) => {
    queryClient.setQueryData(joinedChatroomsQueryKey, (oldData: InfiniteData<JoinedChatroomsRes> | undefined) => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        pages: oldData.pages.map(page => ({
          ...page,
          chatrooms: page.chatrooms.map(chatroom =>
            chatroom.chatroomId === chatroomId ? { ...chatroom, unreadMessageCount: 0 } : chatroom,
          ),
        })),
      };
    });
  };

  useInfiniteScroll({ observerRef, hasNextPage, isFetchingNextPage, fetchNextPage });

  if (isPending || !data) {
    return (
      <div className="w-full flex flex-grow justify-center items-center">
        <LoadingSpinner size={30} />
      </div>
    );
  }

  return (
    <ul className="flex flex-col flex-grow gap-5 px-7 py-4">
      {joinedChatrooms.map(chatroom => (
        <motion.li key={chatroom.chatroomId} layout>
          <JoinedChatroomItem
            {...chatroom}
            isEditMode={isEditMode}
            isChecked={selectedChatrooms?.some(room => room.id === chatroom.chatroomId)}
            onClick={() => {
              if (isEditMode && handleSelectChatroom) handleSelectChatroom(chatroom.chatroomId, chatroom.isHost);
              else {
                navigate(`/chat/chatroom/${chatroom.chatroomId}`);
                handleEnterChatroom(chatroom.chatroomId);
              }
            }}
          />
        </motion.li>
      ))}
      {!isEmpty && hasNextPage && <li ref={observerRef} className="h-4" />}
    </ul>
  );
};

export default JoinedChatroomList;
