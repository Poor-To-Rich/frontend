import { getAllNoticeList } from '@/api/services/noticeService';
import { AllNoticeListRes } from '@/types/noticeType';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

const useGetAllNoticeListInfiniteQuery = (chatroomId: string) => {
  return useInfiniteQuery<AllNoticeListRes, Error, InfiniteData<AllNoticeListRes>, string[], number | null>({
    queryKey: ['allNoticeList', chatroomId],
    queryFn: async ({ pageParam = null }) => await getAllNoticeList(chatroomId, pageParam),
    initialPageParam: null,
    getNextPageParam: lastPage => (lastPage.hasNext ? lastPage.nextCursor : null),
    placeholderData: prevData => prevData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export default useGetAllNoticeListInfiniteQuery;
