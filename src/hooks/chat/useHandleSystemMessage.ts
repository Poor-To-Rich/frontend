import { ChatRoomMessageRes, SystemMessageType } from '@/types/messageType';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { ChatroomDetailsRes } from '@/types/chatTypes';

const useHandleSystemMessage = () => {
  const queryClient = useQueryClient();

  return (chatroomId: string, newMessage: SystemMessageType) => {
    if (newMessage.messageType === 'LEAVE' || newMessage.messageType === 'DELEGATE') {
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
                  return {
                    ...msg,
                    unreadBy: msg.unreadBy.filter(id => id !== newMessage.userId),
                  };
                }
                return msg;
              }),
            })),
          };
        },
      );
    }

    queryClient.setQueryData(['chatroomDetails', chatroomId], (oldData: ChatroomDetailsRes) => {
      if (!oldData) return oldData;

      let newCurrentMemberCount = oldData.currentMemberCount;

      if (newMessage.messageType === 'ENTER') newCurrentMemberCount += 1;
      else if (newMessage.messageType === 'LEAVE' || newMessage.messageType === 'DELEGATE')
        newCurrentMemberCount = oldData.currentMemberCount -= 1;

      return {
        ...oldData,
        currentMemberCount: newCurrentMemberCount,
      };
    });
  };
};

export default useHandleSystemMessage;
