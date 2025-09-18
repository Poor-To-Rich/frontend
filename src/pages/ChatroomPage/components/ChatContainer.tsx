import { useEffect, useMemo, useRef } from 'react';
import NoticeSection from './notice/NoticeSection';
import ChatBody from './message/ChatBody';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import useGetChatroomMessageInfiniteQuery from '@/hooks/apis/chat/useGetChatroomMessageInfiniteQuery';
import useGetRecentNotice from '@/hooks/apis/notice/useGetRecentNotice';
import useChatScroll from '@/hooks/chat/useChatScroll';
import useInfiniteScroll from '@/hooks/scroll/useInfiniteScroll';
import { UsersMap } from '@/types/messageType';
import { ChatroomUserRoleRes } from '@/types/chatTypes';
import { CHATROOM_SCROLL_KEY } from '@/constants/storageKeys';

interface Props {
  chatroomId: string;
  scrollRef: React.RefObject<HTMLDivElement>;
  latestReadMessageId?: string | null;
  userRole?: ChatroomUserRoleRes;
}

const ChatContainer = ({ chatroomId, scrollRef, latestReadMessageId, userRole }: Props) => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isFetching, isPending } =
    useGetChatroomMessageInfiniteQuery(chatroomId);
  const { data: recentNotice } = useGetRecentNotice(chatroomId);

  const chatMessages = useMemo(() => {
    return [...(data?.pages ?? [])].reverse().flatMap(page => page.messages);
  }, [data]);

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
    latestReadMessageId,
  });

  useInfiniteScroll({ observerRef, hasNextPage, isFetchingNextPage, fetchNextPage });

  useEffect(() => {
    if (!data || isFetching || isFetchingNextPage) return;
    if (!hasNextPage) return;

    const allMessages = data.pages.flatMap(p => p.messages);

    const savedScrollId = sessionStorage.getItem(CHATROOM_SCROLL_KEY);
    const targetId = savedScrollId || latestReadMessageId;

    if (!targetId) return;

    const found = allMessages.some(msg => msg.messageId === Number(targetId));
    if (!found) {
      fetchNextPage();
    }
  }, [data, latestReadMessageId, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage]);

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
        <ChatBody
          chatroomId={chatroomId}
          myUserId={userRole.userId}
          messages={chatMessages}
          users={chatroomUsers}
          latestReadMessageId={latestReadMessageId}
        />
      )}
    </>
  );
};

export default ChatContainer;
