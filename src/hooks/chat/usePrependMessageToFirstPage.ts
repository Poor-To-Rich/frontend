import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { ChatMessageUnion, ChatRoomMessageRes } from '@/types/messageType';
import { ChatroomDetailsRes } from '@/types/chatTypes';

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
                messages: [newMessage, ...page.messages],
              };
            }
            return page;
          }),
        };
      },
    );

    queryClient.setQueryData(['chatroomDetails', chatroomId], (oldData: ChatroomDetailsRes) => {
      if (!oldData) return oldData;

      let newCurrentMemberCount = oldData.currentMemberCount;
      if (newMessage.type === 'SYSTEM_MESSAGE') {
        if (newMessage.messageType === 'ENTER') newCurrentMemberCount += 1;
        else if (newMessage.messageType === 'LEAVE' || newMessage.messageType === 'DELEGATE')
          newCurrentMemberCount = oldData.currentMemberCount -= 1;
      }
      return {
        ...oldData,
        currentMemberCount: newCurrentMemberCount,
      };
    });
  };
};
