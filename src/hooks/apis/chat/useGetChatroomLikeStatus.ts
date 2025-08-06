import { getChatroomLikeStatus } from '@/api/services/chatService';
import { useQuery } from '@tanstack/react-query';

const useGetChatroomLikeStatus = (chatroomId: string) => {
  return useQuery({
    queryKey: ['chatroomLikeStatus', chatroomId],
    queryFn: () => getChatroomLikeStatus(chatroomId),
  });
};

export default useGetChatroomLikeStatus;
