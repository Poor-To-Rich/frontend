import { leaveChatroom } from '@/api/services/chatService';
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { joinedChatroomsQueryKey } from '@/constants/queryKeys';
import { JoinedChatroomsRes } from '@/types/chatTypes';

const useLeaveChatroom = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: leaveChatroom,
    onSuccess: data => {
      navigate('/chat');

      queryClient.setQueryData<InfiniteData<JoinedChatroomsRes>>(joinedChatroomsQueryKey, prev => {
        if (!prev || !data) return prev;

        return {
          ...prev,
          pages: prev.pages.map(page => ({
            ...page,
            chatrooms: page.chatrooms.filter(chatroom => chatroom.chatroomId !== data.deleteChatroomId),
          })),
        };
      });
    },
  });
};

export default useLeaveChatroom;
