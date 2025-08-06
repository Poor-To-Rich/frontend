import { getChatroomCover } from '@/api/services/chatService';
import { useQuery } from '@tanstack/react-query';

const useGetChatroomCover = (chatroomId: string) => {
  return useQuery({
    queryKey: ['chatroomCover', chatroomId],
    queryFn: () => getChatroomCover(chatroomId),
    enabled: !!chatroomId,
  });
};

export default useGetChatroomCover;
