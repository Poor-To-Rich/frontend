import { getPhotoDetail } from '@/api/services/photoService';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const useGetPhotoDetail = (chatroomId: string, photoId: number | null) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['photoDetail', chatroomId, photoId],
    queryFn: () => getPhotoDetail(chatroomId, photoId!),
    enabled: !!photoId,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const prefetch = (targetPhotoId: number) => {
    return queryClient.prefetchQuery({
      queryKey: ['photoDetail', chatroomId, targetPhotoId],
      queryFn: () => getPhotoDetail(chatroomId, targetPhotoId),
      staleTime: Infinity,
      gcTime: Infinity,
    });
  };

  return { ...query, prefetch };
};

export default useGetPhotoDetail;
