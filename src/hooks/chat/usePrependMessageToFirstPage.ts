import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { ChatMessageUnion, ChatRoomMessageRes } from '@/types/messageType';

export const usePrependMessageToFirstPage = () => {
  const queryClient = useQueryClient();

  return (chatroomId: string, newMessage: ChatMessageUnion) => {
    queryClient.setQueryData(
      ['chatroomMessages', chatroomId],
      (oldData: InfiniteData<ChatRoomMessageRes> | undefined) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page, idx) => {
            if (idx === 0) {
              return {
                ...page,
                messages: [...page.messages, newMessage],
              };
            }
            return page;
          }),
        };
      },
    );
  };
};
