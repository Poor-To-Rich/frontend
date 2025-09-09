import { enterChatroom } from '@/api/services/chatService';
import { joinedChatroomsQueryKey } from '@/constants/queryKeys';
import { EnterChatroomReq } from '@/types/chatTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useEnterChatroom = (chatroomId: string) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body?: EnterChatroomReq) => enterChatroom(chatroomId, body),
    onSuccess: data => {
      navigate(`/chat/chatroom/${data?.chatroomId}`);

      queryClient.refetchQueries({ queryKey: joinedChatroomsQueryKey });
    },
  });
};

export default useEnterChatroom;
