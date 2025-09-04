// src/pages/ChatroomPage/components/ChatContainer.tsx
import { useMemo, useRef } from 'react';
import NoticeSection from './notice/NoticeSection';
import ChatBody from './message/ChatBody';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import useGetChatroomMessageInfiniteQuery from '@/hooks/apis/chat/useGetChatroomMessageInfiniteQuery';
import useGetChatroomUserRole from '@/hooks/apis/chat/useGetChatroomUserRole';
import useGetRecentNotice from '@/hooks/apis/notice/useGetRecentNotice';
import useChatScroll from '@/hooks/chat/useChatScroll';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { UsersMap } from '@/types/messageType';

interface Props {
  chatroomId: string;
  scrollRef: React.RefObject<HTMLDivElement>;
}

const ChatContainer = ({ chatroomId, scrollRef }: Props) => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isPending } =
    useGetChatroomMessageInfiniteQuery(chatroomId);
  const { data: userRole } = useGetChatroomUserRole(chatroomId);
  const { data: recentNotice } = useGetRecentNotice(chatroomId);

  const chatMessages = useMemo(() => (data?.pages?.flatMap(page => page.messages) || []).slice().reverse(), [data]);

  const chatroomUsers = useMemo(
    () =>
      data?.pages?.reduce((acc, page) => {
        return { ...acc, ...page.users };
      }, {} as UsersMap) ?? {},
    [data],
  );

  const isEmpty = chatMessages.length === 0;

  const observerRef = useRef<HTMLDivElement | null>(null);

  useChatScroll({
    scrollRef,
    pages: data?.pages,
    messageDeps: [chatMessages],
    isFetchingNextPage,
    followThreshold: 150,
  });

  useInfiniteScroll({ observerRef, hasNextPage, isFetchingNextPage, fetchNextPage });

  if (isPending) {
    return (
      <div className="w-full flex h-full justify-center items-center">
        <LoadingSpinner size={30} />
      </div>
    );
  }

  return (
    <>
      {recentNotice && <NoticeSection {...recentNotice} />}
      {!isEmpty && hasNextPage && <div ref={observerRef} className="h-4" />}
      {chatroomId && userRole && (
        <ChatBody chatroomId={chatroomId} myUserId={userRole.userId} messages={chatMessages} users={chatroomUsers} />
      )}
    </>
  );
};

export default ChatContainer;
