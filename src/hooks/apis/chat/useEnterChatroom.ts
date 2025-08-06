import { enterChatroom } from '@/api/services/chatService';
import { EnterChatroomReq } from '@/types/chatTypes';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useEnterChatroom = (chatroomId: string) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (body?: EnterChatroomReq) => enterChatroom(chatroomId, body),
    onSuccess: data => {
      navigate(`/chat/chatroom/${data?.chatroomId}`);
    },
  });
};

export default useEnterChatroom;
