import { delegateChatroomHost } from '@/api/services/chatService';
import { DelegateChatroomHostReq } from '@/types/chatTypes';
import { useMutation } from '@tanstack/react-query';

const useDelegateChatroomHost = (chatroomId: string, closeModal: () => void) => {
  return useMutation({
    mutationFn: (body: DelegateChatroomHostReq) => delegateChatroomHost(chatroomId, body),
    onSuccess: () => closeModal(),
  });
};

export default useDelegateChatroomHost;
