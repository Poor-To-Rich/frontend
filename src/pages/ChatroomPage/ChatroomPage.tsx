import ChatroomMenuButton from '@/components/button/icon/ChatroomMenuButton';
import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import DefaultHeader from '@/components/header/DefaultHeader';
import useGetChatroomDetails from '@/hooks/apis/chat/useGetChatroomDetails';
import useGetChatroomMessageInfiniteQuery from '@/hooks/apis/chat/useGetChatroomMessageInfiniteQuery';
import useGetChatroomUserRole from '@/hooks/apis/chat/useGetChatroomUserRole';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ChatBody from '@/pages/ChatroomPage/components/message/ChatBody';
import { UsersMap } from '@/types/messageType';
import NoticeSection from '@/pages/ChatroomPage/components/notice/NoticeSection';
import useGetRecentNotice from '@/hooks/apis/notice/useGetRecentNotice';
import { stompClient } from '@/api/stomp';
import ChatActionBox from '@/pages/ChatroomPage/components/ChatActionBox';
import useChatScroll from '@/hooks/chat/useChatScroll';

const ChatroomPage = () => {
  const navigate = useNavigate();
  const { chatroomId } = useParams();

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

  useEffect(() => {
    stompClient.onConnect = () => {
      stompClient.subscribe(`/sub/chatroom/${chatroomId}`, message => {
        console.log('📩 받은 메시지:', message.body);
      });
    };

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, [chatroomId]);

  useInfiniteScroll({ observerRef, hasNextPage, isFetchingNextPage, fetchNextPage });

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
        className="w-full relative flex-grow overflow-y-auto h-[calc(100svh-92.3px)] custom-scrollbar">
        {/* {recentNotice && <NoticeSection {...recentNotice} />} */}
        {!isEmpty && hasNextPage && <div ref={observerRef} className="h-4" />}
        {userRole && <ChatBody myUserId={userRole.userId} messages={chatMessages} users={chatroomUsers} />}
      </div>
      <ChatActionBox chatroomId={Number(chatroomId)} />
    </div>
  );
};

export default ChatroomPage;
