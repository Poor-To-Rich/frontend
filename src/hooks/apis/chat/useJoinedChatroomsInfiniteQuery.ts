import { getJoinedChatrooms } from '@/api/services/chatService';
import { JoinedChatroomsRes } from '@/types/chatTypes';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

const useJoinedChatroomsInfiniteQuery = () => {
  return useInfiniteQuery<JoinedChatroomsRes, Error, InfiniteData<JoinedChatroomsRes>, string[], string | null>({
    queryKey: ['joinedChatrooms'],
    queryFn: async ({ pageParam = null }) => await getJoinedChatrooms(pageParam),
    initialPageParam: null,
    getNextPageParam: lastPage => (lastPage.hasNext ? lastPage.nextCursor : undefined),
    placeholderData: prevData => prevData,
  });
};

export default useJoinedChatroomsInfiniteQuery;
