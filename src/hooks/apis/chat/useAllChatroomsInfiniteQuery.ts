import { getAllChatrooms } from '@/api/services/chatService';
import { AllChatroomsRes, ChatroomSortOptionValue, ChatroomSortParam } from '@/types/chatTypes';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

const useAllChatroomsInfiniteQuery = (option: ChatroomSortOptionValue) => {
  const mapSortOptionToParam = (option: ChatroomSortOptionValue): ChatroomSortParam => {
    const map = {
      updatedAt: 'UPDATED_AT',
      createdAt: 'CREATED_AT',
      likes: 'LIKE',
    } as const;

    return map[option];
  };
  const sortBy = mapSortOptionToParam(option);

  return useInfiniteQuery<AllChatroomsRes, Error, InfiniteData<AllChatroomsRes>, string[], string | null>({
    queryKey: ['allChatrooms', sortBy],
    queryFn: async ({ pageParam = null }) => await getAllChatrooms(sortBy, pageParam),
    initialPageParam: null,
    getNextPageParam: lastPage => (lastPage.hasNext ? lastPage.nextCursor : undefined),
    placeholderData: prevData => prevData,
  });
};

export default useAllChatroomsInfiniteQuery;
