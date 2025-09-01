import { searchChatrooms } from '@/api/services/chatService';
import { useQuery } from '@tanstack/react-query';

const useSearchChatrooms = (keyword: string) => {
  return useQuery({
    queryKey: ['searchChatrooms', keyword],
    queryFn: () => searchChatrooms(keyword),
    enabled: !!keyword,
  });
};

export default useSearchChatrooms;
