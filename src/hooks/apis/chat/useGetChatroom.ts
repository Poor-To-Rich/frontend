import { getChatroom } from '@/api/services/chatService';
import { useQuery } from '@tanstack/react-query';

const useGetChatroom = (chatroomId: string) => {
  return useQuery({
    queryKey: ['chatroomInfo', chatroomId],
    queryFn: () => getChatroom(chatroomId),
    enabled: !!chatroomId,
  });
};

export default useGetChatroom;
