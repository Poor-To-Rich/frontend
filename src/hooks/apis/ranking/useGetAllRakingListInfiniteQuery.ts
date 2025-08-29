import { getAllRankingList } from '@/api/services/rankingService';
import { AllRankingListRes } from '@/types/rankingType';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

const useGetAllRakingListInfiniteQuery = (chatroomId: string) => {
  return useInfiniteQuery<AllRankingListRes, Error, InfiniteData<AllRankingListRes>, string[], string | null>({
    queryKey: ['allPhotoList', chatroomId],
    queryFn: async ({ pageParam = null }) => await getAllRankingList(chatroomId, pageParam),
    initialPageParam: null,
    getNextPageParam: lastPage => (lastPage.hasNext ? lastPage.nextCursor : null),
    placeholderData: prevData => prevData,
    staleTime: Infinity,
  });
};

export default useGetAllRakingListInfiniteQuery;
