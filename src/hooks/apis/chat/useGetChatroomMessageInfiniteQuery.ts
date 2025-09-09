import { getChatroomMessage } from '@/api/services/chatService';
import { ChatRoomMessageRes } from '@/types/messageType';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

const useGetChatroomMessageInfiniteQuery = (chatroomId: string) => {
  return useInfiniteQuery<ChatRoomMessageRes, Error, InfiniteData<ChatRoomMessageRes>, string[], number | null>({
    queryKey: ['chatroomMessages', chatroomId],
    queryFn: async ({ pageParam = null }) => await getChatroomMessage(chatroomId, pageParam),
    initialPageParam: null,
    getNextPageParam: lastPage => (lastPage.hasNext ? lastPage.nextCursor : null),
    staleTime: 0,
    gcTime: 0,
  });
};

export default useGetChatroomMessageInfiniteQuery;
