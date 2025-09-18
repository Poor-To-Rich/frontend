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
import { CHATROOM_SCROLL_KEY } from '@/constants/storageKeys';

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

  const handleSaveScrollPosition = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const items = container.querySelectorAll<HTMLElement>('[data-message-id]');

    const parentRect = container.getBoundingClientRect();
    let topVisibleId: string | null = null;

    items.forEach(item => {
      const rect = item.getBoundingClientRect();
      const isVisible = rect.bottom > parentRect.top && rect.top < parentRect.bottom;

      if (isVisible) {
        const id = item.dataset.messageId!;
        if (!topVisibleId) topVisibleId = id;
      }
    });

    sessionStorage.setItem(CHATROOM_SCROLL_KEY, String(topVisibleId));
  };

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
                    sessionStorage.removeItem(CHATROOM_SCROLL_KEY);
                  }}
                />
              }
              label={
                <p className="flex max-w-[20rem] items-center justify-center gap-1 font-medium">
                  <span className="truncate">{chatroomDetails?.chatroomTitle}</span>
                  <span className="shrink-0 text-defaultGrey">{chatroomDetails?.currentMemberCount}</span>
                </p>
              }
              rightButton={
                <ChatroomMenuButton
                  onClick={() => {
                    navigate(`/chat/chatroom/${chatroomId}/detail`);
                    handleSaveScrollPosition();
                  }}
                />
              }
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
