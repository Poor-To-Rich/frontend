import { searchChatroomMembers } from '@/api/services/chatService';
import { useQuery } from '@tanstack/react-query';

const useSearchChatroomMembers = (chatroomId: string, nickname: string) => {
  return useQuery({
    queryKey: ['searchChatroomMembers', chatroomId, nickname],
    queryFn: () => searchChatroomMembers(chatroomId, nickname),
    enabled: !!chatroomId,
  });
};

export default useSearchChatroomMembers;
