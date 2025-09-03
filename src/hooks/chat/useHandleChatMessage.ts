import { usePrependMessageToFirstPage } from '@/hooks/chat/usePrependMessageToFirstPage';
import useMarkMessagesAsRead from '@/hooks/chat/useMarkMessagesAsRead';
import useUpdateUserProfileInCache from '@/hooks/chat/useUpdateUserProfileInCache';
import useUpdateRecentNoticeInCache from '@/hooks/chat/useUpdateRecentNoticeInCache';
import useHandleSystemMessage from '@/hooks/chat/useHandleSystemMessage';
import { IMessage } from '@stomp/stompjs';

export const useHandleChatMessage = (
  chatroomId: string,
  setIsChatDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  userId?: number,
  isSuccess?: boolean,
) => {
  const prependMessageToFirstPage = usePrependMessageToFirstPage();
  const handleSystemMessage = useHandleSystemMessage();
  const markMessagesAsRead = useMarkMessagesAsRead();
  const updateUserProfileInCache = useUpdateUserProfileInCache();
  const updateRecentNoticeInCache = useUpdateRecentNoticeInCache();

  const handleMessage = (message: IMessage) => {
    const msg = JSON.parse(message.body);
    console.log(msg);

    switch (msg.type) {
      case 'CHAT_MESSAGE':
      case 'SYSTEM_MESSAGE':
      case 'RANKING_MESSAGE':
      case 'RANKING_STATUS':
        prependMessageToFirstPage(chatroomId, msg.payload);
        handleSystemMessage(chatroomId, msg.payload, setIsChatDisabled, userId);
        break;

      case 'MESSAGE_READ':
        if (isSuccess) markMessagesAsRead(chatroomId, msg.payload.userId);
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
