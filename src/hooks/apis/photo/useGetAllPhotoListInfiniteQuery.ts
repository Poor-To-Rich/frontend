import { getAllPhotoList } from '@/api/services/photoService';
import { AllPhotoListRes } from '@/types/photoType';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

const useGetAllPhotoListInfiniteQuery = (chatroomId: string) => {
  return useInfiniteQuery<
    AllPhotoListRes,
    Error,
    InfiniteData<AllPhotoListRes>,
    string[],
    { date: string; id: number } | null
  >({
    queryKey: ['allPhotoList', chatroomId],
    queryFn: async ({ pageParam = null }) => await getAllPhotoList(chatroomId, pageParam),
    initialPageParam: null,
    getNextPageParam: lastPage => (lastPage.hasNext ? lastPage.nextCursor : null),
    placeholderData: prevData => prevData,
  });
};

export default useGetAllPhotoListInfiniteQuery;
