import { getRecentPhotoList } from '@/api/services/photoService';
import { useQuery } from '@tanstack/react-query';

const useGetRecentPhotoList = (chatroomId: string) => {
  return useQuery({
    queryKey: ['recentPhotoList', chatroomId],
    queryFn: () => getRecentPhotoList(chatroomId),
  });
};

export default useGetRecentPhotoList;
