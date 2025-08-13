import ChatroomMenuButton from '@/components/button/icon/ChatroomMenuButton';
import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import DefaultHeader from '@/components/header/DefaultHeader';
import useGetChatroomDetails from '@/hooks/apis/chat/useGetChatroomDetails';
import useGetChatroomMessageInfiniteQuery from '@/hooks/apis/chat/useGetChatroomMessageInfiniteQuery';
import useGetChatroomUserRole from '@/hooks/apis/chat/useGetChatroomUserRole';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NoticeSection from '@/pages/ChatroomPage/components/notice/NoticeSection';
import ChatBody from '@/pages/ChatroomPage/components/message/ChatBody';
import { UsersMap } from '@/types/messageType';
import useGetRecentNotice from '@/hooks/apis/notice/useGetRecentNotice';

const ChatroomPage = () => {
  const navigate = useNavigate();
  const { chatroomId } = useParams();

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetChatroomMessageInfiniteQuery(chatroomId!);
  const { data: chatroomDetails } = useGetChatroomDetails(chatroomId!);
  const { data: userRole } = useGetChatroomUserRole(chatroomId!);
  const { data: recentNotice } = useGetRecentNotice(chatroomId!);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const chatMessages = data?.pages?.flatMap(page => page.messages) || [];
  const chatroomUsers =
    data?.pages.reduce((acc, page) => {
      return { ...acc, ...page.users };
    }, {} as UsersMap) ?? {};
  const isEmpty = chatMessages?.length === 0;

  useInfiniteScroll({ observerRef, hasNextPage, isFetchingNextPage, fetchNextPage });

  return (
    <div>
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
      <div className="w-full relative h-screen overflow-y-auto">
        {recentNotice && <NoticeSection {...recentNotice} />}
        {userRole && <ChatBody myUserId={userRole.userId} messages={chatMessages} users={chatroomUsers} />}
        {!isEmpty && hasNextPage && <div ref={observerRef} className="h-4" />}
      </div>
    </div>
  );
};

export default ChatroomPage;
