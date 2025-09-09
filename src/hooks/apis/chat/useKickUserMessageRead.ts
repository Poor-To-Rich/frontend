import { kickUserMessageRead } from '@/api/services/chatService';
import { joinedChatroomsQueryKey } from '@/constants/queryKeys';
import useMarkMessagesAsRead from '@/hooks/chat/useMarkMessagesAsRead';
import { JoinedChatroomsRes } from '@/types/chatTypes';
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';

const useKickUserMessageRead = (chatroomId: string, userId?: number) => {
  const markMessagesAsRead = useMarkMessagesAsRead();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => kickUserMessageRead(chatroomId),
    onSuccess: () => {
      if (chatroomId && userId) {
        markMessagesAsRead(chatroomId, userId);
      }

      queryClient.setQueryData(joinedChatroomsQueryKey, (oldData: InfiniteData<JoinedChatroomsRes> | undefined) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map(page => ({
            ...page,
            chatrooms: page.chatrooms.map(chatroom =>
              chatroom.chatroomId === Number(chatroomId) ? { ...chatroom, unreadMessageCount: 0 } : chatroom,
            ),
          })),
        };
      });
    },
  });
};

export default useKickUserMessageRead;
