import { getPhotoDetail } from '@/api/services/photoService';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const useGetPhotoDetail = (chatroomId: string, photoId: number | null) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['photoDetail', chatroomId, photoId],
    queryFn: () => getPhotoDetail(chatroomId, photoId!),
    enabled: !!photoId,
  });

  const prefetch = (targetPhotoId: number) => {
    return queryClient.prefetchQuery({
      queryKey: ['photoDetail', chatroomId, targetPhotoId],
      queryFn: () => getPhotoDetail(chatroomId, targetPhotoId),
    });
  };

  return { ...query, prefetch };
};

export default useGetPhotoDetail;
