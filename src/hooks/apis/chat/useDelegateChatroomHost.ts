import { delegateChatroomHost } from '@/api/services/chatService';
import { DelegateChatroomHostReq } from '@/types/chatTypes';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useDelegateChatroomHost = (chatroomId: string) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (body: DelegateChatroomHostReq) => delegateChatroomHost(chatroomId, body),
    onSuccess: data => {
      toast.success(data.message);
      navigate(-1);
    },
  });
};

export default useDelegateChatroomHost;
