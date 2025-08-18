import { getRecentPhotos } from '@/api/services/photoService';
import { useQuery } from '@tanstack/react-query';

const useGetRecentPhotos = (chatroomId: string) => {
  return useQuery({
    queryKey: ['recentPhotos', chatroomId],
    queryFn: () => getRecentPhotos(chatroomId),
  });
};

export default useGetRecentPhotos;
