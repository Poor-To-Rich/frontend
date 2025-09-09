import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { ChatRoomMessageRes } from '@/types/messageType';

const useMarkMessagesAsRead = () => {
  const queryClient = useQueryClient();

  return (chatroomId: string, readerId: number, latestReadMessageId?: string | null) => {
    queryClient.setQueryData(
      ['chatroomMessages', chatroomId],
      (oldData: InfiniteData<ChatRoomMessageRes> | undefined) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map(page => ({
            ...page,
            messages: page.messages.map(msg => {
              if (msg.type === 'CHAT_MESSAGE') {
                if (!latestReadMessageId || msg.messageId <= Number(latestReadMessageId)) {
                  return {
                    ...msg,
                    unreadBy: msg.unreadBy.filter(id => id !== readerId),
                  };
                }
              }
              return msg;
            }),
          })),
        };
      },
    );
  };
};

export default useMarkMessagesAsRead;
