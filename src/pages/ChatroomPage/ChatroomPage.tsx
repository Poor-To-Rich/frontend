import ChatroomMenuButton from '@/components/button/icon/ChatroomMenuButton';
import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import DefaultHeader from '@/components/header/DefaultHeader';
import ChatActionBox from '@/pages/ChatroomPage/components/ChatActionBox';
import PageErrorBoundary from '@/components/error/PageErrorBoundary';
import ChatContainer from '@/pages/ChatroomPage/components/ChatContainer';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import useGetChatroomDetails from '@/hooks/apis/chat/useGetChatroomDetails';
import useGetChatroomUserRole from '@/hooks/apis/chat/useGetChatroomUserRole';
import { useChatroomSubscription } from '@/hooks/chat/useChatroomSubscription';
import { handleFetchError } from '@/utils/error/handleFetchError';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import FetchErrorBoundary from '@/components/error/FetchErrorBoundary';
import useKickUserMessageRead from '@/hooks/apis/chat/useKickUserMessageRead';
import { useSearchParams } from 'react-router-dom';
import clsx from 'clsx';
import { isIOSPWA } from '@/utils/deviceUtils';

const ChatroomPage = () => {
  const navigate = useNavigate();
  const { chatroomId } = useParams<{ chatroomId: string }>();
  const [searchParams] = useSearchParams();
  const latestReadMessageId = searchParams.get('latestReadMessageId');
  const [isChatDisabled, setIsChatDisabled] = useState(false);

  const {
    data: chatroomDetails,
    error: chatroomDetailError,
    isError: isChatroomDetailError,
    isPending: isChatroomDetailPending,
  } = useGetChatroomDetails(chatroomId!);
  const { data: userRole, error: userRoleError, isError: isUserRoleError } = useGetChatroomUserRole(chatroomId!);
  const { mutate: kickUserMessageRead } = useKickUserMessageRead(chatroomId!, userRole?.userId);

  const scrollRef = useRef<HTMLDivElement>(null);

  useChatroomSubscription(chatroomId!, userRole, setIsChatDisabled);

  useEffect(() => {
    if (chatroomDetails?.isClosed || userRole?.chatroomRole === 'BANNED') {
      if (userRole?.chatroomRole === 'BANNED') {
        kickUserMessageRead();
      }
      setIsChatDisabled(true);
    }
  }, [chatroomDetails, userRole, kickUserMessageRead]);

  if (isChatroomDetailError || isUserRoleError) {
    return handleFetchError(chatroomDetailError || userRoleError);
  }

  return (
    <div className="w-full min-h-screen flex flex-col relative">
      {isChatroomDetailPending ? (
        <div className="w-full flex flex-grow justify-center items-center">
          <LoadingSpinner size={30} />
        </div>
      ) : (
        <PageErrorBoundary>
          <FetchErrorBoundary>
            <DefaultHeader
              leftButton={
                <LeftArrowButton
                  onClick={() => {
                    navigate('/chat', { replace: true });
                    sessionStorage.removeItem('keyword');
                  }}
                />
              }
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
              className={clsx(
                'w-full relative flex-grow overflow-y-auto custom-scrollbar',
                isIOSPWA ? 'h-[calc(100svh-148.3px)]' : 'h-[calc(100svh-118.3px)]',
              )}>
              <ChatContainer
                chatroomId={chatroomId!}
                scrollRef={scrollRef}
                userRole={userRole}
                latestReadMessageId={latestReadMessageId}
              />
            </div>
            <ChatActionBox chatroomId={Number(chatroomId)} isChatDisabled={isChatDisabled} scrollRef={scrollRef} />
          </FetchErrorBoundary>
        </PageErrorBoundary>
      )}
    </div>
  );
};

export default ChatroomPage;
