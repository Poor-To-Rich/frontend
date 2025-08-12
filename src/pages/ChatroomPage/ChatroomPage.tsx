import ChatroomMenuButton from '@/components/button/icon/ChatroomMenuButton';
import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import DefaultHeader from '@/components/header/DefaultHeader';
import useGetChatroomDetails from '@/hooks/apis/chat/useGetChatroomDetails';
import useGetChatroomMessageInfiniteQuery from '@/hooks/apis/chat/useGetChatroomMessageInfiniteQuery';
import useGetChatroomUserRole from '@/hooks/apis/chat/useGetChatroomUserRole';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ChatroomPage = () => {
  const navigate = useNavigate();
  const { chatroomId } = useParams();

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetChatroomMessageInfiniteQuery(chatroomId!);
  const { data: chatroomDetails } = useGetChatroomDetails(chatroomId!);
  const { data: userRole } = useGetChatroomUserRole(chatroomId!);
  const observerRef = useRef<HTMLDivElement | null>(null);

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

      {hasNextPage && <div ref={observerRef} className="h-4" />}
    </div>
  );
};

export default ChatroomPage;
