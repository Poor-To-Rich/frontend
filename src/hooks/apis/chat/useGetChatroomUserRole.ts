import { getChatroomUserRole } from '@/api/services/chatService';
import { useQuery } from '@tanstack/react-query';

const useGetChatroomUserRole = (chatroomId: string) => {
  return useQuery({
    queryKey: ['chatroomUserRole', chatroomId],
    queryFn: () => getChatroomUserRole(chatroomId),
  });
};

export default useGetChatroomUserRole;
