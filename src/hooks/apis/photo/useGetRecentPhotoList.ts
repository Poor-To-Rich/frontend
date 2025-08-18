import { getRecentPhotoList } from '@/api/services/photoService';
import { useQuery } from '@tanstack/react-query';

const useGetRecentPhotoList = (chatroomId: string) => {
  return useQuery({
    queryKey: ['recentPhotos', chatroomId],
    queryFn: () => getRecentPhotoList(chatroomId),
  });
};

export default useGetRecentPhotoList;
