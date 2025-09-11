import { stompClient } from '@/api/stomp';

export const usePublishRead = () => {
  const publishRead = (chatroomId: string, latestReadMessageId?: string | null) => {
    stompClient.publish({
      destination: `/pub/chat/read`,
      body: JSON.stringify({ chatroomId, latestReadMessageId }),
    });
  };

  return { publishRead };
};
