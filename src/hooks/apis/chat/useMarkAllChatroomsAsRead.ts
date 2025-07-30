import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { markAllChatroomsAsRead } from '@/api/services/chatService';
import { JoinedChatroomsRes } from '@/types/chatTypes';

export const useMarkAllChatroomsAsRead = (closeMenu: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAllChatroomsAsRead,
    onSuccess: () => {
      queryClient.setQueryData<InfiniteData<JoinedChatroomsRes>>(['joinedChatrooms'], prev => {
        if (!prev) return prev;
        return {
          ...prev,
          pages: prev.pages.map(page => ({
            ...page,
            chatrooms: page.chatrooms.map(room => ({
              ...room,
              unreadMessageCount: 0,
            })),
          })),
        };
      });
      closeMenu();
    },
  });
};
