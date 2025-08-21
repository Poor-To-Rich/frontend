import { getAllChatroomMembers } from '@/api/services/chatService';
import { useQuery } from '@tanstack/react-query';

const useGetAllChatroomMembers = (chatroomId: string) => {
  return useQuery({
    queryKey: ['allChatroomMembers', chatroomId],
    queryFn: () => getAllChatroomMembers(chatroomId),
    enabled: !!chatroomId,
  });
};

export default useGetAllChatroomMembers;
