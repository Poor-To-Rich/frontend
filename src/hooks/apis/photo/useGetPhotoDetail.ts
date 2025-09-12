import { getPhotoDetail } from '@/api/services/photoService';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const useGetPhotoDetail = (chatroomId: string, photoId: number | null) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['photoDetail', chatroomId, photoId],
    queryFn: () => getPhotoDetail(chatroomId, photoId!),
    enabled: !!photoId,
    staleTime: 5 * 1000 * 60,
    gcTime: 10 * 1000 * 60,
  });

  const prefetch = (targetPhotoId: number) => {
    return queryClient.prefetchQuery({
      queryKey: ['photoDetail', chatroomId, targetPhotoId],
      queryFn: () => getPhotoDetail(chatroomId, targetPhotoId),
      staleTime: 5 * 1000 * 60,
      gcTime: 10 * 1000 * 60,
    });
  };

  return { ...query, prefetch };
};

export default useGetPhotoDetail;
