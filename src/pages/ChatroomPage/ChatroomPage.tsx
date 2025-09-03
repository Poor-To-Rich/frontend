import ChatroomMenuButton from '@/components/button/icon/ChatroomMenuButton';
import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import DefaultHeader from '@/components/header/DefaultHeader';
import useGetChatroomDetails from '@/hooks/apis/chat/useGetChatroomDetails';
import useGetChatroomMessageInfiniteQuery from '@/hooks/apis/chat/useGetChatroomMessageInfiniteQuery';
import useGetChatroomUserRole from '@/hooks/apis/chat/useGetChatroomUserRole';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ChatBody from '@/pages/ChatroomPage/components/message/ChatBody';
import { UsersMap } from '@/types/messageType';
import NoticeSection from '@/pages/ChatroomPage/components/notice/NoticeSection';
import useGetRecentNotice from '@/hooks/apis/notice/useGetRecentNotice';
import { addOnConnect, stompClient } from '@/api/stomp';
import ChatActionBox from '@/pages/ChatroomPage/components/ChatActionBox';
import useChatScroll from '@/hooks/chat/useChatScroll';
import { StompSubscription } from '@stomp/stompjs';
import { useHandleChatMessage } from '@/hooks/chat/useHandleChatMessage';
import useMarkMessagesAsRead from '@/hooks/chat/useMarkMessagesAsRead';

const ChatroomPage = () => {
  const navigate = useNavigate();
  const { chatroomId } = useParams();
  const [isChatDisabled, setIsChatDisabled] = useState<boolean>(false);
  const pendingReadsRef = useRef<number[]>([]);

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isSuccess } = useGetChatroomMessageInfiniteQuery(
    chatroomId!,
  );
  const { data: chatroomDetails } = useGetChatroomDetails(chatroomId!);
  const { data: userRole } = useGetChatroomUserRole(chatroomId!);
  const { data: recentNotice } = useGetRecentNotice(chatroomId!);
  const markMessagesAsRead = useMarkMessagesAsRead();
  const handleMessage = useHandleChatMessage(chatroomId!, setIsChatDisabled, userRole?.userId, isSuccess);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const chatMessages = [...(data?.pages?.flatMap(page => page.messages) || [])].reverse();
  const chatroomUsers =
    data?.pages.reduce((acc, page) => {
      return { ...acc, ...page.users };
    }, {} as UsersMap) ?? {};
  const isEmpty = chatMessages?.length === 0;

  useChatScroll({
    scrollRef,
    pages: data?.pages,
    messageDeps: [chatMessages],
    isFetchingNextPage,
    followThreshold: 150,
  });

  useInfiniteScroll({ observerRef, hasNextPage, isFetchingNextPage, fetchNextPage });

  useEffect(() => {
    if (!chatroomId || !userRole) return;

    let sub: StompSubscription | undefined;

    const subscribe = () => {
      sub = stompClient.subscribe(`/sub/chatroom/${chatroomId}`, message => {
        const msg = JSON.parse(message.body);

        if ((!isSuccess || !data) && msg.type === 'MESSAGE_READ') {
          pendingReadsRef.current.push(msg.payload.userId);
        }

        handleMessage(message);
      });

      stompClient.publish({
        destination: `/pub/chat/read`,
        body: JSON.stringify({ chatroomId }),
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
  }, [chatroomId, isSuccess]);

  useEffect(() => {
    if (isSuccess && data && pendingReadsRef.current.length > 0) {
      pendingReadsRef.current.forEach(userId => {
        markMessagesAsRead(chatroomId!, userId);
      });
      pendingReadsRef.current = [];
    }
  }, [isSuccess, data, chatroomId]);

  useEffect(() => {
    if (chatroomDetails?.isClosed || userRole?.chatroomRole === 'BANNED') {
      setIsChatDisabled(true);
    }
  }, [chatroomDetails, userRole]);

  return (
    <div className="w-full min-h-screen flex flex-col relative">
      <DefaultHeader
        leftButton={<LeftArrowButton onClick={() => navigate('/chat', { replace: true })} />}
        label={
          <p className="flex max-w-[20rem] items-center justify-center gap-1 font-medium">
            <span className="truncate">{chatroomDetails?.chatroomTitle}</span>
            <span className="shrink-0 text-defaultGrey">{chatroomDetails?.currentMemberCount}</span>
          </p>
        }
        rightButton={<ChatroomMenuButton onClick={() => navigate(`/chat/chatroom/${chatroomId}/detail`)} />}
      />
      <div
        ref={scrollRef}
        className="w-full relative flex-grow overflow-y-auto h-[calc(100svh-118.3px)] custom-scrollbar">
        {recentNotice && <NoticeSection {...recentNotice} />}
        {!isEmpty && hasNextPage && <div ref={observerRef} className="h-4" />}
        {chatroomId && userRole && (
          <ChatBody chatroomId={chatroomId} myUserId={userRole.userId} messages={chatMessages} users={chatroomUsers} />
        )}
      </div>
      <ChatActionBox chatroomId={Number(chatroomId)} isChatDisabled={isChatDisabled} scrollRef={scrollRef} />
    </div>
  );
};

export default ChatroomPage;
