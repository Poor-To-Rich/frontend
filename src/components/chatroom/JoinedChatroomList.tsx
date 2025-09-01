import { addOnConnect, stompClient } from '@/api/stomp';
import JoinedChatroomItem from '@/components/chatroom/chat/JoinedChatroomItem';
import useGetUserDetails from '@/hooks/apis/auth/useGetUserDetails';
import useJoinedChatroomsInfiniteQuery from '@/hooks/apis/chat/useJoinedChatroomsInfiniteQuery';
import useHandleUpdateJoinedChatroom from '@/hooks/chat/useHandleUpdateJoinedChatroom';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { StompSubscription } from '@stomp/stompjs';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  isEditMode?: boolean;
  selectedChatrooms?: { id: number; isHost: boolean }[];
  handleSelectChatroom?: (id: number, isHost: boolean) => void;
}

const JoinedChatroomList = ({ isEditMode, selectedChatrooms, handleSelectChatroom }: Props) => {
  const navigate = useNavigate();
  const { data: userDetail } = useGetUserDetails();
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useJoinedChatroomsInfiniteQuery();

  const observerRef = useRef<HTMLLIElement | null>(null);
  const joinedChatrooms = data?.pages?.flatMap(page => page.chatrooms) || [];
  const isEmpty = joinedChatrooms?.length === 0;

  const handleUpdatedJoinedChatroom = useHandleUpdateJoinedChatroom();

  useInfiniteScroll({ observerRef, hasNextPage, isFetchingNextPage, fetchNextPage });

  useEffect(() => {
    if (!userDetail?.userId) return;

    let sub: StompSubscription | undefined;

    const subscribe = () => {
      sub = stompClient.subscribe(`/sub/chat/summary/${userDetail.userId}`, res => {
        const response = JSON.parse(res.body);
        console.log(response);
        handleUpdatedJoinedChatroom(response.payload);
      });
    };

    // 1) 이미 연결돼 있으면 즉시 한 번 실행
    if (stompClient.connected) subscribe();

    // 2) 앞으로 "연결/재연결"될 때마다 다시 실행하도록 리스너 등록
    const off = addOnConnect(subscribe);

    // 언마운트 시 정리
    return () => {
      off();
      sub?.unsubscribe();
    };
  }, [userDetail]);

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
              else navigate(`/chat/chatroom/${chatroom.chatroomId}`);
            }}
          />
        </motion.li>
      ))}
      {!isEmpty && hasNextPage && <li ref={observerRef} className="h-4" />}
    </ul>
  );
};

export default JoinedChatroomList;
