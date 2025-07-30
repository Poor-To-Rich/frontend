import { leaveMultipleChatrooms } from '@/api/services/chatService';
import { joinedChatroomsQueryKey } from '@/constants/queryKeys';
import { JoinedChatroomsRes } from '@/types/chatTypes';
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';

const useLeaveMultipleChatrooms = (clearSelectedStatus: () => void, closeModal: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: leaveMultipleChatrooms,
    onSuccess: data => {
      queryClient.setQueryData<InfiniteData<JoinedChatroomsRes>>(joinedChatroomsQueryKey, prev => {
        if (!prev || !data) return prev;
        return {
          ...prev,
          pages: prev.pages.map(page => ({
            ...page,
            chatrooms: page.chatrooms.filter(room => !data.deletedChatroomIds.includes(room.chatroomId)),
          })),
        };
      });
      closeModal();
      clearSelectedStatus();
    },
  });
};

export default useLeaveMultipleChatrooms;
