import { searchChatroomMembers } from '@/api/services/chatService';
import { useQuery } from '@tanstack/react-query';

const useSearchChatroomMembers = (chatroomId: string, nickname: string | null) => {
  return useQuery({
    queryKey: ['searchChatroomMembers', chatroomId, nickname],
    queryFn: () => {
      if (nickname) searchChatroomMembers(chatroomId, nickname);
    },
    enabled: Boolean(nickname) && !!chatroomId,
  });
};

export default useSearchChatroomMembers;
