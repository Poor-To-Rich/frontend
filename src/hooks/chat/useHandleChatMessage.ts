import { usePrependMessageToFirstPage } from '@/hooks/chat/usePrependMessageToFirstPage';
import useUpdateUserProfileInCache from '@/hooks/chat/useUpdateUserProfileInCache';
import useUpdateRecentNoticeInCache from '@/hooks/chat/useUpdateRecentNoticeInCache';
import useHandleSystemMessage from '@/hooks/chat/useHandleSystemMessage';
import { IMessage } from '@stomp/stompjs';
import useMarkMessagesAsRead from '@/hooks/chat/useMarkMessagesAsRead';

export const useHandleChatMessage = (
  chatroomId: string,
  setIsChatDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  userId?: number,
) => {
  const prependMessageToFirstPage = usePrependMessageToFirstPage();
  const handleSystemMessage = useHandleSystemMessage();
  const updateUserProfileInCache = useUpdateUserProfileInCache();
  const updateRecentNoticeInCache = useUpdateRecentNoticeInCache();
  const markMessageAsRead = useMarkMessagesAsRead();

  const handleMessage = (message: IMessage) => {
    const msg = JSON.parse(message.body);

    // console.log(msg);

    switch (msg.type) {
      case 'CHAT_MESSAGE':
      case 'SYSTEM_MESSAGE':
      case 'RANKING_MESSAGE':
      case 'RANKING_STATUS':
        prependMessageToFirstPage(chatroomId, msg.payload);
        handleSystemMessage(chatroomId, msg.payload, setIsChatDisabled, userId);
        break;

      case 'MESSAGE_READ':
        markMessageAsRead(chatroomId, msg.payload.userId);
        break;

      case 'USER_UPDATED':
      case 'USER_JOINED':
        updateUserProfileInCache(chatroomId, msg.payload);
        break;

      case 'NOTICE':
        updateRecentNoticeInCache(chatroomId, msg.payload);
        break;

      default:
        console.warn('Unknown message type:', msg.type);
    }
  };

  return handleMessage;
};
