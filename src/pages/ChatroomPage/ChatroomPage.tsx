import ChatroomMenuButton from '@/components/button/icon/ChatroomMenuButton';
import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import DefaultHeader from '@/components/header/DefaultHeader';
import useGetChatroomDetails from '@/hooks/apis/chat/useGetChatroomDetails';
import useGetChatroomMessageInfiniteQuery from '@/hooks/apis/chat/useGetChatroomMessageInfiniteQuery';
import useGetChatroomUserRole from '@/hooks/apis/chat/useGetChatroomUserRole';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ChatBody from '@/pages/ChatroomPage/components/message/ChatBody';
import { UsersMap } from '@/types/messageType';
// import NoticeSection from '@/pages/ChatroomPage/components/notice/NoticeSection';
// import useGetRecentNotice from '@/hooks/apis/notice/useGetRecentNotice';
import { addOnConnect, stompClient } from '@/api/stomp';
import ChatActionBox from '@/pages/ChatroomPage/components/ChatActionBox';
import useChatScroll from '@/hooks/chat/useChatScroll';
import { StompSubscription } from '@stomp/stompjs';
import { usePrependMessageToFirstPage } from '@/hooks/chat/usePrependMessageToFirstPage';
import useMarkMessagesAsRead from '@/hooks/chat/useMarkMessagesAsRead';
import useUpdateUserProfileInCache from '@/hooks/chat/useUpdateUserProfileInCache';

const ChatroomPage = () => {
  const navigate = useNavigate();
  const { chatroomId } = useParams();
  const prependMessageToFirstPage = usePrependMessageToFirstPage();
  const markMessagesAsRead = useMarkMessagesAsRead();
  const updateUserProfileInCache = useUpdateUserProfileInCache();

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetChatroomMessageInfiniteQuery(chatroomId!);
  const { data: chatroomDetails } = useGetChatroomDetails(chatroomId!);
  const { data: userRole } = useGetChatroomUserRole(chatroomId!);
  // const { data: recentNotice } = useGetRecentNotice(chatroomId!);

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
    enabled: true,
  });

  useInfiniteScroll({ observerRef, hasNextPage, isFetchingNextPage, fetchNextPage });

  useEffect(() => {
    if (!chatroomId) return;

    let sub: StompSubscription | undefined;

    const subscribe = () => {
      sub = stompClient.subscribe(`/sub/chatroom/${chatroomId}`, message => {
        const msg = JSON.parse(message.body);
        console.log(msg);
        if (
          msg.type === 'CHAT_MESSAGE' ||
          msg.type === 'SYSTEM_MESSAGE' ||
          msg.type === 'RANKING_MESSAGE' ||
          msg.type === 'RANKING_STATUS_MESSAGE'
        ) {
          prependMessageToFirstPage(chatroomId, msg.payload);
        } else if (msg.type === 'MESSAGE_READ') {
          markMessagesAsRead(chatroomId, msg.payload.userId);
        } else if (msg.type === 'USER_UPDATED') {
          updateUserProfileInCache(chatroomId, msg.payload);
        }
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
  }, [chatroomId]);

  return (
    <div className="w-full min-h-screen flex flex-col relative">
      <DefaultHeader
        leftButton={<LeftArrowButton onClick={() => navigate(-1)} />}
        label={
          <p className="flex max-w-[20rem] items-center justify-center gap-1 font-medium">
            <span className="truncate">{chatroomDetails?.chatroomTitle}</span>
            <span className="shrink-0 text-defaultGrey">{chatroomDetails?.currentMemberCount}</span>
          </p>
        }
        rightButton={<ChatroomMenuButton />}
      />
      <div
        ref={scrollRef}
        className="w-full relative flex-grow overflow-y-auto h-[calc(100svh-118.3px)] custom-scrollbar">
        {/* {recentNotice && <NoticeSection {...recentNotice} />} */}
        {!isEmpty && hasNextPage && <div ref={observerRef} className="h-4" />}
        {userRole && <ChatBody myUserId={userRole.userId} messages={chatMessages} users={chatroomUsers} />}
      </div>
      <ChatActionBox chatroomId={Number(chatroomId)} isClosed={chatroomDetails?.isClosed} />
    </div>
  );
};

export default ChatroomPage;
